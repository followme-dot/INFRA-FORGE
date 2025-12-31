import subprocess
import json
import tempfile
import os
from pathlib import Path
from typing import Optional


class SecurityService:
    """Service for running security analysis tools"""

    async def run_slither(self, contract_code: str, filename: str = "Contract.sol") -> dict:
        """Run Slither static analysis"""

        with tempfile.TemporaryDirectory() as tmpdir:
            # Write contract to temp file
            contract_path = Path(tmpdir) / filename
            contract_path.write_text(contract_code)

            try:
                # Run slither
                result = subprocess.run(
                    ["slither", str(contract_path), "--json", "-"],
                    capture_output=True,
                    text=True,
                    timeout=60
                )

                if result.stdout:
                    return json.loads(result.stdout)

                return {"success": False, "error": result.stderr or "Slither analysis failed"}

            except subprocess.TimeoutExpired:
                return {"success": False, "error": "Analysis timeout"}
            except FileNotFoundError:
                return {
                    "success": False,
                    "error": "Slither not installed. Install with: pip install slither-analyzer"
                }
            except Exception as e:
                return {"success": False, "error": str(e)}

    async def run_mythril(self, contract_code: str) -> dict:
        """Run Mythril symbolic analysis"""

        with tempfile.NamedTemporaryFile(suffix=".sol", delete=False, mode='w') as f:
            f.write(contract_code)
            temp_path = f.name

        try:
            result = subprocess.run(
                ["myth", "analyze", temp_path, "-o", "json"],
                capture_output=True,
                text=True,
                timeout=300  # Mythril can take longer
            )

            os.unlink(temp_path)

            if result.stdout:
                return json.loads(result.stdout)

            return {"success": False, "error": result.stderr or "Mythril analysis failed"}

        except subprocess.TimeoutExpired:
            if os.path.exists(temp_path):
                os.unlink(temp_path)
            return {"success": False, "error": "Analysis timeout (>5 minutes)"}
        except FileNotFoundError:
            if os.path.exists(temp_path):
                os.unlink(temp_path)
            return {
                "success": False,
                "error": "Mythril not installed. Install with: pip install mythril"
            }
        except Exception as e:
            if os.path.exists(temp_path):
                os.unlink(temp_path)
            return {"success": False, "error": str(e)}

    async def full_audit(self, contract_code: str) -> dict:
        """Run complete security audit"""

        slither_results = await self.run_slither(contract_code)
        mythril_results = await self.run_mythril(contract_code)

        # Combine and score
        all_issues = []

        # Process Slither results
        if slither_results.get("success", True) and not slither_results.get("error"):
            detectors = slither_results.get("results", {}).get("detectors", [])
            for detector in detectors:
                impact = detector.get("impact", "unknown").lower()
                all_issues.append({
                    "tool": "slither",
                    "severity": impact if impact in ["high", "medium", "low"] else "low",
                    "confidence": detector.get("confidence", "unknown"),
                    "description": detector.get("description", ""),
                    "check": detector.get("check", "")
                })

        # Process Mythril results
        if mythril_results.get("success", True) and not mythril_results.get("error"):
            issues = mythril_results.get("issues", [])
            for issue in issues:
                severity = issue.get("severity", "unknown").lower()
                all_issues.append({
                    "tool": "mythril",
                    "severity": severity if severity in ["high", "medium", "low"] else "low",
                    "description": issue.get("description", ""),
                    "swc_id": issue.get("swc-id", "")
                })

        # Calculate score
        high_count = sum(1 for i in all_issues if i["severity"] == "high")
        medium_count = sum(1 for i in all_issues if i["severity"] == "medium")
        low_count = sum(1 for i in all_issues if i["severity"] == "low")

        score = max(0, 100 - (high_count * 25) - (medium_count * 10) - (low_count * 2))

        tools_run = []
        if not slither_results.get("error"):
            tools_run.append("slither")
        if not mythril_results.get("error"):
            tools_run.append("mythril")

        return {
            "score": score,
            "issues": all_issues,
            "summary": {
                "high": high_count,
                "medium": medium_count,
                "low": low_count,
                "total": len(all_issues)
            },
            "tools_used": tools_run,
            "errors": {
                "slither": slither_results.get("error"),
                "mythril": mythril_results.get("error")
            }
        }


security_service = SecurityService()
