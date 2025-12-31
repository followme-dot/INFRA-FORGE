# 🔥 INFRA FORGE - Setup Guide

Complete setup instructions for the INFRA FORGE platform.

## Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Python** 3.10+ ([Download](https://www.python.org/))
- **Git** ([Download](https://git-scm.com/))
- **Docker** (Optional, for containerized deployment)

## Quick Start

### 1. Clone and Install

```bash
# Navigate to the project
cd INFRA-FORGE

# Install root dependencies
npm install

# Install frontend dependencies
cd apps/web
npm install
cd ../..

# Install backend dependencies
cd apps/api
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
cd ../..
```

### 2. Environment Configuration

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your API keys
# Required:
# - ANTHROPIC_API_KEY (Get from https://console.anthropic.com/)
# - JWT_SECRET (Generate with: openssl rand -hex 32)
# - ENCRYPTION_KEY (Generate with: openssl rand -hex 32)
```

### 3. Start Development Servers

#### Option A: Using npm scripts (recommended for development)

```bash
# Terminal 1 - Frontend
npm run web

# Terminal 2 - Backend
npm run api
```

#### Option B: Using Docker

```bash
# Start all services
cd docker
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## Configuration Details

### Frontend (.env in apps/web)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Backend (.env in apps/api)

```env
# Required
ANTHROPIC_API_KEY=your_key_here
JWT_SECRET=your_secret_here
ENCRYPTION_KEY=your_key_here

# Database (use Docker or local PostgreSQL)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/infraforge

# Redis (use Docker or local Redis)
REDIS_URL=redis://localhost:6379

# Blockchain RPCs (use your own API keys for production)
ETHEREUM_RPC=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
ETHEREUM_SEPOLIA_RPC=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
BSC_RPC=https://bsc-dataseed.binance.org
BSC_TESTNET_RPC=https://data-seed-prebsc-1-s1.binance.org:8545
POLYGON_RPC=https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY
POLYGON_MUMBAI_RPC=https://polygon-mumbai.g.alchemy.com/v2/YOUR_KEY
ARBITRUM_RPC=https://arb1.arbitrum.io/rpc
AVALANCHE_RPC=https://api.avax.network/ext/bc/C/rpc
FANTOM_RPC=https://rpc.ftm.tools
```

## Security Tools (Optional)

For full security analysis features, install:

```bash
# Slither (Static Analysis)
pip install slither-analyzer

# Mythril (Symbolic Execution)
pip install mythril

# Verify installation
slither --version
myth version
```

**Note**: These tools are optional but recommended for production use.

## Database Setup

### Using Docker (Recommended)

```bash
cd docker
docker-compose up -d db redis
```

### Local PostgreSQL

```bash
# Install PostgreSQL
# Create database
createdb infraforge

# Update DATABASE_URL in .env
DATABASE_URL=postgresql://your_user:your_password@localhost:5432/infraforge
```

### Local Redis

```bash
# Install Redis
# Start Redis server
redis-server

# Update REDIS_URL in .env
REDIS_URL=redis://localhost:6379
```

## Troubleshooting

### Frontend Issues

**Port 3000 already in use:**
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:3000 | xargs kill -9
```

**Module not found errors:**
```bash
cd apps/web
rm -rf node_modules package-lock.json
npm install
```

### Backend Issues

**ImportError or ModuleNotFoundError:**
```bash
cd apps/api
pip install -r requirements.txt --upgrade
```

**Database connection errors:**
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Verify credentials

**Solidity compilation errors:**
```bash
# Install solc
pip install py-solc-x
python -c "from solcx import install_solc; install_solc('0.8.20')"
```

### Docker Issues

**Containers won't start:**
```bash
# Check logs
docker-compose logs

# Rebuild containers
docker-compose down -v
docker-compose up --build
```

**Port conflicts:**
- Edit `docker-compose.yml` to use different ports
- Or stop conflicting services

## Development Workflow

### Frontend Development

```bash
cd apps/web

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Backend Development

```bash
cd apps/api

# Activate venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Run dev server with auto-reload
uvicorn app.main:app --reload --port 8000

# Run with custom host/port
uvicorn app.main:app --host 0.0.0.0 --port 8080 --reload
```

### Smart Contract Development

```bash
cd packages/contracts

# Install Foundry (if not installed)
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Compile contracts
forge build

# Run tests
forge test

# Deploy contract
forge create templates/erc20/INFRAToken.sol:INFRAToken --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

## Production Deployment

### Environment Variables

Ensure all production environment variables are set:
- Use strong JWT_SECRET and ENCRYPTION_KEY
- Use production RPC endpoints with API keys
- Set up proper database credentials
- Configure CORS_ORIGINS for your domain

### Docker Production

```bash
# Build production images
docker-compose -f docker/docker-compose.yml build

# Start services
docker-compose -f docker/docker-compose.yml up -d

# View logs
docker-compose -f docker/docker-compose.yml logs -f
```

### SSL/HTTPS Setup

Update `docker/nginx/nginx.conf` to include SSL certificates:

```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # ... rest of config
}
```

## API Keys

### Required API Keys

1. **Anthropic API Key**
   - Sign up: https://console.anthropic.com/
   - Create API key
   - Add to .env: `ANTHROPIC_API_KEY=your_key`

2. **Alchemy (Recommended for production)**
   - Sign up: https://www.alchemy.com/
   - Create apps for each network
   - Update RPC URLs in .env

3. **Etherscan/Block Explorers (For verification)**
   - Get API keys from respective explorers
   - Add to .env for contract verification

## Testing

### Frontend Tests

```bash
cd apps/web
npm run test
```

### Backend Tests

```bash
cd apps/api
pytest
```

### Smart Contract Tests

```bash
cd packages/contracts
forge test -vvv
```

## Support

For issues or questions:
- Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- Contact INFRA Dev·Tech team
- Review logs: `docker-compose logs` or application console

## Next Steps

1. ✅ Complete environment setup
2. ✅ Start development servers
3. 🔄 Integrate with Claude API
4. 🔄 Set up database schemas
5. 🔄 Deploy to staging environment
6. 🔄 Configure production environment

---

**Built with 🔥 by INFRA Dev·Tech for INFRA Group & Nardiha Holdings**
