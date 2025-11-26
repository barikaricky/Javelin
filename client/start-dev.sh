#!/bin/bash

echo "🚀 Starting Javelin Security Development Environment"
echo "===================================================="
echo ""

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "📦 MongoDB not found. Installing..."
    sudo apt-get update
    sudo apt-get install -y mongodb
fi

# Start MongoDB
echo "🔧 Starting MongoDB..."
sudo service mongodb start
sleep 2

# Check MongoDB status
if sudo service mongodb status | grep -q "running"; then
    echo "✅ MongoDB is running"
else
    echo "❌ MongoDB failed to start"
    exit 1
fi

# Install server dependencies if needed
if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing server dependencies..."
    cd server && npm install && cd ..
fi

# Install client dependencies if needed
if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing client dependencies..."
    cd client && npm install && cd ..
fi

# Create .env file if it doesn't exist
if [ ! -f "server/.env" ]; then
    echo "📝 Creating server/.env file..."
    cp server/.env.example server/.env 2>/dev/null || cat > server/.env << EOF
MONGODB_URI=mongodb://localhost:27017/javelin-security
PORT=5000
NODE_ENV=development
JWT_SECRET=javelin-secret-key-change-in-production
CORS_ORIGIN=http://localhost:3000
EOF
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🌐 Starting servers..."
echo "   - Backend: http://localhost:5000"
echo "   - Frontend: http://localhost:3000"
echo ""

# Start both servers
cd server && npm start &
SERVER_PID=$!

cd ../client && npm start &
CLIENT_PID=$!

echo ""
echo "🎯 Servers are starting..."
echo "   Backend PID: $SERVER_PID"
echo "   Frontend PID: $CLIENT_PID"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for both processes
wait
