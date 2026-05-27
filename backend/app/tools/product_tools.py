from app.db.session import SessionLocal
from app.models.product_model import Product
from sqlalchemy import or_

# def search_products(query: str) -> str:
#     """
#     Search products in the tech store database by name or description.
#     Returns name, price, rating, and stock for matching products.
#     """
#     db = SessionLocal()

#     try:
#         q = query.lower().strip()

#         products = (
#             db.query(Product).filter(Product.name.ilike(f"%{q}%")).limit(10).all()
#         )

#         if not products:
#             return "No products found."

#         return "\n\n".join([f"""
#                     Product: {p.name}
#                     Price: {p.price}
#                     Rating: {p.rating}
#                     Stock: {p.stock}
#                     """.strip() for p in products])

#     finally:
#         db.close()


def normalize(q: str) -> str:
    q = q.lower().strip()
    # q = q.replace("headphones", "headphone")
    return q


def search_products(query: str) -> str:
    """
    Search products in the tech store database by name or description.
    Returns name, price, rating, and stock for matching products.
    """
    db = SessionLocal()

    q = normalize(query)

    try:
        products = (
            db.query(Product)
            .filter(
                or_(Product.name.ilike(f"%{q}%"), Product.description.ilike(f"%{q}%"))
            )
            .all()
        )

        # if not products:
        #     return "No products found."

        # return "\n\n".join(
        #     [
        #         f"Product: {p.name}\nPrice: {p.price}\nRating: {p.rating}\nStock: {p.stock}"
        #         for p in products
        #     ]
        # )

        if not products:
            return {"status": "empty", "products": []}

        return {
            "status": "ok",
            "products": [
                {
                    "name": p.name,
                    "price": p.price,
                    "rating": p.rating,
                    "stock": p.stock,
                }
                for p in products
            ],
        }

    finally:
        db.close()
