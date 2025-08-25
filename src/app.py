"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../dist/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# --- SECRET KEY para firmar JWT (usa variable de entorno en producción) ---
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', os.getenv('FLASK_APP_KEY', 'dev-secret-change-me'))

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# --- CONFIG SMTP (para /api/contact) ---
# Compatible con Gmail, Outlook/Hotmail, Yahoo, etc.
app.config['MAIL_SMTP_HOST']   = os.getenv('MAIL_SMTP_HOST', '')
app.config['MAIL_SMTP_PORT']   = int(os.getenv('MAIL_SMTP_PORT', '587'))
app.config['MAIL_SMTP_USER']   = os.getenv('MAIL_SMTP_USER', '')
app.config['MAIL_SMTP_PASS']   = os.getenv('MAIL_SMTP_PASS', '')
app.config['MAIL_STARTTLS']    = os.getenv('MAIL_STARTTLS', '1').lower() in ('1', 'true', 'yes')
app.config['MAIL_SSL']         = os.getenv('MAIL_SSL', '0').lower() in ('1', 'true', 'yes')
app.config['MAIL_FROM']        = os.getenv('MAIL_FROM', 'no-reply@localhost')
app.config['MAIL_FROM_NAME']   = os.getenv('MAIL_FROM_NAME', 'Acuíferos Chile')
app.config['MAIL_TO']          = os.getenv('MAIL_TO', 'vicentejimenez.prog@gmail.com')

MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
