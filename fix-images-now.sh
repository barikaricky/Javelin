#!/bin/bash

echo "🔧 JAVELIN SECURITY - IMAGE ORGANIZER"
echo "======================================"
echo ""

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Create public images directory
echo "📁 Creating /workspaces/Javelin/client/public/images/ directory..."
mkdir -p /workspaces/Javelin/client/public/images

# Copy and rename images from existing locations
echo ""
echo "📋 Organizing your images..."
echo ""

# Copy logo
if [ -f "/workspaces/Javelin/client/src/components/images/javelin-logo.png" ]; then
    cp "/workspaces/Javelin/client/src/components/images/javelin-logo.png" "/workspaces/Javelin/client/public/images/javelin-logo.png"
    echo "  ✓ Logo copied"
fi

# Map existing images to new names
cp "/workspaces/Javelin/client/src/components/images/site1.jpg" "/workspaces/Javelin/client/public/images/javelin-logo-1.jpg" 2>/dev/null && echo "  ✓ javelin-logo-1.jpg"
cp "/workspaces/Javelin/client/src/components/images/md_image.jpg" "/workspaces/Javelin/client/public/images/javelin-logo-2.jpg" 2>/dev/null && echo "  ✓ javelin-logo-2.jpg"
cp "/workspaces/Javelin/client/src/components/images/site2.jpg" "/workspaces/Javelin/client/public/images/javelin-site-2.jpg" 2>/dev/null && echo "  ✓ javelin-site-2.jpg"
cp "/workspaces/Javelin/client/src/components/images/site3.jpg" "/workspaces/Javelin/client/public/images/javelin-site-3.jpg" 2>/dev/null && echo "  ✓ javelin-site-3.jpg"
cp "/workspaces/Javelin/client/src/components/images/admin image.pg.jpg" "/workspaces/Javelin/client/public/images/javelin-guard-4.jpg" 2>/dev/null && echo "  ✓ javelin-guard-4.jpg"

# Use guard images if they exist
if [ -f "/workspaces/Javelin/client/public/assets/images/images/guard1.jpg" ]; then
    cp "/workspaces/Javelin/client/public/assets/images/images/guard1.jpg" "/workspaces/Javelin/client/public/images/javelin-site-5.jpg" 2>/dev/null && echo "  ✓ javelin-site-5.jpg"
else
    cp "/workspaces/Javelin/client/src/components/images/site1.jpg" "/workspaces/Javelin/client/public/images/javelin-site-5.jpg" 2>/dev/null && echo "  ✓ javelin-site-5.jpg (duplicate)"
fi

# Set permissions
chmod 644 /workspaces/Javelin/client/public/images/*

echo ""
echo "✅ Verification:"
ls -lh /workspaces/Javelin/client/public/images/

echo ""
echo -e "${GREEN}🎉 Images organized successfully!${NC}"
echo ""
echo "Your images are now at:"
for img in /workspaces/Javelin/client/public/images/*.{jpg,png}; do
    if [ -f "$img" ]; then
        echo "  → $(basename "$img")"
    fi
done

echo ""
echo "Next step: Start the app"
echo "  cd /workspaces/Javelin/client && npm start"
echo ""
