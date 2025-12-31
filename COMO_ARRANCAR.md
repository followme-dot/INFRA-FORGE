# 🚀 Cómo Arrancar INFRA FORGE

## 📋 Requisitos Previos

- ✅ Python 3.10 o superior
- ✅ Node.js 18 o superior
- ✅ npm (incluido con Node.js)

---

## ⚡ Método Rápido (Recomendado)

### Opción 1: Doble Click en Script BAT
1. Ir a la raíz del proyecto: `D:\Holdingns\INFRA-FORGE`
2. Doble click en **`start-all.bat`**
3. Se abrirán 2 ventanas:
   - Backend (puerto 8000)
   - Frontend (puerto 3008)

### Opción 2: Ejecutar Script PowerShell
```powershell
cd D:\Holdingns\INFRA-FORGE
.\start-all.ps1
```

---

## 🔧 Método Manual (Paso a Paso)

### 🐍 Backend (Python FastAPI)

#### Terminal 1 - PowerShell:
```powershell
# 1. Ir al directorio del backend
cd D:\Holdingns\INFRA-FORGE\apps\api

# 2. Activar entorno virtual
.\venv\Scripts\Activate.ps1

# Deberías ver (venv) al inicio de la línea

# 3. Levantar el servidor
uvicorn app.main:app --reload
```

**Resultado esperado:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

✅ **Backend listo**: http://localhost:8000
✅ **Documentación**: http://localhost:8000/docs

---

### ⚛️ Frontend (Next.js)

#### Terminal 2 - PowerShell (nueva ventana):
```powershell
# 1. Ir al directorio del frontend
cd D:\Holdingns\INFRA-FORGE\apps\web

# 2. Levantar el servidor de desarrollo
npm run dev
```

**Resultado esperado:**
```
▲ Next.js 14.2.0
- Local:        http://localhost:3008
- Ready in 2.3s
```

✅ **Frontend listo**: http://localhost:3008

---

## 🎯 Acceso a la Aplicación

Una vez ambos servicios estén corriendo:

1. **Abrir navegador**: http://localhost:3008
2. **Splash Screen**: Esperar 10 segundos
3. **Login**: Ingresar cualquier email y password
4. **Dashboard**: Acceder a todas las funcionalidades

---

## 🔧 Instalación Inicial (Solo Primera Vez)

Si es la **primera vez** que levantas el proyecto:

### Backend:
```powershell
cd D:\Holdingns\INFRA-FORGE\apps\api

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
.\venv\Scripts\Activate.ps1

# Instalar dependencias
pip install -r requirements.txt
```

### Frontend:
```powershell
cd D:\Holdingns\INFRA-FORGE\apps\web

# Instalar dependencias
npm install
```

**Después de esto, usa el Método Rápido o Manual**

---

## ❌ Solución de Problemas

### Problema 1: "uvicorn no se reconoce"
```powershell
# Asegúrate de activar el entorno virtual primero
cd D:\Holdingns\INFRA-FORGE\apps\api
.\venv\Scripts\Activate.ps1

# Si no existe el venv:
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

---

### Problema 2: "Cannot execute script" (PowerShell)
```powershell
# Opción 1: Cambiar política temporalmente
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\venv\Scripts\Activate.ps1

# Opción 2: Usar CMD en su lugar
cmd
venv\Scripts\activate.bat
uvicorn app.main:app --reload
```

---

### Problema 3: Puerto ocupado
```powershell
# Ver qué usa el puerto 8000
netstat -ano | findstr :8000

# Ver qué usa el puerto 3008
netstat -ano | findstr :3008

# Matar proceso (reemplaza 12345 con el PID)
taskkill /PID 12345 /F
```

---

### Problema 4: Error "Module not found"
```powershell
# Backend - reinstalar dependencias
cd apps\api
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt --force-reinstall

# Frontend - reinstalar dependencias
cd apps\web
rm -rf node_modules package-lock.json
npm install
```

---

## 📍 Puertos Utilizados

| Servicio | Puerto | URL |
|----------|--------|-----|
| Backend API | 8000 | http://localhost:8000 |
| Frontend Web | 3008 | http://localhost:3008 |
| API Docs (Swagger) | 8000 | http://localhost:8000/docs |
| API Redoc | 8000 | http://localhost:8000/redoc |

---

## 🛑 Detener los Servicios

### Método 1: En cada terminal
Presiona **`Ctrl + C`** en cada ventana de terminal

### Método 2: Cerrar ventanas
Simplemente cierra las ventanas de PowerShell/CMD

---

## 📂 Estructura de Comandos

```
D:\Holdingns\INFRA-FORGE/
├── start-all.bat         # Script Windows (doble click)
├── start-all.ps1         # Script PowerShell
├── apps/
│   ├── api/              # Backend FastAPI
│   │   ├── venv/         # Entorno virtual Python
│   │   └── app/          # Código fuente
│   └── web/              # Frontend Next.js
│       ├── node_modules/ # Dependencias Node
│       └── app/          # Código fuente
```

---

## ✅ Checklist de Arranque

**Antes de arrancar, verifica:**
- [ ] Python 3.10+ instalado: `python --version`
- [ ] Node.js 18+ instalado: `node --version`
- [ ] npm instalado: `npm --version`
- [ ] Entorno virtual creado en `apps/api/venv/`
- [ ] Dependencias Python instaladas
- [ ] Dependencias Node instaladas en `apps/web/node_modules/`

**Para arrancar:**
- [ ] Terminal 1: Backend corriendo en puerto 8000
- [ ] Terminal 2: Frontend corriendo en puerto 3008
- [ ] Navegador abierto en http://localhost:3008
- [ ] Splash screen visible (10 segundos)
- [ ] Página de login accesible

---

## 🎓 Comandos Útiles

### Backend:
```powershell
# Ver logs en tiempo real
cd apps\api
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --log-level debug

# Verificar dependencias instaladas
pip list

# Ver rutas registradas
uvicorn app.main:app --reload --log-level info
```

### Frontend:
```powershell
# Build para producción
npm run build

# Ejecutar versión de producción
npm run start

# Limpiar caché
npm run clean

# Verificar errores de lint
npm run lint
```

---

## 📞 Ayuda Adicional

Si sigues teniendo problemas:

1. **Verifica los logs** en las terminales
2. **Revisa el archivo** [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
3. **Consulta la documentación** de la API en http://localhost:8000/docs

---

**¡Listo! INFRA FORGE debería estar corriendo correctamente** 🚀
