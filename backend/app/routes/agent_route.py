from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from app.models.chat_model import ChatRequest
from app.services.agent_service import stream_chat_response

router = APIRouter(prefix="/agent", tags=["Agent"])


@router.post("")
async def chat(req: ChatRequest):
    async def event_generator():
        async for chunk in stream_chat_response(req):
            yield chunk

    return StreamingResponse(event_generator(), media_type="text/event-stream")
