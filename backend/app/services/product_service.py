from sqlalchemy.orm import Session
from app.models.product_model import Product
from app.schemas.product_schema import ProductCreate


def create_product(db: Session, product: ProductCreate):
    db_product = Product(**product.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


def get_products(db: Session):
    return db.query(Product).all()


def get_product(db: Session, product_id: int):
    return db.query(Product).filter(Product.id == product_id).first()


def delete_product(db: Session, id: int):
    product = db.query(Product).filter(Product.id == id).first()
    if not product:
        return None
    db.delete(product)
    db.commit()
    return product
