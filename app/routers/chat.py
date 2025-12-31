from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from app.schemas.chat import ChatRequest, ChatResponse, ChatMessage
from app.services.claude_service import claude_service
from datetime import datetime
import json

router = APIRouter()


@router.post("/message")
async def send_message(request: ChatRequest):
    """
    Send message to Claude AI and get response
    """
    try:
        if request.stream:
            # Streaming response
            async def generate():
                async for chunk in claude_service.generate_response(
                    messages=[{"role": msg.role, "content": msg.content} for msg in request.messages],
                    stream=True
                ):
                    yield f"data: {json.dumps({'content': chunk})}\n\n"
                yield "data: [DONE]\n\n"

            return StreamingResponse(generate(), media_type="text/event-stream")
        else:
            # Non-streaming response
            response_text = ""
            async for chunk in claude_service.generate_response(
                messages=[{"role": msg.role, "content": msg.content} for msg in request.messages],
                stream=False
            ):
                response_text += chunk

            return ChatResponse(
                message=ChatMessage(
                    role="assistant",
                    content=response_text
                ),
                timestamp=datetime.now()
            )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/analyze-contract")
async def analyze_contract(code: str):
    """
    Analyze smart contract code for security issues
    """
    try:
        analysis = await claude_service.analyze_contract(code)
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
