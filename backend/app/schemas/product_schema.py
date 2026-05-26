from pydantic import BaseModel
from typing import Optional


class ProductCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    stock: int = 0
    rating: float = 0.0 


class ProductResponse(ProductCreate):
    id: int
    rating: float
    image_url: Optional[str] = None  # ⭐ added

    class Config:
        from_attributes = True
