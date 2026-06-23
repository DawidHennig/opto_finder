#!/bin/bash

# OptoFinder - Quick Start Script

echo "🔍 OptoFinder - Quick Start"
echo "=============================="
echo ""

# Sprawdzenie Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js nie zainstalowany"
    exit 1
fi

echo "✅ Node.js: $(node --version)"
echo ""

# Sprawdzenie .env.local
if [ ! -f ".env.local" ]; then
    echo "⚠️  Brak pliku .env.local"
    echo "Skopiuj .env.example i dodaj swój Google Maps API Key:"
    echo ""
    echo "   cp .env.example .env.local"
    echo "   # Edytuj .env.local i wstaw API Key"
    echo ""
    exit 1
fi

# Sprawdzenie API Key
if grep -q "YOUR_GOOGLE_MAPS_API_KEY" .env.local; then
    echo "❌ .env.local zawiera placeholder - wstaw rzeczywisty API Key"
    exit 1
fi

echo "✅ .env.local skonfigurowany"
echo ""

# Instalacja zależności
if [ ! -d "node_modules" ]; then
    echo "📦 Instalowanie zależności..."
    npm install
fi

echo ""
echo "🚀 Uruchamianie aplikacji na http://localhost:3000"
echo ""
npm start
