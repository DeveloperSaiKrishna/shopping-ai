from langchain_ollama import ChatOllama
from langchain.agents import create_agent
from langgraph.checkpoint.memory import InMemorySaver


from app.tools.product_tools import search_products


def check_weather(location: str) -> str:
    """Return the weather forecast for the specified location."""
    return f"It's always sunny in {location}, "


# system_prompt = """
# You are a tech store assistant.

# Rules:
# - Always use tools for product or weather questions.
# - Never invent product details.
# - Convert tool results into a clear, friendly response.
# - If no products are found, say so clearly.
# - Do not mention tools to the user.
# - Keep responses short and useful.
# """
# system_prompt = """
# You are a tech store assistant.

# Rules:
# - Always use tools for product queries.
# - Tools return JSON.
# - Always convert JSON into this format:

# Product: <name>
# Price: ₹<price>
# Rating: <rating>
# Stock: <stock>

# - Do not add extra commentary.
# - Do not change structure.
# """

# system_prompt = """
# You are a strict tech store assistant.

# Rules:
# - Use tools for all product queries.
# - Respond in ONE line only.
# - Do NOT add explanations.
# - Do NOT repeat information.
# - Format:

# Product: <name> | Price: ₹<price> | Rating: <rating> | Stock: <stock>
# """

system_prompt = """
You are a deterministic assistant.

Rules:
- Only output tool result
- Never modify tool output
- Never add extra text
"""


async def stream_chat_response(req):
    llm = ChatOllama(
        model=req.model,
        temperature=0,
        streaming=True,
    )

    graph = create_agent(
        model=llm,
        tools=[check_weather, search_products],
        system_prompt=system_prompt,
        checkpointer=InMemorySaver(),
    )

    inputs = {
        "messages": [
            {
                "role": "user",
                "content": req.message,
            }
        ]
    }

    async for chunk, metadata in graph.astream(
        inputs,
        config={"configurable": {"thread_id": "user-1"}},
        stream_mode="messages",
    ):
        if chunk.content and metadata.get("langgraph_node") != "tools":
            yield chunk.content
