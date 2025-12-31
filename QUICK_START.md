# 🔥 INFRA FORGE - Quick Start Reference

**One-page guide to get started in 5 minutes**

---

## ⚡ Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] Python 3.10+ installed
- [ ] Git installed
- [ ] Text editor (VS Code recommended)

---

## 🚀 3-Step Quick Start

### Step 1: Configure Environment (2 min)

```bash
# Copy environment template
cp .env.example .env

# Edit .env and add these REQUIRED values:
# ANTHROPIC_API_KEY=sk-ant-...    (Get from console.anthropic.com)
# JWT_SECRET=<random-hex-32>       (Generate with: openssl rand -hex 32)
# ENCRYPTION_KEY=<random-hex-32>   (Generate with: openssl rand -hex 32)
```

### Step 2: Install Dependencies (5 min)

```bash
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
venv\Scripts\activate              # Windows
source venv/bin/activate           # macOS/Linux

pip install -r requirements.txt
cd ../..
```

### Step 3: Start the Application (1 min)

**Option A: Auto Start (Easiest)**
```bash
# Windows
start.bat

# macOS/Linux
chmod +x start.sh
./start.sh
```

**Option B: Manual Start**
```bash
# Terminal 1 - Frontend
cd apps/web
npm run dev

# Terminal 2 - Backend
cd apps/api
venv\Scripts\activate           # Windows
source venv/bin/activate        # macOS/Linux
uvicorn app.main:app --reload
```

---

## 🌐 Access Points

Once started, access:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

---

## 🎯 First Actions

### 1. Test the AI Chat
1. Go to http://localhost:3000
2. Wait for loading screen (4 seconds)
3. Navigate to "AI Chat"
4. Type: "Create a simple ERC-20 token"
5. See AI generate the contract!

### 2. Browse Templates
1. Click "Templates" in sidebar
2. View pre-built contracts
3. Click "Use Template" to deploy

### 3. Deploy a Contract
1. Go to "Deployments"
2. Select blockchain network
3. Deploy to testnet

---

## 🔑 Essential Commands

### Frontend
```bash
cd apps/web
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server
```

### Backend
```bash
cd apps/api
source venv/bin/activate                    # Activate venv
uvicorn app.main:app --reload              # Start dev server
uvicorn app.main:app --host 0.0.0.0        # Production server
```

### Docker
```bash
cd docker
docker-compose up -d        # Start all services
docker-compose down         # Stop all services
docker-compose logs -f      # View logs
```

---

## 🔧 Common Issues & Fixes

### "Port already in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### "Module not found"
```bash
# Frontend
cd apps/web
rm -rf node_modules .next
npm install

# Backend
cd apps/api
pip install -r requirements.txt --upgrade
```

### "Database connection failed"
```bash
# Use Docker database
cd docker
docker-compose up -d db redis
```

---

## 📝 API Keys Needed

### 1. Anthropic (Required)
- URL: https://console.anthropic.com/
- Create account → API Keys → Create Key
- Add to .env: `ANTHROPIC_API_KEY=sk-ant-...`

### 2. Blockchain RPCs (Optional - Use defaults)
- Alchemy: https://www.alchemy.com/
- Infura: https://www.infura.io/
- QuickNode: https://www.quicknode.com/

---

## 🎨 Key Features

✅ **AI Chat**: Generate contracts with Claude
✅ **Security Audits**: Automated vulnerability scanning
✅ **Multi-Chain**: Deploy to 10+ blockchains
✅ **Templates**: Pre-built verified contracts
✅ **Code Editor**: VS Code-powered editor

---

## 📚 Documentation

- **Full Setup**: [SETUP.md](./SETUP.md)
- **Architecture**: [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)
- **Troubleshooting**: [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Completion Status**: [IMPLEMENTATION_COMPLETE.md](./IMPLEMENTATION_COMPLETE.md)

---

## 🆘 Get Help

**Issue?** Check TROUBLESHOOTING.md
**Question?** Review PROJECT_OVERVIEW.md
**Error?** Read the error message carefully!

---

## 🎉 You're Ready!

That's it! You now have:
- ✅ A fully functional AI-powered smart contract platform
- ✅ Multi-chain deployment capabilities
- ✅ Automated security analysis
- ✅ Production-ready templates

**Start building amazing smart contracts!** 🔥

---

Built with 🔥 by INFRA Dev·Tech for INFRA Group & Nardiha Holdings
