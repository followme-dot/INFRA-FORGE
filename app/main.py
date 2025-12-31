from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.routers import auth, chat, contracts, security, deployment, templates, bots
from app.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("INFRA FORGE API Starting...")
    print(f"Version: {settings.APP_VERSION}")
    print(f"CORS Origins: {settings.CORS_ORIGINS}")
    yield
    # Shutdown
    print("INFRA FORGE API Shutting down...")


app = FastAPI(
    title=settings.APP_NAME,
    description="Smart Contract Development Platform API",
    version=settings.APP_VERSION,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(chat.router, prefix="/api/chat", tags=["AI Chat"])
app.include_router(contracts.router, prefix="/api/contracts", tags=["Contracts"])
app.include_router(security.router, prefix="/api/security", tags=["Security"])
app.include_router(deployment.router, prefix="/api/deployment", tags=["Deployment"])
app.include_router(templates.router, prefix="/api/templates", tags=["Templates"])
app.include_router(bots.router, tags=["Trading Bots"])


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION
    }


@app.get("/")
async def root():
    return {
        "message": "⚡ Welcome to INFRA FORGE API",
        "tagline": "Where Innovation Meets Blockchain",
        "features": [
            "Smart Contract Generation",
            "Trading Bots (Grid, DCA, Arbitrage, Market Making)",
            "Security Audits",
            "Multi-Chain Deployment"
        ],
        "docs": "/docs",
        "health": "/health"
    }
