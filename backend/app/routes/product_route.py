from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
import os

from app.db.session import get_db
from app.schemas.product_schema import ProductResponse
from app.services import product_service
from app.models.product_model import Product

router = APIRouter(prefix="/products", tags=["Products"])


UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/")
async def create_product(
    name: str = Form(...),
    description: str = Form(None),
    price: float = Form(...),
    stock: int = Form(0),
    rating: float = Form(0.0),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
):
    image_url = None

    if image:
        file_path = f"{UPLOAD_DIR}/{image.filename}"

        with open(file_path, "wb") as buffer:
            buffer.write(await image.read())

        image_url = file_path

    product = Product(
        name=name,
        description=description,
        price=price,
        stock=stock,
        rating=rating,
        image_url=image_url,
    )

    db.add(product)
    db.commit()
    db.refresh(product)

    return product


@router.get("/", response_model=list[ProductResponse])
def list_products(db: Session = Depends(get_db)):
    return product_service.get_products(db)


@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = product_service.get_product(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.delete("/{id}")
def delete_product(id: int, db: Session = Depends(get_db)):
    product = product_service.delete_product(db, id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}
