from datetime import datetime, timezone
from database.db import db
from sqlalchemy.schema import Index

class Product(db.Model):
  __tablename__ = 'products'
  id = db.Column(db.Integer, nullable=False)
  name = db.Column(db.String, nullable=False)
  ean = db.Column(db.String, nullable=False, primary_key=True)
  price = db.Column(db.String, nullable=False)
  description = db.Column(db.String, nullable=False)
  image = db.Column(db.String, nullable=False)
  created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

  __table_args__ = (
    Index('idx_product_ean', 'ean'),
  )