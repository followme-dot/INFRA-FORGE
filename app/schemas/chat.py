from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str


class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    stream: bool = True


class ChatResponse(BaseModel):
    message: ChatMessage
    timestamp: datetime = datetime.now()


class CodeBlock(BaseModel):
    language: str
    code: str
    filename: Optional[str] = None


class SecurityIssue(BaseModel):
    severity: str  # "high", "medium", "low"
    message: str
    line: Optional[int] = None


class SecurityReport(BaseModel):
    score: int
    issues: List[SecurityIssue]
    recommendations: List[str] = []
    gas_optimizations: List[str] = []
