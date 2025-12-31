from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Union
from pydantic import field_validator


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="ignore"
    )
    # App
    APP_NAME: str = "INFRA FORGE API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    # API Keys
    ANTHROPIC_API_KEY: str

    # Database
    DATABASE_URL: str = "postgresql://user:password@localhost:5432/infraforge"

    # Redis
    REDIS_URL: str = "redis://localhost:6379"

    # Security
    JWT_SECRET: str
    ENCRYPTION_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    # CORS
    CORS_ORIGINS: Union[List[str], str] = ["http://localhost:3000", "http://localhost:3001"]

    @field_validator('CORS_ORIGINS', mode='before')
    @classmethod
    def parse_cors_origins(cls, v):
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(',')]
        return v

    # Blockchain RPCs
    ETHEREUM_RPC: str
    ETHEREUM_SEPOLIA_RPC: str
    BSC_RPC: str
    BSC_TESTNET_RPC: str
    POLYGON_RPC: str
    POLYGON_MUMBAI_RPC: str
    ARBITRUM_RPC: str
    AVALANCHE_RPC: str
    FANTOM_RPC: str


settings = Settings()
