#!/bin/bash

set -eu

# Always run from the project root.
cd "$(dirname "$0")"

echo "========================================"
echo " ElixOR Connect — Local Development"
echo "========================================"

# Check virtual environment.
if [ ! -x ".venv/bin/python" ]; then
    echo "[ERROR] Virtual environment .venv not found."
    echo "Create it with: python3 -m venv .venv"
    exit 1
fi

# Check that local secrets cannot accidentally be committed.
if ! git check-ignore -q .env.local; then
    echo "[ERROR] .env.local is not ignored by Git."
    echo "Add .env.local to .gitignore before continuing."
    exit 1
fi

# Create a persistent local secret on first launch.
if [ ! -f ".env.local" ]; then
    echo "[SETUP] Generating local SECRET_KEY..."

    .venv/bin/python - <<'PY'
import secrets
from pathlib import Path

path = Path(".env.local")
path.write_text(
    f"SECRET_KEY={secrets.token_hex(32)}\n",
    encoding="utf-8",
)
path.chmod(0o600)
PY

    echo "[OK] Local secret created."
fi

# Load local environment variables.
set -a
. ./.env.local
set +a

if [ -z "${SECRET_KEY:-}" ]; then
    echo "[ERROR] SECRET_KEY is empty in .env.local."
    exit 1
fi

# Always use the local development database.
export DATABASE_URL="postgresql+psycopg:///elixor_local"

# Check PostgreSQL availability.
if ! pg_isready -q; then
    echo "[ERROR] PostgreSQL is not accepting connections."
    echo "Start it with: brew services start postgresql@17"
    exit 1
fi

# Check the database without modifying it.
if ! psql -X -d elixor_local -v ON_ERROR_STOP=1 \
    -c "SELECT 1;" >/dev/null 2>&1; then
    echo "[ERROR] Cannot connect to local database elixor_local."
    exit 1
fi

echo "[OK] PostgreSQL is available."
echo "[OK] Database: elixor_local"
echo "[OK] Starting Flask..."
echo
echo "Application: http://127.0.0.1:5000"
echo "Health:      http://127.0.0.1:5000/health"
echo
echo "Stop the server with Ctrl+C."
echo "========================================"

exec .venv/bin/python -m flask \
    --app app \
    --debug \
    run \
    --host 127.0.0.1 \
    --port 5000
