# 📁 INFRA FORGE - Complete File Structure

Visual guide to the entire project structure with descriptions.

---

## 🌳 Complete Directory Tree

```
INFRA-FORGE/
│
├── 📄 Root Configuration Files
│   ├── .env.example                    # Environment variables template
│   ├── .gitignore                      # Git ignore patterns
│   ├── package.json                    # Root package config (monorepo)
│   ├── turbo.json                      # Turborepo configuration
│   ├── start.bat                       # Windows quick start script
│   └── start.sh                        # Unix/macOS quick start script
│
├── 📖 Documentation
│   ├── README.md                       # Project introduction
│   ├── SETUP.md                        # Detailed setup guide
│   ├── QUICK_START.md                  # 5-minute quick start
│   ├── PROJECT_OVERVIEW.md             # Complete technical docs
│   ├── IMPLEMENTATION_COMPLETE.md      # Build completion status
│   ├── TROUBLESHOOTING.md              # Common issues & fixes
│   └── STRUCTURE.md                    # This file
│
├── 🖥️ apps/web/                        # Frontend Application (Next.js)
│   ├── app/                            # Next.js App Router
│   │   ├── (dashboard)/                # Dashboard layout group
│   │   │   ├── chat/
│   │   │   │   └── page.tsx           # AI Chat interface
│   │   │   ├── contracts/
│   │   │   │   └── page.tsx           # Contract management
│   │   │   ├── audits/
│   │   │   │   └── page.tsx           # Security audit reports
│   │   │   ├── deployments/
│   │   │   │   └── page.tsx           # Deployment tracking
│   │   │   ├── templates/
│   │   │   │   └── page.tsx           # Template library
│   │   │   ├── settings/
│   │   │   │   └── page.tsx           # User settings
│   │   │   └── layout.tsx             # Dashboard layout with sidebar
│   │   ├── layout.tsx                  # Root layout
│   │   ├── page.tsx                    # Home/Loading page
│   │   └── globals.css                 # Global styles & Tailwind
│   │
│   ├── components/                     # React Components
│   │   ├── ui/
│   │   │   └── LoadingScreen.tsx      # Animated loading screen
│   │   ├── chat/
│   │   │   └── ChatInterface.tsx      # AI chat component
│   │   ├── editor/
│   │   │   └── MonacoEditor.tsx       # Code editor wrapper
│   │   └── layout/
│   │       └── Sidebar.tsx             # Navigation sidebar
│   │
│   ├── lib/                            # Utilities & Helpers
│   │   ├── api.ts                      # API client
│   │   ├── utils.ts                    # Utility functions
│   │   └── constants.ts                # App constants
│   │
│   ├── hooks/                          # Custom React hooks
│   ├── stores/                         # Zustand state stores
│   ├── types/                          # TypeScript definitions
│   │
│   ├── public/                         # Static assets
│   │   ├── logo.svg                    # App logo
│   │   └── fonts/                      # Custom fonts
│   │
│   ├── Configuration Files
│   │   ├── package.json                # Frontend dependencies
│   │   ├── tsconfig.json               # TypeScript config
│   │   ├── next.config.js              # Next.js config
│   │   ├── tailwind.config.ts          # Tailwind CSS config
│   │   └── postcss.config.js           # PostCSS config
│
├── 🔧 apps/api/                        # Backend Application (FastAPI)
│   ├── app/                            # Main application code
│   │   ├── routers/                    # API route handlers
│   │   │   ├── __init__.py
│   │   │   ├── auth.py                # Authentication endpoints
│   │   │   ├── chat.py                # AI chat endpoints
│   │   │   ├── contracts.py           # Contract CRUD endpoints
│   │   │   ├── security.py            # Security audit endpoints
│   │   │   ├── deployment.py          # Deployment endpoints
│   │   │   └── templates.py           # Template endpoints
│   │   │
│   │   ├── services/                   # Business logic
│   │   │   ├── __init__.py
│   │   │   ├── claude_service.py      # Claude AI integration
│   │   │   ├── security_service.py    # Slither/Mythril integration
│   │   │   └── deployment_service.py  # Web3 deployment logic
│   │   │
│   │   ├── schemas/                    # Pydantic models
│   │   │   ├── __init__.py
│   │   │   └── chat.py                # Chat request/response models
│   │   │
│   │   ├── models/                     # Database models (future)
│   │   ├── utils/                      # Utility functions
│   │   │
│   │   ├── __init__.py                # Package init
│   │   ├── main.py                    # FastAPI app entry point
│   │   └── config.py                  # App configuration
│   │
│   └── requirements.txt                # Python dependencies
│
├── 📦 packages/                        # Shared packages
│   │
│   ├── contracts/                      # Smart Contract Templates
│   │   ├── templates/
│   │   │   ├── erc20/
│   │   │   │   └── INFRAToken.sol     # ERC-20 template
│   │   │   ├── erc721/
│   │   │   │   └── INFRANFT.sol       # ERC-721 NFT template
│   │   │   ├── erc1155/               # ERC-1155 (future)
│   │   │   ├── defi/                  # DeFi contracts (future)
│   │   │   ├── vesting/
│   │   │   │   └── TokenVesting.sol   # Vesting contract
│   │   │   └── governance/            # DAO contracts (future)
│   │   │
│   │   ├── foundry.toml                # Foundry configuration
│   │   └── hardhat.config.ts           # Hardhat config (future)
│   │
│   └── security/                       # Security Tools Config
│       ├── slither/                    # Slither configs
│       ├── mythril/                    # Mythril configs
│       └── echidna/                    # Echidna configs (future)
│
└── 🐳 docker/                          # Docker Configuration
    ├── docker-compose.yml              # Multi-service orchestration
    ├── docker-compose.dev.yml          # Development overrides (future)
    ├── Dockerfile.web                  # Frontend Docker image
    ├── Dockerfile.api                  # Backend Docker image
    └── nginx/
        └── nginx.conf                  # Reverse proxy config
```

---

## 📊 File Count Summary

### Frontend (apps/web/)
- **Pages**: 8 (home, chat, contracts, audits, deployments, templates, settings, layout)
- **Components**: 4 (LoadingScreen, ChatInterface, MonacoEditor, Sidebar)
- **Config Files**: 5 (package.json, tsconfig.json, next.config.js, tailwind, postcss)
- **Utility Files**: 3 (api.ts, utils.ts, constants.ts)

### Backend (apps/api/)
- **Routers**: 6 (auth, chat, contracts, security, deployment, templates)
- **Services**: 3 (Claude, Security, Deployment)
- **Schemas**: 1 (chat)
- **Config Files**: 2 (config.py, requirements.txt)
- **Main Files**: 1 (main.py)

### Smart Contracts (packages/contracts/)
- **Templates**: 3 (ERC-20, ERC-721, Vesting)
- **Config**: 1 (foundry.toml)

### Docker (docker/)
- **Compose Files**: 1
- **Dockerfiles**: 2 (web, api)
- **Nginx Config**: 1

### Documentation
- **Guides**: 7 (README, SETUP, QUICK_START, PROJECT_OVERVIEW, IMPLEMENTATION_COMPLETE, TROUBLESHOOTING, STRUCTURE)

### Root Files
- **Config**: 3 (.env.example, package.json, turbo.json)
- **Scripts**: 2 (start.bat, start.sh)
- **Git**: 1 (.gitignore)

**Total Files Created**: 50+

---

## 🎨 Key File Descriptions

### Frontend

#### [app/page.tsx](apps/web/app/page.tsx)
Landing page with spectacular loading animation:
- Particle convergence effect
- Animated forge logo
- Progress bar with phases
- Automatic redirect to chat

#### [app/(dashboard)/chat/page.tsx](apps/web/app/(dashboard)/chat/page.tsx)
Main AI chat interface:
- Claude-powered conversations
- Code block rendering
- Security analysis display
- Message history

#### [components/ui/LoadingScreen.tsx](apps/web/components/ui/LoadingScreen.tsx)
Animated loading screen:
- 50 converging particles
- Gradient orbs
- Animated sparks
- Smooth transitions

#### [components/layout/Sidebar.tsx](apps/web/components/layout/Sidebar.tsx)
Navigation sidebar:
- Collapsible design
- Active page indicator
- Glassmorphic styling
- Smooth animations

#### [components/editor/MonacoEditor.tsx](apps/web/components/editor/MonacoEditor.tsx)
Code editor component:
- VS Code engine
- Solidity syntax highlighting
- Custom theme integration

#### [app/globals.css](apps/web/app/globals.css)
Global styles:
- Tailwind imports
- Custom scrollbar
- Glassmorphism classes
- Gradient utilities
- Ambient animations

### Backend

#### [app/main.py](apps/api/app/main.py)
FastAPI application:
- CORS middleware
- Router registration
- Health check endpoint
- Lifespan management

#### [app/services/claude_service.py](apps/api/app/services/claude_service.py)
Claude AI integration:
- Streaming responses
- Contract generation
- Security analysis
- Custom system prompt

#### [app/services/security_service.py](apps/api/app/services/security_service.py)
Security analysis:
- Slither static analysis
- Mythril symbolic execution
- Combined scoring
- Issue categorization

#### [app/services/deployment_service.py](apps/api/app/services/deployment_service.py)
Blockchain deployment:
- Multi-chain support
- Contract compilation
- Gas estimation
- Transaction monitoring

#### [app/routers/chat.py](apps/api/app/routers/chat.py)
Chat API endpoints:
- Message handling
- Streaming support
- Contract analysis

### Smart Contracts

#### [packages/contracts/templates/erc20/INFRAToken.sol](packages/contracts/templates/erc20/INFRAToken.sol)
ERC-20 token template:
- OpenZeppelin base
- Anti-bot protection
- Pausable transfers
- Burnable tokens

#### [packages/contracts/templates/erc721/INFRANFT.sol](packages/contracts/templates/erc721/INFRANFT.sol)
NFT collection template:
- Royalty support
- Batch minting
- URI storage
- Max supply limit

#### [packages/contracts/templates/vesting/TokenVesting.sol](packages/contracts/templates/vesting/TokenVesting.sol)
Vesting contract:
- Linear vesting
- Cliff period
- Revocable schedules
- Reentrancy protection

### Docker

#### [docker/docker-compose.yml](docker/docker-compose.yml)
Full stack orchestration:
- Frontend container
- Backend container
- PostgreSQL database
- Redis cache
- Nginx proxy

---

## 🔑 Key Directories

### `/apps/web/app/`
All Next.js pages using App Router. Each folder represents a route.

### `/apps/web/components/`
Reusable React components organized by category.

### `/apps/api/app/routers/`
FastAPI route handlers - each file is a set of related endpoints.

### `/apps/api/app/services/`
Business logic separated from API routes for better organization.

### `/packages/contracts/templates/`
Production-ready smart contract templates by category.

### `/docker/`
Container orchestration and configuration files.

---

## 📝 File Naming Conventions

### Frontend
- **Pages**: `page.tsx` (Next.js App Router)
- **Layouts**: `layout.tsx`
- **Components**: `PascalCase.tsx`
- **Utils**: `camelCase.ts`
- **Types**: `types.ts` or `*.d.ts`

### Backend
- **Routers**: `lowercase.py`
- **Services**: `*_service.py`
- **Models**: `lowercase.py`
- **Schemas**: `lowercase.py`

### Smart Contracts
- **Contracts**: `PascalCase.sol`
- **Interfaces**: `IPascalCase.sol`
- **Libraries**: `PascalCase.sol`

---

## 🎯 Navigation Guide

**Want to...**

- **Modify UI?** → `apps/web/components/`
- **Add API endpoint?** → `apps/api/app/routers/`
- **Change AI behavior?** → `apps/api/app/services/claude_service.py`
- **Add security check?** → `apps/api/app/services/security_service.py`
- **Create template?** → `packages/contracts/templates/`
- **Configure Docker?** → `docker/docker-compose.yml`
- **Update styles?** → `apps/web/app/globals.css` or `apps/web/tailwind.config.ts`

---

## 📦 Dependencies

### Frontend Dependencies (apps/web/package.json)
```json
{
  "next": "^14.2.0",
  "react": "^18.3.0",
  "typescript": "^5",
  "tailwindcss": "^3.4.0",
  "framer-motion": "^11.0.0",
  "@monaco-editor/react": "^4.6.0",
  "lucide-react": "^0.344.0",
  "zustand": "^4.5.0",
  "axios": "^1.6.7"
}
```

### Backend Dependencies (apps/api/requirements.txt)
```txt
fastapi==0.110.0
uvicorn[standard]==0.27.1
anthropic==0.18.1
web3==6.15.1
py-solc-x==2.0.2
sqlalchemy==2.0.27
redis==5.0.1
```

---

Built with 🔥 by INFRA Dev·Tech
