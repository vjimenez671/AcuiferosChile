"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User, Post, Comment, Reaction
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

# --- stdlib para SMTP ---
import smtplib
import ssl
from email.message import EmailMessage
from typing import Optional, List

# --- utilidades varias ---
from sqlalchemy import func
import math

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


# =========================
# CONTACT: envío de correo por SMTP (server-side)
# =========================

def _send_mail_smtp(
    to_addr: str,
    subject: str,
    body_text: str,
    reply_to: Optional[str] = None,
    cc: Optional[List[str]] = None,
    from_display_name: Optional[str] = None
):
    """
    Envía correo vía SMTP usando configuración de app.config.
    Compatible con Gmail, Outlook/Hotmail, Yahoo, etc.

    El envelope sender (MAIL FROM) es app.config['MAIL_FROM'] para cumplir SPF/DMARC.
    El header "From" usa 'from_display_name' como nombre visible + <MAIL_FROM>.
    """
    host      = current_app.config.get('MAIL_SMTP_HOST', '')
    port      = int(current_app.config.get('MAIL_SMTP_PORT', 587))
    user      = current_app.config.get('MAIL_SMTP_USER', '')
    pwd       = current_app.config.get('MAIL_SMTP_PASS', '')
    use_ssl   = bool(current_app.config.get('MAIL_SSL', False))
    starttls  = bool(current_app.config.get('MAIL_STARTTLS', True))
    from_addr = current_app.config.get('MAIL_FROM', 'no-reply@localhost')
    default_from_name = current_app.config.get('MAIL_FROM_NAME', 'Acuíferos Chile')

    if not host:
        raise APIException("MAIL_SMTP_HOST no configurado en el servidor", status_code=500)

    display_name = from_display_name or default_from_name

    msg = EmailMessage()
    msg['Subject'] = subject
    msg['From'] = f"{display_name} <{from_addr}>"
    msg['To'] = to_addr
    if cc:
        msg['Cc'] = ", ".join(cc)
    if reply_to:
        msg['Reply-To'] = reply_to
    msg['X-Mailer'] = 'AcuiferosChile-Backend'
    msg.set_content(body_text)

    recipients = [to_addr] + (cc or [])

    # Conexión SMTP
    if use_ssl:
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(host=host, port=port, context=context) as server:
            if user and pwd:
                server.login(user, pwd)
            server.send_message(msg, from_addr=from_addr, to_addrs=recipients)
    else:
        with smtplib.SMTP(host=host, port=port) as server:
            server.ehlo()
            if starttls:
                context = ssl.create_default_context()
                server.starttls(context=context)
                server.ehlo()
            if user and pwd:
                server.login(user, pwd)
            server.send_message(msg, from_addr=from_addr, to_addrs=recipients)

@api.route('/contact', methods=['POST'])
@login_required
def send_contact_email():
    """
    Envía un correo a MAIL_TO con los datos del usuario autenticado.
    Body JSON: { topic?, subject*, message*, link?, copyMe? }
    """
    data = request.get_json(silent=True) or {}
    subject = (data.get('subject') or '').strip()
    message = (data.get('message') or '').strip()
    link    = (data.get('link') or '').strip()
    topic   = (data.get('topic') or 'general').strip()
    copy_me = bool(data.get('copyMe', True))

    if not subject:
        raise APIException("El asunto es obligatorio.", status_code=400)
    if not message:
        raise APIException("El mensaje es obligatorio.", status_code=400)

    # Usuario autenticado
    user_id = request.jwt_payload.get('sub')
    user = User.query.get(user_id)
    if not user:
        raise APIException("Usuario no encontrado", status_code=404)

    # Destino principal configurado
    to_addr = current_app.config.get('MAIL_TO', 'vicentejimenez.prog@gmail.com')

    # Cuerpo del correo (texto plano)
    lines = [
        f"Tema: {topic_label(topic)}",
        f"Remitente: {user.name} {user.last_name} <{user.email}>",
        "",
        message
    ]
    if link:
        lines += ["", f"Enlace adicional: {link}"]
    body_text = "\n".join(lines)

    # CC opcional al usuario
    cc = [user.email] if (copy_me and user.email) else []

    # From visible: "<Nombre Apellido> via Acuíferos Chile" <MAIL_FROM>
    base_from_name = current_app.config.get('MAIL_FROM_NAME', 'Acuíferos Chile')
    user_full_name = f"{user.name} {user.last_name}".strip()
    from_display_name = f"{user_full_name} via {base_from_name}" if user_full_name else base_from_name

    try:
        _send_mail_smtp(
            to_addr=to_addr,
            subject=subject,
            body_text=body_text,
            reply_to=user.email,          # al responder, irá al usuario
            cc=cc,
            from_display_name=from_display_name
        )
    except APIException:
        raise
    except Exception as e:
        raise APIException(f"Error enviando correo: {str(e)}", status_code=500)

    return jsonify({"ok": True, "message": "Correo enviado correctamente"}), 200

def topic_label(value: str) -> str:
    v = (value or '').lower()
    if v == 'proyecto':
        return 'Nuevo proyecto'
    if v == 'soporte':
        return 'Soporte técnico'
    if v == 'prensa':
        return 'Prensa / Difusión'
    return 'Consulta general'


# =========================
# Helpers de sesión
# =========================

def _get_current_user() -> User:
    user_id = request.jwt_payload.get('sub')
    user = User.query.get(user_id)
    if not user:
        raise APIException("Usuario no encontrado", status_code=404)
    return user


# =========================
# POSTS: paginación + CRUD
# =========================

@api.route("/posts", methods=["GET"])
@login_required
def get_posts():
    page = max(int(request.args.get("page", 1)), 1)
    per_page = min(max(int(request.args.get("per_page", 10)), 1), 50)

    base_q = Post.query.order_by(Post.created_at.desc())

    total = db.session.query(func.count(Post.id)).scalar()
    pages = max(math.ceil(total / per_page), 1)
    items = (base_q
             .limit(per_page)
             .offset((page - 1) * per_page)
             .all())

    current_user_id = request.jwt_payload.get('sub')
    data = [p.serialize(current_user_id=current_user_id) for p in items]

    return jsonify({
        "items": data,
        "page": page,
        "per_page": per_page,
        "total": total,
        "pages": pages,
        "has_next": page < pages,
        "has_prev": page > 1,
    }), 200


@api.route("/posts/<int:post_id>", methods=["GET"])
@login_required
def get_post(post_id: int):
    p = Post.query.get_or_404(post_id)
    current_user_id = request.jwt_payload.get('sub')
    return jsonify(p.serialize(current_user_id=current_user_id)), 200


@api.route("/posts", methods=["POST"])
@login_required
def create_post():
    data = request.get_json(silent=True) or {}
    title = (data.get("title") or "").strip()
    content = (data.get("content") or "").strip()
    attachment_url = (data.get("attachment_url") or "").strip() or None

    if not title:
        raise APIException("Título y contenido son obligatorios." if not content else "Título es obligatorio.", status_code=400)

    user = _get_current_user()

    post = Post(title=title, content=content, attachment_url=attachment_url, user=user)
    db.session.add(post)
    db.session.commit()

    return jsonify(post.serialize(current_user_id=user.id)), 201


@api.route("/posts/<int:post_id>", methods=["PUT"])
@login_required
def update_post(post_id: int):
    user = _get_current_user()
    post = Post.query.get_or_404(post_id)
    if post.user_id != user.id:
        raise APIException("Solo el autor puede editar", status_code=403)

    data = request.get_json(silent=True) or {}
    title = (data.get("title") or post.title).strip()
    content = (data.get("content") or post.content).strip()
    attachment_url = (data.get("attachment_url") or post.attachment_url or "").strip() or None

    post.title = title
    post.content = content
    post.attachment_url = attachment_url
    db.session.commit()

    return jsonify(post.serialize(current_user_id=user.id)), 200


@api.route("/posts/<int:post_id>", methods=["DELETE"])
@login_required
def delete_post(post_id: int):
    user = _get_current_user()
    post = Post.query.get_or_404(post_id)
    if post.user_id != user.id:
        raise APIException("Solo el autor puede borrar", status_code=403)

    db.session.delete(post)
    db.session.commit()
    return jsonify({"ok": True}), 200


# =========================
# COMMENTS
# =========================

@api.route("/posts/<int:post_id>/comments", methods=["GET"])
@login_required
def list_comments(post_id: int):
    Post.query.get_or_404(post_id)
    comments = Comment.query.filter_by(post_id=post_id).order_by(Comment.created_at.asc()).all()
    return jsonify([c.serialize() for c in comments]), 200


@api.route("/posts/<int:post_id>/comments", methods=["POST"])
@login_required
def add_comment(post_id: int):
    user = _get_current_user()
    Post.query.get_or_404(post_id)
    data = request.get_json(silent=True) or {}
    body = (data.get("body") or "").strip()
    if not body:
        raise APIException("Comentario vacío", status_code=400)
    c = Comment(body=body, user_id=user.id, post_id=post_id)
    db.session.add(c)
    db.session.commit()
    return jsonify(c.serialize()), 201


@api.route("/posts/<int:post_id>/comments/<int:comment_id>", methods=["DELETE"])
@login_required
def delete_comment(post_id: int, comment_id: int):
    user = _get_current_user()
    c = Comment.query.get_or_404(comment_id)
    if c.post_id != post_id:
        raise APIException("No coincide el post", status_code=400)
    if c.user_id != user.id:
        raise APIException("Solo el autor puede borrar su comentario", status_code=403)
    db.session.delete(c)
    db.session.commit()
    return jsonify({"ok": True}), 200


# =========================
# REACTIONS (emoji)
# =========================

@api.route("/posts/<int:post_id>/reactions", methods=["POST"])
@login_required
def react_post(post_id: int):
    user = _get_current_user()
    Post.query.get_or_404(post_id)
    data = request.get_json(silent=True) or {}
    emoji = (data.get("emoji") or "").strip()
    if not emoji:
        raise APIException("Emoji requerido", status_code=400)

    # toggle: si existe -> remove; si no existe -> add
    existing = Reaction.query.filter_by(user_id=user.id, post_id=post_id, emoji=emoji).first()
    if existing:
        db.session.delete(existing)
        db.session.commit()
        action = "removed"
    else:
        r = Reaction(user_id=user.id, post_id=post_id, emoji=emoji)
        db.session.add(r)
        db.session.commit()
        action = "added"

    post = Post.query.get(post_id)
    serialized = post.serialize(current_user_id=user.id)
    return jsonify({
        "action": action,
        "reactions": serialized["reactions"],
        "my_reactions": serialized["my_reactions"],
    }), 200
