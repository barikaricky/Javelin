#!/bin/bash

echo "🚀 JAVELIN SECURITY - PRODUCTION DEPLOYMENT"
echo "============================================"
echo ""

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Step 1: Organize images
echo "📁 Step 1: Organizing images..."
chmod +x /workspaces/Javelin/fix-images-now.sh 2>/dev/null
/workspaces/Javelin/fix-images-now.sh

echo ""

# Step 2: Build client
echo "🔨 Step 2: Building production client..."
cd /workspaces/Javelin/client

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build for production
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build successful!${NC}"
else
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi

echo ""
echo "📦 Build output is in: /workspaces/Javelin/client/build"
echo ""

# Step 3: Prepare for deployment
echo "📋 Step 3: Deployment Options"
echo "=============================="
echo ""
echo "Your build is ready at: /workspaces/Javelin/client/build"
echo ""
echo "Choose your deployment method:"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "OPTION 1: NETLIFY (Recommended - Free)"
echo "────────────────────────────────────────"
echo "  1. Go to https://netlify.com"
echo "  2. Sign up/Login"
echo "  3. Drag 'build' folder to deploy"
echo "  4. Go to Site Settings > Domain Management"
echo "  5. Add custom domain: javelinassociates.org"
echo ""
echo "OPTION 2: VERCEL (Free)"
echo "────────────────────────────────────────"
echo "  npm install -g vercel"
echo "  cd build && vercel --prod"
echo ""
echo "OPTION 3: GITHUB PAGES (Free)"
echo "────────────────────────────────────────"
echo "  npm install -g gh-pages"
echo "  Update package.json: \"homepage\": \"https://www.javelinassociates.org\""
echo "  npm run deploy"
echo ""
echo "OPTION 4: TRADITIONAL HOSTING (cPanel/FTP)"
echo "────────────────────────────────────────"
echo "  Upload contents of 'build' folder to public_html"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}🎉 Deployment preparation complete!${NC}"
