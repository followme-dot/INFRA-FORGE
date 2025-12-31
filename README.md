# ⚡ INFRA FORGE

**"Where Innovation Meets Blockchain"**

La plataforma central de desarrollo para el ecosistema INFRA Group & Nardiha Holdings. Genera **Smart Contracts** y **Trading Bots** con inteligencia artificial integrada.

## 🏢 Ecosistema

- **INFRA VAULT**: Asset management protocols & DeFi
- **NARDIUM**: DApp ecosystem completo (DEX, NFT, Governance)
- **Clientes Custom**: Soluciones blockchain personalizadas
- **INFRA Group**: INFRABANK, INFRA Dev·Tech
- **Nardiha Holdings**: Nardiha Genesis Realms, Thor Wallet

## ✨ Características Principales

### Smart Contracts
- 🤖 **AI-Powered Development**: Generación con Claude 3.5 Sonnet
- 🛡️ **Security First**: Análisis automático de 8 vulnerabilidades
- 🚀 **Multi-Chain**: Deploy en 8 blockchains (Ethereum, BSC, Polygon, etc.)
- 📋 **Templates**: ERC-20, ERC-721, Vesting, Staking, DAOs
- ⚙️ **Gas Optimization**: Compilación optimizada automática

### Trading Bots (NUEVO)
- 📊 **Grid Trading**: Buy low, sell high en rangos
- 💰 **DCA Bots**: Dollar Cost Averaging sistemático
- ⚡ **Arbitrage**: Aprovecha diferencias entre exchanges
- 🎯 **Market Making**: Provee liquidez y gana spreads
- 📈 **AI Optimization**: Claude optimiza parámetros

### Plataforma
- 🎨 **UI Impactante**: Splash screen + Dashboard profesional
- 👥 **Multi-Tenant**: Roles (Admin/Developer/Analyst)
- 🔐 **Auth Seguro**: JWT + SSO + 2FA
- 📊 **Analytics**: Dashboards en tiempo real
- 🌐 **Responsive**: Desktop, tablet, mobile

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.10+
- Docker (optional)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd INFRA-FORGE

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your API keys

# Start development servers
npm run dev
```

### Frontend (Next.js)

```bash
cd apps/web
npm install
npm run dev
# Open http://localhost:3008
```

### Backend (FastAPI)

```bash
cd apps/api
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
# API at http://localhost:8000
```

## 📦 Estructura del Proyecto

```
INFRA-FORGE/
├── apps/
│   ├── web/                    # Next.js 14 frontend (Puerto 3008)
│   │   ├── app/
│   │   │   ├── (dashboard)/   # Dashboard protegido
│   │   │   │   ├── chat/      # Chat con Claude AI
│   │   │   │   ├── contracts/ # Gestión de contratos
│   │   │   │   ├── bots/      # Trading Bots (NUEVO)
│   │   │   │   ├── deployments/
│   │   │   │   ├── audits/
│   │   │   │   └── settings/
│   │   │   ├── login/         # Autenticación (NUEVO)
│   │   │   └── dashboard/     # Dashboard principal (NUEVO)
│   │   └── components/
│   │       ├── ui/
│   │       │   ├── SplashScreen.tsx (NUEVO)
│   │       │   └── LoadingScreen.tsx
│   │       └── dashboard/
│   │           └── WelcomeDashboard.tsx (NUEVO)
│   │
│   └── api/                    # FastAPI backend (Puerto 8000)
│       ├── app/
│       │   ├── routers/       # Endpoints REST
│       │   │   ├── chat.py
│       │   │   ├── contracts.py
│       │   │   ├── deployment.py
│       │   │   ├── security.py
│       │   │   └── templates.py
│       │   └── services/
│       │       ├── claude_service.py
│       │       ├── deployment_service.py
│       │       └── security_service.py
│       └── requirements.txt
│
├── packages/
│   └── contracts/             # Templates Solidity
│       └── templates/
│           ├── erc20/         # INFRAToken.sol
│           ├── erc721/        # INFRANFTs.sol
│           └── vesting/       # TokenVesting.sol
│
├── ECOSYSTEM_ARCHITECTURE.md  # Arquitectura completa (NUEVO)
├── MEJORAS_IMPLEMENTADAS.md   # Changelog detallado (NUEVO)
└── docker/                    # Docker Compose
```

## 🎨 Stack Tecnológico

**Frontend:**
- Next.js 14 (App Router) - Framework React
- TypeScript 5 - Type safety
- Tailwind CSS 3.4 - Styling con glassmorphism
- Framer Motion 11 - Animaciones fluidas
- Monaco Editor 4.6 - Editor de código integrado
- Zustand 4.5 - State management
- Lucide React - Iconografía moderna

**Backend:**
- FastAPI 0.115 - API REST moderna
- Python 3.10+ - Lenguaje principal
- Anthropic Claude 0.42 - IA generativa
- Web3.py 7.7 - Interacción blockchain
- py-solc-x 2.0 - Compilador Solidity
- PostgreSQL - Base de datos
- Redis 5.2 - Caché y sesiones
- ccxt - Trading bot integration (NUEVO)

**Blockchain:**
- Ethereum (Mainnet + Sepolia)
- BSC (Mainnet + Testnet)
- Polygon (Mainnet + Mumbai)
- Arbitrum, Avalanche, Fantom

**Security:**
- Automated vulnerability scanning
- 8 tipos de análisis (reentrancy, overflow, etc.)
- Gas optimization
- Access control validation

## 🚀 Navegación de la Plataforma

### Flujo de Usuario

```
1. Landing Page (/)
   ↓ Splash Screen impactante (5s)

2. Login (/login)
   ↓ Email/Password + SSO

3. Dashboard (/dashboard)
   ├─→ Quick Actions
   ├─→ Ecosystem Projects
   ├─→ Recent Activity
   └─→ Stats Overview

4. Módulos Principales
   ├─→ Smart Contracts (/contracts)
   ├─→ Trading Bots (/bots) ★ NUEVO
   ├─→ Security Audits (/audits)
   ├─→ Deployments (/deployments)
   ├─→ Templates (/templates)
   └─→ Settings (/settings)
```

### Roles y Permisos

**Administrator:**
- Acceso completo
- Gestión de usuarios
- Deployments a producción
- Configuración del sistema

**Developer:**
- Crear contratos y bots
- Deploy en testnets
- Auditorías de seguridad
- Acceso a documentación

**Analyst:**
- Ver dashboards
- Analytics de performance
- Reportes
- Sin permisos de deployment

## 🔐 Seguridad

### Smart Contracts
Análisis automático de:
- ✅ Reentrancy attacks
- ✅ Integer overflow/underflow
- ✅ Access control vulnerabilities
- ✅ Gas optimization
- ✅ Centralization risks
- ✅ Oracle manipulation
- ✅ Flash loan attacks
- ✅ Delegatecall safety

### Trading Bots
Risk management incluye:
- ⚡ Max drawdown limits
- ⚡ Position sizing automático
- ⚡ Stop-loss integration
- ⚡ Daily loss limits
- ⚡ Circuit breakers
- ⚡ API key security

## 📚 Documentación

- **[Quick Start Guide](QUICK_START.md)** - Inicio rápido
- **[Ecosystem Architecture](ECOSYSTEM_ARCHITECTURE.md)** - Arquitectura completa
- **[Mejoras Implementadas](MEJORAS_IMPLEMENTADAS.md)** - Changelog detallado
- **[Project Overview](PROJECT_OVERVIEW.md)** - Vista general del proyecto
- **[Troubleshooting](TROUBLESHOOTING.md)** - Solución de problemas

## 🎯 Casos de Uso

### INFRA VAULT
```typescript
// Contratos generados:
- Token Vesting (distribución programada)
- Staking Rewards (APY dinámico)
- Governance DAO (votación on-chain)
- Yield Farming (pools de liquidez)

// Bots desplegados:
- Liquidity Provider Bot
- Rebalancing Bot
- Yield Optimizer
```

### NARDIUM DApp
```typescript
// Contratos generados:
- DEX (AMM como Uniswap)
- NFT Marketplace (ERC-721/1155)
- Lending Protocol
- Launchpad (IDO platform)

// Bots desplegados:
- Arbitrage Bot (inter-DEX)
- Sniping Bot (nuevos listados)
- Market Maker Bot
- NFT Floor Price Bot
```

## 🌟 Novedades v2.0

### ✨ Características Nuevas
1. **Splash Screen Impactante** - Animaciones profesionales con partículas
2. **Sistema de Login** - Autenticación multi-método (Email/SSO)
3. **Dashboard Principal** - Vista personalizada por rol
4. **Módulo de Trading Bots** - 4 tipos de bots (Grid, DCA, Arbitrage, MM)
5. **Arquitectura Documentada** - Guías completas del ecosistema

### 🔧 Mejoras
- Puerto frontend cambiado a **3008** (evita conflictos)
- CORS actualizado para 3008/3009
- Navegación mejorada con Splash → Login → Dashboard
- Diseño unificado con tema glassmorphic
- Animaciones smooth con Framer Motion

## 📞 Soporte

**INFRA Group:**
- Email: dev@infragroup.com
- Internal Slack: #infra-forge

**Nardiha Holdings:**
- Email: support@nardihaholdings.com

## 📄 Licencia

**Privado** - INFRA Group & Nardiha Holdings

Todos los derechos reservados. Este software es propiedad exclusiva del ecosistema INFRA y no puede ser distribuido, modificado o utilizado sin autorización explícita.

---

**Built with ⚡ by INFRA Dev·Tech**

*"Forging the future of blockchain development"*
