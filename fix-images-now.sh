#!/bin/bash

echo "🔧 JAVELIN SECURITY - IMAGE ORGANIZER"
echo "======================================"
echo ""

# Create public images directory
echo "📁 Creating image directory..."
mkdir -p /workspaces/Javelin/client/public/images

# Copy images from the locations where they exist
echo ""
echo "📋 Copying your images..."
echo ""

# Source locations with your actual images
SRC_DIR="/workspaces/Javelin/client/src/components/images"
ASSETS_DIR="/workspaces/Javelin/client/src/assets/images"
PUBLIC_ASSETS="/workspaces/Javelin/client/public/assets/images/images"

# Target directory
DEST_DIR="/workspaces/Javelin/client/public/images"

# Copy logo
cp "$SRC_DIR/javelin-logo.png" "$DEST_DIR/javelin-logo.png" 2>/dev/null && echo "  ✓ javelin-logo.png"
cp "$ASSETS_DIR/javelin-logo.png" "$DEST_DIR/javelin-logo.png" 2>/dev/null

# Copy site images
cp "$SRC_DIR/site1.jpg" "$DEST_DIR/javelin-logo-1.jpg" 2>/dev/null && echo "  ✓ javelin-logo-1.jpg (from site1.jpg)"
cp "$SRC_DIR/site2.jpg" "$DEST_DIR/javelin-site-2.jpg" 2>/dev/null && echo "  ✓ javelin-site-2.jpg (from site2.jpg)"
cp "$SRC_DIR/site3.jpg" "$DEST_DIR/javelin-site-3.jpg" 2>/dev/null && echo "  ✓ javelin-site-3.jpg (from site3.jpg)"
cp "$SRC_DIR/md_image.jpg" "$DEST_DIR/javelin-logo-2.jpg" 2>/dev/null && echo "  ✓ javelin-logo-2.jpg (from md_image.jpg)"
cp "$SRC_DIR/admin image.pg.jpg" "$DEST_DIR/javelin-guard-4.jpg" 2>/dev/null && echo "  ✓ javelin-guard-4.jpg (from admin image.pg.jpg)"

# Copy guard images from public assets
cp "$PUBLIC_ASSETS/guard1.jpg" "$DEST_DIR/javelin-site-5.jpg" 2>/dev/null && echo "  ✓ javelin-site-5.jpg (from guard1.jpg)"

# If guard1 doesn't exist, use site1 as backup
if [ ! -f "$DEST_DIR/javelin-site-5.jpg" ]; then
    cp "$SRC_DIR/site1.jpg" "$DEST_DIR/javelin-site-5.jpg" 2>/dev/null && echo "  ✓ javelin-site-5.jpg (backup from site1.jpg)"
fi

# Also copy original named files for backwards compatibility
cp "$SRC_DIR/site1.jpg" "$DEST_DIR/site1.jpg" 2>/dev/null
cp "$SRC_DIR/site2.jpg" "$DEST_DIR/site2.jpg" 2>/dev/null
cp "$SRC_DIR/site3.jpg" "$DEST_DIR/site3.jpg" 2>/dev/null
cp "$SRC_DIR/md_image.jpg" "$DEST_DIR/md_image.jpg" 2>/dev/null
cp "$SRC_DIR/admin image.pg.jpg" "$DEST_DIR/admin-image.jpg" 2>/dev/null

# Copy guard images if they exist
cp "$PUBLIC_ASSETS/guard1.jpg" "$DEST_DIR/guard1.jpg" 2>/dev/null
cp "$PUBLIC_ASSETS/guard2.jpg" "$DEST_DIR/guard2.jpg" 2>/dev/null
cp "$PUBLIC_ASSETS/guard3..jpg" "$DEST_DIR/guard3.jpg" 2>/dev/null
cp "$PUBLIC_ASSETS/guard4.jpg" "$DEST_DIR/guard4.jpg" 2>/dev/null
cp "$PUBLIC_ASSETS/guard5.jpg" "$DEST_DIR/guard5.jpg" 2>/dev/null

# Set permissions
chmod 644 "$DEST_DIR"/* 2>/dev/null

echo ""
echo "✅ Verification - Images in public/images:"
ls -lh "$DEST_DIR"

echo ""
echo "🎉 Done! Images are ready."
echo ""
