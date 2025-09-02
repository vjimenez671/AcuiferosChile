from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from typing import Optional

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    last_name: Mapped[str] = mapped_column(String(120), nullable=False)  # apellido
    password: Mapped[str] = mapped_column(nullable=False)  # hashed
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False, default=True)
    created_at: Mapped[datetime] = mapped_column(nullable=False, default=datetime.utcnow)

    posts = relationship("Post", back_populates="user", cascade="all, delete-orphan")

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
    content: Mapped[str] = mapped_column(nullable=False, default="")
    attachment_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)  # enlaces o archivos
    created_at: Mapped[datetime] = mapped_column(nullable=False, default=datetime.utcnow)

    user_id: Mapped[int] = mapped_column(db.ForeignKey("user.id"), nullable=False)
    user = relationship("User", back_populates="posts")

    comments = relationship("Comment", back_populates="post", cascade="all, delete-orphan")
    reactions = relationship("Reaction", back_populates="post", cascade="all, delete-orphan")

    def serialize(self, current_user_id: Optional[int] = None):
        # Conteo de reacciones tipo {"👍": 3, "❤️": 1}
        reaction_counts: dict[str, int] = {}
        my_reactions: list[str] = []
        for r in self.reactions:
            reaction_counts[r.emoji] = reaction_counts.get(r.emoji, 0) + 1
            if current_user_id is not None and r.user_id == current_user_id:
                my_reactions.append(r.emoji)

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
            },
            "comment_count": len(self.comments),
            "reactions": reaction_counts,
            "my_reactions": my_reactions,
        }

class Comment(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    body: Mapped[str] = mapped_column(nullable=False)
    created_at: Mapped[datetime] = mapped_column(nullable=False, default=datetime.utcnow)

    user_id: Mapped[int] = mapped_column(db.ForeignKey("user.id"), nullable=False)
    post_id: Mapped[int] = mapped_column(db.ForeignKey("post.id"), nullable=False)

    user = relationship("User")
    post = relationship("Post", back_populates="comments")

    def serialize(self):
        return {
            "id": self.id,
            "body": self.body,
            "created_at": self.created_at.isoformat(),
            "user": {
                "id": self.user.id,
                "name": self.user.name,
                "last_name": self.user.last_name,
            }
        }

class Reaction(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    emoji: Mapped[str] = mapped_column(String(8), nullable=False)  # 1 emoji (unicode)
    created_at: Mapped[datetime] = mapped_column(nullable=False, default=datetime.utcnow)

    user_id: Mapped[int] = mapped_column(db.ForeignKey("user.id"), nullable=False)
    post_id: Mapped[int] = mapped_column(db.ForeignKey("post.id"), nullable=False)

    user = relationship("User")
    post = relationship("Post", back_populates="reactions")

    __table_args__ = (
        UniqueConstraint('user_id', 'post_id', 'emoji', name='uq_reaction_user_post_emoji'),
    )
