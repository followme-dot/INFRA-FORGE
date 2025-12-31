# 🚀 INICIO RÁPIDO - INFRA FORGE

## ✅ Estado Actual

- ✅ Proyecto creado
- ✅ Archivos de configuración listos
- ✅ Estructura completa
- ⏳ Instalando dependencias...

## 📝 IMPORTANTE: Configurar Claude API Key

**⚠️ ANTES DE INICIAR**, necesitas una API Key de Anthropic:

1. Ve a: https://console.anthropic.com/
2. Crea una cuenta o inicia sesión
3. Ve a "API Keys"
4. Crea una nueva key
5. Edita el archivo `.env` en la raíz del proyecto
6. Reemplaza esta línea:
   ```
   ANTHROPIC_API_KEY=sk-ant-api03-development-key-placeholder
   ```
   Con tu key real:
   ```
   ANTHROPIC_API_KEY=sk-ant-api03-tu-key-real-aqui
   ```

## 🚀 Cómo Iniciar

### Opción 1: Inicio Manual (Más Control)

**Terminal 1 - FRONTEND:**
```bash
cd apps/web
npm run dev
```
Espera a que aparezca: "Ready in X.Xs"
Luego abre: http://localhost:3000

**Terminal 2 - BACKEND:**
```bash
cd apps/api
venv\Scripts\activate
uvicorn app.main:app --reload
```
Espera a que aparezca: "Application startup complete"
API disponible en: http://localhost:8000

### Opción 2: Script Automático

**Windows:**
```bash
start.bat
```

Esto abrirá 2 ventanas automáticamente:
- Una para el frontend (puerto 3000)
- Una para el backend (puerto 8000)

## 🌐 URLs de Acceso

Una vez iniciado:

- **Aplicación Web**: http://localhost:3000
- **API Backend**: http://localhost:8000
- **Documentación API**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

## 🎯 Primera Prueba

1. Abre http://localhost:3000
2. Verás una pantalla de carga espectacular (4 segundos)
3. Se redirigirá automáticamente al Chat
4. ¡Empieza a crear contratos inteligentes!

## ⚠️ Solución de Problemas Rápidos

### "Port 3000 already in use"
```bash
# Encuentra y mata el proceso
netstat -ano | findstr :3000
taskkill /PID <numero_pid> /F
```

### "Port 8000 already in use"
```bash
# Encuentra y mata el proceso
netstat -ano | findstr :8000
taskkill /PID <numero_pid> /F
```

### "Module not found" en Frontend
```bash
cd apps/web
rm -rf node_modules
npm install
```

### "No module named 'fastapi'" en Backend
```bash
cd apps/api
venv\Scripts\activate
pip install -r requirements.txt
```

## 📊 Verificar que Todo Funciona

### Verificar Frontend:
```bash
cd apps/web
npm run dev
```
Deberías ver:
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
✓ Ready in X.Xs
```

### Verificar Backend:
```bash
cd apps/api
venv\Scripts\activate
uvicorn app.main:app --reload
```
Deberías ver:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

## 🎉 ¡Listo!

Una vez que ambos servicios estén corriendo:

1. **Frontend**: http://localhost:3000
   - Pantalla de carga animada
   - Dashboard con navegación
   - Chat de IA
   - Editor de contratos

2. **Backend**: http://localhost:8000/docs
   - Documentación interactiva
   - Prueba de endpoints
   - Swagger UI

## 📞 ¿Necesitas Ayuda?

- **Configuración**: Lee SETUP.md
- **Problemas**: Lee TROUBLESHOOTING.md
- **Estructura**: Lee ESTRUCTURA_SIMPLE.md

---

**🔥 Built by INFRA Dev·Tech for INFRA Group & Nardiha Holdings**
