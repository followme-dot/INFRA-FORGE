from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.security_service import security_service

router = APIRouter()


class AuditRequest(BaseModel):
    code: str
    filename: str = "Contract.sol"


@router.post("/audit")
async def run_full_audit(request: AuditRequest):
    """
    Run complete security audit (Slither + Mythril)
    """
    try:
        result = await security_service.full_audit(request.code)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/slither")
async def run_slither(request: AuditRequest):
    """
    Run Slither static analysis
    """
    try:
        result = await security_service.run_slither(request.code, request.filename)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/mythril")
async def run_mythril(request: AuditRequest):
    """
    Run Mythril symbolic analysis
    """
    try:
        result = await security_service.run_mythril(request.code)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
