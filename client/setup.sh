#!/bin/bash
echo "🚀 Setting up Javelin Associates Project..."

# Server setup
cd /workspaces/Javelin/server
if [ ! -f "package.json" ]; then
    echo "📦 Installing server dependencies..."
    npm init -y
    npm install express mongoose dotenv cors helmet express-validator multer cloudinary nodemailer express-rate-limit bcryptjs jsonwebtoken
    npm install -D nodemon
fi

# Client setup
cd /workspaces/Javelin/client
if [ ! -d "node_modules" ]; then
    echo "📦 Installing client dependencies..."
    npm install
fi

echo "✅ Setup complete!"
echo "To start the application:"
echo "  Terminal 1: cd /workspaces/Javelin/server && npm run dev"
echo "  Terminal 2: cd /workspaces/Javelin/client && npm start"
