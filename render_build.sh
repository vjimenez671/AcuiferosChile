#!/usr/bin/env bash
set -euo pipefail

echo "==> Build started"

########################################
# 1) FRONTEND (Vite)
########################################
if [ -f package.json ]; then
  echo "==> Installing Node deps (npm ci)"
  npm ci

  echo "==> Building frontend (npm run build)"
  npm run build

  echo "Frontend build OK"
else
  echo "No package.json; se omite build de frontend"
fi

########################################
# 2) BACKEND (Python con Pipenv)
########################################
if [ -f Pipfile ]; then
  echo "==> Installing pip & pipenv"
  python -m pip install --upgrade pip pipenv

  echo "==> Installing Python deps via Pipenv (system site-packages)"
  # --system: instala en el entorno del contenedor de Render (sin venv)
  # --deploy: falla si Pipfile.lock no coincide (buena práctica CI)
  pipenv install --deploy --system

  echo "Build OK con Pipenv"
else
  echo "No Pipfile; se omite instalación de dependencias Python"
fi

echo "==> Build finished"

