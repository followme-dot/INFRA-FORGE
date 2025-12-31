# 🔧 INFRA FORGE - Troubleshooting Guide

Common issues and their solutions.

---

## 🚀 Starting the Application

### Issue: "Port 3000 already in use"

**Solution (Windows):**
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process
taskkill /PID <PID> /F
```

**Solution (macOS/Linux):**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Issue: "Port 8000 already in use"

Same solution as above, replace 3000 with 8000.

---

## 📦 Installation Issues

### Issue: "npm install fails"

**Solution:**
```bash
# Clear cache and reinstall
cd apps/web
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Issue: "pip install fails"

**Solution:**
```bash
cd apps/api

# Upgrade pip
python -m pip install --upgrade pip

# Install with --upgrade flag
pip install -r requirements.txt --upgrade

# If still fails, try one by one
pip install fastapi
pip install uvicorn
# ... etc
```

### Issue: "Python version incompatible"

**Solution:**
```bash
# Check Python version
python --version  # Should be 3.10+

# If using wrong version, use pyenv or conda
# Install Python 3.11
# Recreate venv with correct version
```

---

## 🔐 Environment Configuration

### Issue: ".env file not found"

**Solution:**
```bash
# Copy example file
cp .env.example .env

# Edit with your values
# Windows: notepad .env
# macOS/Linux: nano .env
```

### Issue: "ANTHROPIC_API_KEY is required"

**Solution:**
1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Create new API key
4. Add to .env:
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   ```

### Issue: "JWT_SECRET is required"

**Solution:**
```bash
# Generate secure secret
openssl rand -hex 32

# Add to .env
JWT_SECRET=<generated_value>
```

---

## 💾 Database Issues

### Issue: "Database connection failed"

**Solution:**
```bash
# Check if PostgreSQL is running
# Windows: services.msc → PostgreSQL
# macOS: brew services list
# Linux: systemctl status postgresql

# Verify DATABASE_URL in .env
DATABASE_URL=postgresql://user:password@localhost:5432/infraforge

# Test connection
psql -h localhost -U user -d infraforge
```

### Issue: "Database 'infraforge' does not exist"

**Solution:**
```bash
# Create database
createdb infraforge

# Or with psql
psql -U postgres
CREATE DATABASE infraforge;
```

### Issue: "Using Docker database but can't connect"

**Solution:**
```bash
# Start Docker database
cd docker
docker-compose up -d db

# Check if running
docker-compose ps

# Check logs
docker-compose logs db

# Update .env for Docker
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/infraforge
```

---

## 🔴 Redis Issues

### Issue: "Redis connection failed"

**Solution:**
```bash
# Check if Redis is running
# Windows: Check services
# macOS: brew services list
# Linux: systemctl status redis

# Start Redis with Docker
cd docker
docker-compose up -d redis

# Update REDIS_URL in .env
REDIS_URL=redis://localhost:6379
```

---

## 🤖 AI/Claude Issues

### Issue: "Claude API returns 401 Unauthorized"

**Solution:**
```bash
# Check API key validity
# Go to https://console.anthropic.com/
# Generate new key if expired

# Update .env
ANTHROPIC_API_KEY=sk-ant-new-key-here
```

### Issue: "Claude API rate limit exceeded"

**Solution:**
```bash
# Check your plan limits at console.anthropic.com
# Upgrade plan if needed
# Implement request throttling
# Add delay between requests
```

### Issue: "Claude responses are slow"

**Solution:**
- Enable streaming mode (already default)
- Check network connection
- Verify API endpoint is correct
- Consider upgrading API plan

---

## 🔧 Compilation Issues

### Issue: "Solidity compilation fails"

**Solution:**
```bash
cd apps/api

# Install solc
pip install py-solc-x

# Install Solidity compiler
python -c "from solcx import install_solc; install_solc('0.8.20')"

# Set solc version
python -c "from solcx import set_solc_version; set_solc_version('0.8.20')"
```

### Issue: "OpenZeppelin imports not found"

**Solution:**
```bash
cd packages/contracts

# Install OpenZeppelin
npm install @openzeppelin/contracts

# Or with Foundry
forge install OpenZeppelin/openzeppelin-contracts
```

---

## 🔒 Security Tools Issues

### Issue: "Slither not found"

**Solution:**
```bash
# Install Slither
pip install slither-analyzer

# Verify installation
slither --version

# If fails, install dependencies
# Ubuntu/Debian:
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install solc

# macOS:
brew install solidity
```

### Issue: "Mythril not found"

**Solution:**
```bash
# Install Mythril
pip install mythril

# Verify installation
myth version

# Note: Mythril is optional and can be slow
# You can skip it during development
```

---

## 🌐 Blockchain/RPC Issues

### Issue: "Web3 connection failed"

**Solution:**
```bash
# Check RPC URL is correct
# Test RPC endpoint
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' YOUR_RPC_URL

# Common free RPC endpoints:
# Ethereum: https://eth.public-rpc.com
# BSC: https://bsc-dataseed.binance.org
# Polygon: https://polygon-rpc.com

# Update .env with working RPC
```

### Issue: "Gas estimation fails"

**Solution:**
```bash
# Ensure sufficient balance in wallet
# Check RPC endpoint is working
# Try different RPC endpoint
# Verify contract code is valid
```

### Issue: "Transaction fails"

**Solution:**
- Check wallet has sufficient balance
- Verify gas price is adequate
- Ensure contract code is valid
- Check network is not congested
- Verify private key is correct

---

## 🐳 Docker Issues

### Issue: "docker-compose command not found"

**Solution:**
```bash
# Install Docker Desktop
# Windows/macOS: Download from docker.com
# Linux:
sudo apt-get install docker-compose

# Verify installation
docker-compose --version
```

### Issue: "Docker containers won't start"

**Solution:**
```bash
# Check Docker is running
docker ps

# View logs
cd docker
docker-compose logs

# Rebuild containers
docker-compose down -v
docker-compose up --build

# Clean Docker system
docker system prune -a
```

### Issue: "Port conflicts with Docker"

**Solution:**
```yaml
# Edit docker-compose.yml
# Change port mappings
services:
  web:
    ports:
      - "3001:3000"  # Changed from 3000:3000

  api:
    ports:
      - "8001:8000"  # Changed from 8000:8000
```

---

## 🎨 Frontend Issues

### Issue: "Module not found errors"

**Solution:**
```bash
cd apps/web

# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Restart dev server
npm run dev
```

### Issue: "Styles not loading"

**Solution:**
```bash
# Check Tailwind config is correct
# Verify globals.css is imported in layout.tsx
# Clear browser cache
# Hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)
```

### Issue: "Framer Motion animations not working"

**Solution:**
```bash
# Ensure framer-motion is installed
npm list framer-motion

# Reinstall if needed
npm install framer-motion

# Check for React version conflicts
```

---

## 🔧 Backend Issues

### Issue: "FastAPI server won't start"

**Solution:**
```bash
cd apps/api

# Check for errors
uvicorn app.main:app --reload

# Common fixes:
# 1. Activate venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Unix

# 2. Verify all dependencies installed
pip install -r requirements.txt

# 3. Check Python path
which python  # Should show venv path
```

### Issue: "Import errors in Python"

**Solution:**
```bash
# Verify you're in the correct directory
cd apps/api

# Check if __init__.py files exist
# apps/api/app/__init__.py
# apps/api/app/routers/__init__.py
# apps/api/app/services/__init__.py

# Activate venv
source venv/bin/activate

# Reinstall packages
pip install -r requirements.txt
```

---

## 🔍 Debugging Tips

### Enable Debug Mode

**Frontend:**
```bash
# In .env or .env.local
NEXT_PUBLIC_DEBUG=true
```

**Backend:**
```python
# In apps/api/app/config.py
DEBUG = True
```

### Check Logs

**Frontend:**
```bash
# Browser console (F12)
# Terminal where npm run dev is running
```

**Backend:**
```bash
# Terminal where uvicorn is running
# Add more logging:
import logging
logging.basicConfig(level=logging.DEBUG)
```

**Docker:**
```bash
cd docker
docker-compose logs -f
docker-compose logs web
docker-compose logs api
```

---

## 📱 Network Issues

### Issue: "API requests failing"

**Solution:**
```bash
# Check API URL in frontend .env
NEXT_PUBLIC_API_URL=http://localhost:8000

# Verify CORS settings in backend
# apps/api/app/main.py
# CORS_ORIGINS should include frontend URL

# Test API directly
curl http://localhost:8000/health
```

### Issue: "CORS errors"

**Solution:**
```python
# In apps/api/app/config.py
CORS_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3001",
    # Add your frontend URLs
]
```

---

## 🛠️ General Debugging

### Step 1: Check Basics
- [ ] .env file exists and is configured
- [ ] All API keys are valid
- [ ] Ports 3000 and 8000 are free
- [ ] Node.js and Python are correct versions
- [ ] Dependencies are installed

### Step 2: Check Services
- [ ] PostgreSQL is running
- [ ] Redis is running (if used)
- [ ] Docker is running (if using Docker)

### Step 3: Check Logs
- [ ] Frontend console (F12)
- [ ] Backend terminal
- [ ] Docker logs (if applicable)

### Step 4: Clean Restart
```bash
# Stop all services
# Clear caches
# Reinstall dependencies
# Restart services
```

---

## 💡 Pro Tips

1. **Always activate venv** before running Python commands
2. **Check node_modules** if frontend issues
3. **Clear browser cache** if styles look wrong
4. **Read error messages** carefully - they often tell you exactly what's wrong
5. **Check file paths** - Windows uses backslash, Unix uses forward slash
6. **Use Docker** for consistent environments
7. **Keep dependencies updated** but test after updates

---

## 🆘 Still Having Issues?

1. **Check logs** for specific error messages
2. **Search error** on Google/Stack Overflow
3. **Review documentation** in this repo
4. **Contact support** team
5. **Create issue** with:
   - Error message
   - Steps to reproduce
   - Environment details (OS, versions)
   - Logs

---

## 📞 Support Resources

- **Setup Guide**: [SETUP.md](./SETUP.md)
- **Project Overview**: [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)
- **Implementation Status**: [IMPLEMENTATION_COMPLETE.md](./IMPLEMENTATION_COMPLETE.md)

---

**Last Updated**: December 2024

Built with 🔥 by INFRA Dev·Tech
