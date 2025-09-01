from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    last_name: Mapped[str] = mapped_column(String(120), nullable=False)  # apellido
    password: Mapped[str] = mapped_column(nullable=False)  # hashed
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False, default=True)
    created_at: Mapped[datetime] = mapped_column(nullable=False, default=datetime.utcnow)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "last_name": self.last_name,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat()
        }

class Post(db.Model):
    __tablename__ = "post"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    content: Mapped[str] = mapped_column(nullable=False)
    attachment_url: Mapped[str] = mapped_column(String(500), nullable=True)  # enlaces o archivos
    created_at: Mapped[datetime] = mapped_column(nullable=False, default=datetime.utcnow)

    user_id: Mapped[int] = mapped_column(db.ForeignKey("user.id"), nullable=False)
    user = db.relationship("User", backref="posts")

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "attachment_url": self.attachment_url,
            "created_at": self.created_at.isoformat(),
            "user": {
                "id": self.user.id,
                "name": self.user.name,
                "last_name": self.user.last_name,
                "email": self.user.email
            }
        }
