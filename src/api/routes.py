"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

# --- stdlib para JWT "manual" sin instalar paquetes ---
import base64
import json
import hmac
import hashlib
import time
from functools import wraps

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# ================
# Helpers de JWT
# ================

def _b64url_encode(b: bytes) -> str:
    return base64.urlsafe_b64encode(b).rstrip(b'=').decode('utf-8')

def _b64url_decode(s: str) -> bytes:
    # agrega relleno si falta
    padding = '=' * (-len(s) % 4)
    return base64.urlsafe_b64decode(s + padding)

def encode_jwt(payload: dict, secret: str, alg: str = "HS256", exp_seconds: int = 60 * 60 * 24):
    """
    Crea un JWT HS256 sin dependencias externas.
    """
    header = {"alg": alg, "typ": "JWT"}
    payload = dict(payload) if payload else {}
    # exp en segundos (UNIX epoch)
    payload.setdefault("exp", int(time.time()) + exp_seconds)
    header_b64 = _b64url_encode(json.dumps(header, separators=(',', ':')).encode('utf-8'))
    payload_b64 = _b64url_encode(json.dumps(payload, separators=(',', ':')).encode('utf-8'))
    signing_input = f"{header_b64}.{payload_b64}".encode('utf-8')

    if alg != "HS256":
        raise ValueError("Algoritmo no soportado")

    signature = hmac.new(secret.encode('utf-8'), signing_input, hashlib.sha256).digest()
    signature_b64 = _b64url_encode(signature)
    return f"{header_b64}.{payload_b64}.{signature_b64}"

def decode_jwt(token: str, secret: str):
    """
    Verifica firma y exp; retorna el payload (dict) o levanta APIException.
    """
    try:
        header_b64, payload_b64, signature_b64 = token.split('.')
    except ValueError:
        raise APIException("Token inválido", status_code=401)

    signing_input = f"{header_b64}.{payload_b64}".encode('utf-8')
    expected_sig = hmac.new(secret.encode('utf-8'), signing_input, hashlib.sha256).digest()
    try:
        provided_sig = _b64url_decode(signature_b64)
    except Exception:
        raise APIException("Token inválido (firma)", status_code=401)

    if not hmac.compare_digest(expected_sig, provided_sig):
        raise APIException("Token inválido (firma incorrecta)", status_code=401)

    try:
        payload = json.loads(_b64url_decode(payload_b64).decode('utf-8'))
    except Exception:
        raise APIException("Token inválido (payload)", status_code=401)

    # expira
    if 'exp' in payload and int(time.time()) > int(payload['exp']):
        raise APIException("Token expirado", status_code=401)

    return payload

def login_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        auth = request.headers.get('Authorization', '')
        if not auth.startswith('Bearer '):
            raise APIException("Falta token (Authorization: Bearer <token>)", status_code=401)
        token = auth.split(' ', 1)[1].strip()
        secret = current_app.config.get('SECRET_KEY')
        payload = decode_jwt(token, secret)
        # adjunta info del usuario a la request
        request.jwt_payload = payload
        return fn(*args, **kwargs)
    return wrapper


# =========================
# Endpoints públicos simple
# =========================

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


# =========================
# AUTH: Registro / Login / Logout / Sesión
# =========================

@api.route('/auth/register', methods=['POST'])
def register():
    """
    Crea usuario y devuelve user + token.
    Body JSON requerido: {email, name, last_name, password}
    """
    data = request.get_json(silent=True) or {}
    email = (data.get('email') or '').strip().lower()
    name = (data.get('name') or '').strip()
    last_name = (data.get('last_name') or '').strip()
    password = data.get('password')

    # Validaciones básicas
    if not email or not name or not last_name or not password:
        raise APIException("Faltan campos: email, name, last_name, password", status_code=400)

    # ¿Existe email?
    if User.query.filter_by(email=email).first():
        raise APIException("El correo ya está registrado", status_code=409)

    # Hash de password (Werkzeug, ya viene con Flask)
    pwd_hash = generate_password_hash(password)

    # Crear y guardar usuario
    user = User(email=email, name=name, last_name=last_name, password=pwd_hash, is_active=True)
    db.session.add(user)
    db.session.commit()

    # Token de sesión (incluye sub=user_id)
    secret = current_app.config.get('SECRET_KEY')
    token = encode_jwt({"sub": user.id, "email": user.email}, secret, exp_seconds=60 * 60 * 24 * 7)  # 7 días

    return jsonify({
        "user": user.serialize(),
        "token": token
    }), 201


@api.route('/auth/login', methods=['POST'])
def login():
    """
    Autentica y devuelve token + user.
    Body JSON requerido: {email, password}
    """
    data = request.get_json(silent=True) or {}
    email = (data.get('email') or '').strip().lower()
    password = data.get('password') or ''

    if not email or not password:
        raise APIException("Faltan credenciales", status_code=400)

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        # No revelar cuál falló
        raise APIException("Credenciales inválidas", status_code=401)

    if not user.is_active:
        raise APIException("Usuario inactivo", status_code=403)

    secret = current_app.config.get('SECRET_KEY')
    token = encode_jwt({"sub": user.id, "email": user.email}, secret, exp_seconds=60 * 60 * 24 * 7)  # 7 días

    return jsonify({
        "user": user.serialize(),
        "token": token
    }), 200


@api.route('/auth/logout', methods=['POST'])
@login_required
def logout():
    """
    Logout "stateless": el servidor no guarda sesión.
    El cliente debe borrar el token localmente.
    (Opcional: podrías implementar una blocklist en DB si quieres invalidar tokens.)
    """
    return jsonify({"message": "Sesión cerrada. Elimina el token en el cliente."}), 200


@api.route('/auth/session', methods=['GET'])
@login_required
def session_info():
    """
    Verifica token y retorna el usuario actual (útil para mantener sesión en el front).
    Header: Authorization: Bearer <token>
    """
    user_id = request.jwt_payload.get('sub')
    user = User.query.get(user_id)
    if not user:
        raise APIException("Usuario no encontrado", status_code=404)
    return jsonify({"user": user.serialize()}), 200
