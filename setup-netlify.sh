#!/bin/bash
# Quick Netlify Deployment Setup Script

echo "============================================"
echo "Javelin Associates - Netlify Setup"
echo "============================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Install serverless-http in server
echo "📦 Installing serverless-http..."
cd server
npm install serverless-http
if [ $? -eq 0 ]; then
    echo "✅ serverless-http installed"
else
    echo "❌ Failed to install serverless-http"
    exit 1
fi

cd ..
echo ""

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
if [ $? -eq 0 ]; then
    echo "✅ Client dependencies installed"
else
    echo "❌ Failed to install client dependencies"
    exit 1
fi

cd ..
echo ""

echo "============================================"
echo "✅ Setup Complete!"
echo "============================================"
echo ""
echo "Next steps:"
echo "1. Review NETLIFY-DEPLOYMENT.md"
echo "2. Configure .env files (server/.env)"
echo "3. Push to GitHub"
echo "4. Connect to Netlify at https://app.netlify.com"
echo ""
echo "To test locally:"
echo "  Terminal 1: cd server && npm start"
echo "  Terminal 2: cd client && npm start"
echo ""
