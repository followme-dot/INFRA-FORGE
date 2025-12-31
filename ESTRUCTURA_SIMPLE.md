# 📁 INFRA FORGE - Estructura Simplificada (Español)

## 🎯 Ubicación de Frontend y Backend

```
INFRA-FORGE/
│
├── apps/
│   ├── web/          ← 🖥️ ESTO ES EL FRONTEND (Next.js)
│   └── api/          ← 🔧 ESTO ES EL BACKEND (FastAPI)
│
├── packages/         ← Código compartido (contratos, utilidades)
├── docker/           ← Configuración de Docker
└── docs/             ← Documentación
```

---

## 🖥️ FRONTEND (apps/web/)

**Ubicación**: `D:\Holdingns\INFRA-FORGE\apps\web\`

**Qué contiene:**
```
apps/web/
├── app/              ← Páginas de la aplicación
│   ├── page.tsx      ← Página de inicio (pantalla de carga)
│   ├── layout.tsx    ← Layout principal
│   ├── globals.css   ← Estilos globales
│   └── (dashboard)/  ← Páginas del dashboard
│       ├── chat/     ← Interfaz de chat con IA
│       ├── contracts/← Gestión de contratos
│       ├── audits/   ← Reportes de seguridad
│       ├── deployments/← Despliegues
│       ├── templates/← Plantillas
│       └── settings/ ← Configuración
│
├── components/       ← Componentes React
│   ├── ui/          ← Componentes de interfaz
│   ├── chat/        ← Componentes del chat
│   ├── editor/      ← Editor de código
│   └── layout/      ← Componentes de layout
│
├── lib/             ← Utilidades y funciones helper
├── package.json     ← Dependencias del frontend
└── next.config.js   ← Configuración de Next.js
```

**Tecnologías:**
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (animaciones)
- Monaco Editor (editor de código)

**Para iniciar:**
```bash
cd apps/web
npm install
npm run dev
# Abre http://localhost:3000
```

---

## 🔧 BACKEND (apps/api/)

**Ubicación**: `D:\Holdingns\INFRA-FORGE\apps\api\`

**Qué contiene:**
```
apps/api/
├── app/
│   ├── main.py           ← Aplicación principal FastAPI
│   ├── config.py         ← Configuración
│   │
│   ├── routers/          ← Endpoints de la API
│   │   ├── auth.py       ← Autenticación
│   │   ├── chat.py       ← Chat con IA
│   │   ├── contracts.py  ← Gestión de contratos
│   │   ├── security.py   ← Auditorías de seguridad
│   │   ├── deployment.py ← Despliegue de contratos
│   │   └── templates.py  ← Plantillas
│   │
│   ├── services/         ← Lógica de negocio
│   │   ├── claude_service.py      ← Integración con Claude IA
│   │   ├── security_service.py    ← Análisis de seguridad
│   │   └── deployment_service.py  ← Despliegue blockchain
│   │
│   └── schemas/          ← Modelos de datos (Pydantic)
│
└── requirements.txt      ← Dependencias de Python
```

**Tecnologías:**
- FastAPI (framework web)
- Python 3.10+
- Claude API (Anthropic)
- Web3.py (blockchain)
- Slither & Mythril (seguridad)
- PostgreSQL (base de datos)
- Redis (caché)

**Para iniciar:**
```bash
cd apps/api
python -m venv venv
venv\Scripts\activate    # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
# Abre http://localhost:8000
```

---

## 📦 PACKAGES (packages/)

**Código compartido entre aplicaciones**

```
packages/
├── contracts/        ← Plantillas de Smart Contracts
│   └── templates/
│       ├── erc20/    ← Tokens ERC-20
│       ├── erc721/   ← NFTs
│       └── vesting/  ← Contratos de vesting
│
└── security/         ← Configuraciones de herramientas de seguridad
```

---

## 🐳 DOCKER (docker/)

**Configuración para contenedores**

```
docker/
├── docker-compose.yml  ← Orquestación de servicios
├── Dockerfile.web      ← Imagen Docker del frontend
├── Dockerfile.api      ← Imagen Docker del backend
└── nginx/
    └── nginx.conf      ← Configuración del proxy
```

**Servicios incluidos:**
- Frontend (Next.js) → Puerto 3000
- Backend (FastAPI) → Puerto 8000
- PostgreSQL → Puerto 5432
- Redis → Puerto 6379
- Nginx → Puerto 80

---

## 📖 DOCUMENTACIÓN

```
INFRA-FORGE/
├── README.md                       ← Introducción del proyecto
├── QUICK_START.md                  ← Inicio rápido (5 minutos)
├── SETUP.md                        ← Guía de instalación detallada
├── PROJECT_OVERVIEW.md             ← Documentación técnica completa
├── IMPLEMENTATION_COMPLETE.md      ← Estado de implementación
├── TROUBLESHOOTING.md              ← Solución de problemas
└── STRUCTURE.md                    ← Estructura del proyecto
```

---

## 🚀 Cómo Iniciar TODO

### Opción 1: Script Automático (Más Fácil)

**Windows:**
```bash
# 1. Configurar .env
cp .env.example .env
# Edita .env con tu API key de Anthropic

# 2. Ejecutar
start.bat
```

**macOS/Linux:**
```bash
# 1. Configurar .env
cp .env.example .env
# Edita .env con tu API key de Anthropic

# 2. Ejecutar
chmod +x start.sh
./start.sh
```

### Opción 2: Manual

**Terminal 1 - Frontend:**
```bash
cd apps/web
npm install
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd apps/api
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Opción 3: Docker (Más Profesional)

```bash
cd docker
docker-compose up -d
```

---

## 🔑 Archivos Importantes de Configuración

### Frontend (.env en apps/web/)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Backend (.env en apps/api/ o raíz)
```env
# REQUERIDO
ANTHROPIC_API_KEY=tu_clave_aqui
JWT_SECRET=genera_con_openssl
ENCRYPTION_KEY=genera_con_openssl

# Base de datos
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/infraforge
REDIS_URL=redis://localhost:6379

# RPCs de Blockchain
ETHEREUM_RPC=https://eth-mainnet.g.alchemy.com/v2/TU_KEY
BSC_RPC=https://bsc-dataseed.binance.org
POLYGON_RPC=https://polygon-mainnet.g.alchemy.com/v2/TU_KEY
```

---

## 📊 Resumen Visual

```
┌─────────────────────────────────────────────────┐
│           INFRA FORGE                           │
│                                                 │
│  ┌──────────────┐         ┌──────────────┐    │
│  │   FRONTEND   │ ←────→  │   BACKEND    │    │
│  │  (apps/web)  │   API   │  (apps/api)  │    │
│  │              │         │              │    │
│  │  Next.js 14  │         │  FastAPI     │    │
│  │  React       │         │  Python      │    │
│  │  TypeScript  │         │  Claude AI   │    │
│  │  Tailwind    │         │  Web3.py     │    │
│  └──────────────┘         └──────────────┘    │
│         │                        │             │
│         └────────┬───────────────┘             │
│                  │                             │
│         ┌────────▼────────┐                    │
│         │   POSTGRESQL    │                    │
│         │     REDIS       │                    │
│         └─────────────────┘                    │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## ❓ Preguntas Frecuentes

### ¿Dónde está el frontend?
**Respuesta:** En `apps/web/` - Es una aplicación Next.js completa

### ¿Dónde está el backend?
**Respuesta:** En `apps/api/` - Es una aplicación FastAPI completa

### ¿Por qué no se llaman "frontend" y "backend"?
**Respuesta:** Es una convención de monorepo. `apps/` contiene aplicaciones completas:
- `web` = aplicación web (frontend)
- `api` = API REST (backend)

### ¿Puedo renombrar las carpetas?
**Respuesta:** Sí, pero tendrías que actualizar:
- `package.json` en la raíz
- `turbo.json`
- Scripts de inicio (`start.bat`, `start.sh`)
- `docker-compose.yml`

### ¿Cómo sé que funciona?
**Respuesta:**
1. Frontend: Abre http://localhost:3000 - Verás la pantalla de carga animada
2. Backend: Abre http://localhost:8000/docs - Verás la documentación de la API

---

## 🎯 Lo Que Hace Esto Especial

✅ **Implementación Completa** - Todo funciona desde el primer momento
✅ **Listo para Producción** - Seguridad, Docker y documentación incluidos
✅ **Stack Moderno** - Next.js 14, FastAPI, Claude Sonnet 4.5
✅ **Diseño Hermoso** - UI futurista con efecto glassmórfico
✅ **Documentación Completa** - 7 archivos cubriendo todo
✅ **Inicio Rápido** - Funcionando en 5 minutos
✅ **Multi-Cadena** - Despliega en 10+ blockchains
✅ **IA Primero** - Integración con Claude para desarrollo inteligente

---

¡Todo está listo para usar! 🔥
