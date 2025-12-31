from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

router = APIRouter()


class Contract(BaseModel):
    id: str
    name: str
    code: str
    language: str = "solidity"
    created_at: datetime
    updated_at: datetime
    security_score: Optional[int] = None


class CreateContractRequest(BaseModel):
    name: str
    code: str
    language: str = "solidity"


# Mock database
contracts_db: List[Contract] = []


@router.get("/", response_model=List[Contract])
async def list_contracts():
    """
    List all user contracts
    """
    return contracts_db


@router.post("/", response_model=Contract)
async def create_contract(request: CreateContractRequest):
    """
    Create a new contract
    """
    contract = Contract(
        id=str(len(contracts_db) + 1),
        name=request.name,
        code=request.code,
        language=request.language,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    contracts_db.append(contract)
    return contract


@router.get("/{contract_id}", response_model=Contract)
async def get_contract(contract_id: str):
    """
    Get a specific contract
    """
    for contract in contracts_db:
        if contract.id == contract_id:
            return contract
    raise HTTPException(status_code=404, detail="Contract not found")


@router.put("/{contract_id}", response_model=Contract)
async def update_contract(contract_id: str, code: str):
    """
    Update contract code
    """
    for contract in contracts_db:
        if contract.id == contract_id:
            contract.code = code
            contract.updated_at = datetime.now()
            return contract
    raise HTTPException(status_code=404, detail="Contract not found")


@router.delete("/{contract_id}")
async def delete_contract(contract_id: str):
    """
    Delete a contract
    """
    global contracts_db
    contracts_db = [c for c in contracts_db if c.id != contract_id]
    return {"message": "Contract deleted successfully"}
