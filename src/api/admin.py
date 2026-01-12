
import os

from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_admin.theme import Bootstrap4Theme

from .models import db, User, Post, Comment, Reaction


def setup_admin(app):
    # Secret key (Render la puede inyectar como env var)
    app.secret_key = os.environ.get("FLASK_APP_KEY", "sample key")

    # Flask-Admin 2.x: se usa theme (Bootstrap4) y swatch para el color
    theme = Bootstrap4Theme(swatch="cerulean")
    admin = Admin(app, name="4Geeks Admin", theme=theme)

    # Add your models here
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Post, db.session))
    admin.add_view(ModelView(Comment, db.session))
    admin.add_view(ModelView(Reaction, db.session))

