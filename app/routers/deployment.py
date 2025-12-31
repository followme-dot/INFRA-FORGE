from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.services.deployment_service import deployment_service, CHAINS

router = APIRouter()


class DeployRequest(BaseModel):
    chain: str
    source_code: str
    contract_name: str
    constructor_args: List = []
    private_key: str


class DeploymentStatus(BaseModel):
    tx_hash: str
    contract_address: str
    chain: str
    explorer_url: str
    status: str = "success"


@router.get("/chains")
async def get_supported_chains():
    """
    Get list of supported blockchain networks
    """
    return {
        "chains": [
            {
                "id": chain_id,
                "name": config["name"],
                "chainId": config["chain_id"],
                "explorer": config["explorer"],
                "testnet": chain_id.endswith("_testnet") or chain_id.endswith("_sepolia") or chain_id.endswith("_mumbai")
            }
            for chain_id, config in CHAINS.items()
        ]
    }


@router.post("/compile")
async def compile_contract(source_code: str, contract_name: str):
    """
    Compile Solidity contract
    """
    try:
        result = deployment_service.compile_contract(source_code, contract_name)
        return {
            "success": True,
            "abi": result["abi"],
            "bytecode": result["bytecode"][:100] + "...",  # Truncate for display
            "message": "Contract compiled successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/deploy", response_model=DeploymentStatus)
async def deploy_contract(request: DeployRequest):
    """
    Deploy smart contract to blockchain
    """
    try:
        result = await deployment_service.deploy(
            chain=request.chain,
            source_code=request.source_code,
            contract_name=request.contract_name,
            constructor_args=request.constructor_args,
            private_key=request.private_key
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/estimate-gas")
async def estimate_gas(request: DeployRequest):
    """
    Estimate gas cost for deployment
    """
    try:
        estimate = await deployment_service.estimate_deployment_gas(
            chain=request.chain,
            source_code=request.source_code,
            contract_name=request.contract_name,
            constructor_args=request.constructor_args
        )
        return estimate
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
