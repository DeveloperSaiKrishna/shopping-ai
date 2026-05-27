from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import chat_route, product_route, agent_route

from fastapi.staticfiles import StaticFiles

from app.db.base import Base
from app.db.session import engine

app = FastAPI()

app.include_router(chat_route.router)
app.include_router(product_route.router)
app.include_router(agent_route.router)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# create tables
Base.metadata.create_all(bind=engine)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


@app.get("/")
def root():
    return {"status": "running"}
