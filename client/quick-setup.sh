#!/bin/bash

echo "⚡ JAVELIN SECURITY - QUICK SETUP"
echo "=================================="
echo ""

# Make scripts executable
chmod +x setup-images.sh
chmod +x start-dev.sh

# Run image setup
./setup-images.sh

echo ""
echo "📋 FINAL STEPS:"
echo "==============="
echo ""
echo "1. Copy your images to /workspaces/Javelin/client/public/images/"
echo ""
echo "2. Rename them as shown above"
echo ""
echo "3. Run: ./start-dev.sh"
echo ""
echo "That's it! 🎉"
