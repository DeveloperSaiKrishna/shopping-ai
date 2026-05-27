from langchain_ollama import ChatOllama
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.chat_history import InMemoryChatMessageHistory

memory_store = {}


def get_session_history(session_id: str):
    print(session_id, "SESSSION")
    if session_id not in memory_store:
        memory_store[session_id] = InMemoryChatMessageHistory()

    return memory_store[session_id]


def build_chat_chain(model: str):
    llm = ChatOllama(model=model, streaming=True)

    prompt = ChatPromptTemplate.from_messages(
        [
            # ("system", "You are a helpful assistant."),
            MessagesPlaceholder("history"),
            ("human", "{input}"),
        ]
    )

    chain = prompt | llm

    return RunnableWithMessageHistory(
        chain,
        get_session_history,
        input_messages_key="input",
        history_messages_key="history",
    )
