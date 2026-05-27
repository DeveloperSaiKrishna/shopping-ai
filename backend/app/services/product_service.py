from sqlalchemy.orm import Session
from app.models.product_model import Product
from app.schemas.product_schema import ProductCreate

from sqlalchemy.orm import Session
from app.models.product_model import Product


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


def search_products(db: Session, query: str):
    return db.query(Product).filter(Product.name.ilike(f"%{query}%")).all()


def filter_products(db: Session, query=None, min_price=None, max_price=None):
    q = db.query(Product)

    if query:
        q = q.filter(Product.name.ilike(f"%{query}%"))

    if min_price is not None:
        q = q.filter(Product.price >= min_price)

    if max_price is not None:
        q = q.filter(Product.price <= max_price)

    return q.all()
