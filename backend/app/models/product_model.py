from sqlalchemy import Column, Integer, String, Float
from app.db.base import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    description = Column(String, nullable=True)
    price = Column(Float, nullable=False)
    stock = Column(Integer, default=0)

    rating = Column(Float, default=0.0)

    image_url = Column(String, nullable=True)  # ⭐ new field
