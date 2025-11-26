#!/bin/bash

# Create public images directory
mkdir -p /workspaces/Javelin/client/public/images

echo "📁 Image directory created at: /workspaces/Javelin/client/public/images"
echo ""
echo "📋 INSTRUCTIONS TO COMPLETE SETUP:"
echo "=================================="
echo ""
echo "1. Copy your 6 images to: /workspaces/Javelin/client/public/images/"
echo ""
echo "2. Rename them to:"
echo "   - javelin-logo-1.jpg"
echo "   - javelin-logo-2.jpg"
echo "   - javelin-site-2.jpg"
echo "   - javelin-site-3.jpg"
echo "   - javelin-site-5.jpg"
echo "   - javelin-guard-4.jpg"
echo ""
echo "3. You can use this command to copy from current location:"
echo "   cp /path/to/your/image1.jpg /workspaces/Javelin/client/public/images/javelin-logo-1.jpg"
echo ""
echo "4. Verify images are in place:"
echo "   ls -la /workspaces/Javelin/client/public/images/"
echo ""
echo "5. Start the server and client"
echo ""

# Make the directory accessible
chmod -R 755 /workspaces/Javelin/client/public/images

echo "✅ Setup complete! Follow the instructions above."
