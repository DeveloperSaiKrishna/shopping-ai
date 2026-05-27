from langchain_ollama import ChatOllama
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.chat_history import InMemoryChatMessageHistory
from langgraph.prebuilt import create_react_agent

from app.tools.product_tools import search_products, add_to_cart

memory_store = {}


def get_session_history(session_id: str):
    if session_id not in memory_store:
        memory_store[session_id] = InMemoryChatMessageHistory()
    return memory_store[session_id]


def build_chat_chain(model: str):
    llm = ChatOllama(
        model=model,
        streaming=False,  # 🔴 FIX
        temperature=0,
    )

    tools = [search_products, add_to_cart]

    return create_react_agent(llm, tools)
