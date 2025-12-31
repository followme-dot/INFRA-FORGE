import anthropic
from typing import AsyncGenerator
from app.config import settings
import json
import re

SYSTEM_PROMPT = """You are FORGE AI, the intelligent assistant for INFRA FORGE - a smart contract development platform for INFRA Group and Nardiha Holdings.

Your capabilities:
1. Generate secure smart contracts (ERC-20, ERC-721, ERC-1155, DeFi, Vesting, Governance)
2. Analyze contracts for security vulnerabilities
3. Explain blockchain concepts and best practices
4. Help with deployment across multiple chains (Ethereum, BSC, Polygon, Fantom, Arbitrum, Avalanche, Solana)

Security Requirements - ALWAYS include:
- Reentrancy guards (use OpenZeppelin's ReentrancyGuard)
- Access control (Ownable/AccessControl)
- Integer overflow protection (Solidity 0.8+)
- Anti-bot mechanisms when applicable
- Proper event emissions
- Gas optimizations
- Input validation
- No delegatecall to untrusted contracts

You work for these companies:
- INFRA Group: INFRABANK, INFRA VAULT CORE, INFRA Dev·Tech
- Nardiha Holdings: Nardiha Genesis Realms, Thor Wallet

Always use OpenZeppelin contracts when possible. Always explain your code. Always consider security first.

When generating code:
1. Use Solidity 0.8.20 or higher
2. Include SPDX license identifier
3. Import from @openzeppelin/contracts
4. Add comprehensive NatSpec comments
5. Emit events for state changes
6. Use custom errors (more gas efficient than require strings)"""


class ClaudeService:
    def __init__(self):
        self.client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)

    async def generate_response(
        self,
        messages: list[dict],
        stream: bool = True
    ) -> AsyncGenerator[str, None]:
        """Generate AI response with optional streaming"""

        response = self.client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=8192,
            system=SYSTEM_PROMPT,
            messages=messages,
            stream=stream
        )

        if stream:
            for event in response:
                if event.type == "content_block_delta":
                    yield event.delta.text
        else:
            yield response.content[0].text

    async def analyze_contract(self, code: str) -> dict:
        """Analyze smart contract for security issues"""

        analysis_prompt = f"""Analyze this smart contract for security vulnerabilities and provide a detailed report:

```solidity
{code}
```

Provide analysis in this exact JSON format:
{{
  "score": <0-100 integer>,
  "issues": [
    {{"severity": "high|medium|low", "line": <number or null>, "message": "<description>"}},
  ],
  "recommendations": ["<recommendation>"],
  "gas_optimizations": ["<optimization>"]
}}

Be thorough and check for:
- Reentrancy vulnerabilities
- Access control issues
- Integer overflow/underflow (if not using Solidity 0.8+)
- Unchecked external calls
- DoS vulnerabilities
- Front-running risks
- Gas optimization opportunities
- Best practices violations

Score calculation:
- High severity issue: -25 points each
- Medium severity: -10 points each
- Low severity: -2 points each
- Start from 100 points"""

        response = self.client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=4096,
            messages=[{"role": "user", "content": analysis_prompt}]
        )

        # Parse JSON from response
        text = response.content[0].text
        json_match = re.search(r'\{[\s\S]*\}', text)
        if json_match:
            try:
                return json.loads(json_match.group())
            except json.JSONDecodeError:
                pass

        return {
            "score": 0,
            "issues": [{"severity": "high", "line": None, "message": "Failed to analyze contract"}],
            "recommendations": [],
            "gas_optimizations": []
        }


claude_service = ClaudeService()
