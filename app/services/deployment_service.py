from web3 import Web3
from solcx import compile_source, install_solc, set_solc_version
import json
from typing import Optional, List
from app.config import settings

# Chain configurations
CHAINS = {
    "ethereum": {
        "name": "Ethereum Mainnet",
        "rpc": settings.ETHEREUM_RPC,
        "chain_id": 1,
        "explorer": "https://etherscan.io"
    },
    "ethereum_sepolia": {
        "name": "Ethereum Sepolia",
        "rpc": settings.ETHEREUM_SEPOLIA_RPC,
        "chain_id": 11155111,
        "explorer": "https://sepolia.etherscan.io"
    },
    "bsc": {
        "name": "BNB Smart Chain",
        "rpc": settings.BSC_RPC,
        "chain_id": 56,
        "explorer": "https://bscscan.com"
    },
    "bsc_testnet": {
        "name": "BSC Testnet",
        "rpc": settings.BSC_TESTNET_RPC,
        "chain_id": 97,
        "explorer": "https://testnet.bscscan.com"
    },
    "polygon": {
        "name": "Polygon",
        "rpc": settings.POLYGON_RPC,
        "chain_id": 137,
        "explorer": "https://polygonscan.com"
    },
    "polygon_mumbai": {
        "name": "Polygon Mumbai",
        "rpc": settings.POLYGON_MUMBAI_RPC,
        "chain_id": 80001,
        "explorer": "https://mumbai.polygonscan.com"
    },
    "arbitrum": {
        "name": "Arbitrum One",
        "rpc": settings.ARBITRUM_RPC,
        "chain_id": 42161,
        "explorer": "https://arbiscan.io"
    },
    "avalanche": {
        "name": "Avalanche C-Chain",
        "rpc": settings.AVALANCHE_RPC,
        "chain_id": 43114,
        "explorer": "https://snowtrace.io"
    },
    "fantom": {
        "name": "Fantom Opera",
        "rpc": settings.FANTOM_RPC,
        "chain_id": 250,
        "explorer": "https://ftmscan.com"
    }
}


class DeploymentService:
    def __init__(self):
        try:
            install_solc("0.8.20")
            set_solc_version("0.8.20")
        except Exception as e:
            print(f"Warning: Could not install solc: {e}")

    def compile_contract(self, source_code: str, contract_name: str) -> dict:
        """Compile Solidity contract"""

        try:
            compiled = compile_source(
                source_code,
                output_values=["abi", "bin"],
                solc_version="0.8.20"
            )

            # Find the contract
            for key, value in compiled.items():
                if contract_name in key:
                    return {
                        "abi": value["abi"],
                        "bytecode": value["bin"]
                    }

            raise ValueError(f"Contract {contract_name} not found in compilation output")

        except Exception as e:
            raise Exception(f"Compilation failed: {str(e)}")

    async def deploy(
        self,
        chain: str,
        source_code: str,
        contract_name: str,
        constructor_args: List = None,
        private_key: str = None
    ) -> dict:
        """Deploy contract to specified chain"""

        if chain not in CHAINS:
            raise ValueError(f"Unsupported chain: {chain}")

        chain_config = CHAINS[chain]
        w3 = Web3(Web3.HTTPProvider(chain_config["rpc"]))

        if not w3.is_connected():
            raise ConnectionError(f"Failed to connect to {chain_config['name']}")

        # Compile
        compiled = self.compile_contract(source_code, contract_name)

        # Create contract
        contract = w3.eth.contract(
            abi=compiled["abi"],
            bytecode=compiled["bytecode"]
        )

        # Get account
        if not private_key:
            raise ValueError("Private key is required for deployment")

        account = w3.eth.account.from_key(private_key)

        # Build transaction
        constructor_txn = contract.constructor(
            *(constructor_args or [])
        ).build_transaction({
            "from": account.address,
            "nonce": w3.eth.get_transaction_count(account.address),
            "gas": 3000000,
            "gasPrice": w3.eth.gas_price,
        })

        # Sign and send transaction
        signed_txn = account.sign_transaction(constructor_txn)
        tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)

        # Wait for transaction receipt
        tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

        return {
            "tx_hash": tx_hash.hex(),
            "contract_address": tx_receipt.contractAddress,
            "chain": chain,
            "explorer_url": f"{chain_config['explorer']}/address/{tx_receipt.contractAddress}",
            "status": "success" if tx_receipt.status == 1 else "failed"
        }

    async def estimate_deployment_gas(
        self,
        chain: str,
        source_code: str,
        contract_name: str,
        constructor_args: List = None
    ) -> dict:
        """Estimate gas cost for deployment"""

        if chain not in CHAINS:
            raise ValueError(f"Unsupported chain: {chain}")

        chain_config = CHAINS[chain]
        w3 = Web3(Web3.HTTPProvider(chain_config["rpc"]))

        if not w3.is_connected():
            raise ConnectionError(f"Failed to connect to {chain_config['name']}")

        # Compile
        compiled = self.compile_contract(source_code, contract_name)

        # Create contract
        contract = w3.eth.contract(
            abi=compiled["abi"],
            bytecode=compiled["bytecode"]
        )

        # Estimate gas
        gas_estimate = contract.constructor(
            *(constructor_args or [])
        ).estimate_gas()

        gas_price = w3.eth.gas_price
        total_cost_wei = gas_estimate * gas_price
        total_cost_eth = w3.from_wei(total_cost_wei, 'ether')

        return {
            "gas_estimate": gas_estimate,
            "gas_price_gwei": w3.from_wei(gas_price, 'gwei'),
            "total_cost_wei": total_cost_wei,
            "total_cost_eth": float(total_cost_eth),
            "chain": chain
        }


deployment_service = DeploymentService()
