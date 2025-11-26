#!/bin/bash

echo "🚀 JAVELIN SECURITY - COMPLETE SETUP & START"
echo "============================================="
echo ""

# Step 1: Organize images
echo "Step 1: Organizing images..."
chmod +x /workspaces/Javelin/fix-images-now.sh
/workspaces/Javelin/fix-images-now.sh

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Step 2: Setup MongoDB
echo "Step 2: Setting up MongoDB..."

if ! command -v mongod &> /dev/null; then
    echo "📦 Installing MongoDB..."
    sudo apt-get update -qq
    sudo apt-get install -y mongodb -qq
fi

sudo service mongodb start
sleep 2

if sudo service mongodb status | grep -q "running"; then
    echo "✅ MongoDB running"
else
    echo "⚠️  MongoDB not running (optional for now)"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Step 3: Install dependencies
echo "Step 3: Installing dependencies..."

cd /workspaces/Javelin

# Server dependencies
if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing server dependencies..."
    cd server && npm install --silent && cd ..
else
    echo "✓ Server dependencies already installed"
fi

# Client dependencies
if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing client dependencies..."
    cd client && npm install --silent && cd ..
else
    echo "✓ Client dependencies already installed"
fi

# Step 4: Create env file
if [ ! -f "server/.env" ]; then
    echo "📝 Creating server/.env..."
    cat > server/.env << EOF
MONGODB_URI=mongodb://localhost:27017/javelin-security
PORT=5000
NODE_ENV=development
JWT_SECRET=javelin-secret-key-change-in-production
CORS_ORIGIN=http://localhost:3000
EOF
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ Setup Complete!"
echo ""
echo "🌐 Starting servers..."
echo "   Backend:  http://localhost:5000"
echo "   Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop"
echo ""

# Start servers
cd /workspaces/Javelin/server && npm start &
SERVER_PID=$!

cd /workspaces/Javelin/client && npm start &
CLIENT_PID=$!

wait
