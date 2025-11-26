#!/bin/bash

echo "📸 MANUAL IMAGE COPY HELPER"
echo "==========================="
echo ""

# Create directory
mkdir -p /workspaces/Javelin/client/public/images

echo "Current directory: $(pwd)"
echo ""
echo "Available image files in current directory:"
ls -1 *.{jpg,jpeg,png,JPG,JPEG,PNG} 2>/dev/null || echo "No images found in current directory"
echo ""

echo "Instructions:"
echo "============="
echo ""
echo "Copy your images using these commands:"
echo ""
echo "# If images are in current directory:"
echo "cp javelin-logo-1.jpg /workspaces/Javelin/client/public/images/"
echo "cp javelin-logo-2.jpg /workspaces/Javelin/client/public/images/"
echo "cp javelin-site-2.jpg /workspaces/Javelin/client/public/images/"
echo "cp javelin-site-3.jpg /workspaces/Javelin/client/public/images/"
echo "cp javelin-site-5.jpg /workspaces/Javelin/client/public/images/"
echo "cp javelin-guard-4.jpg /workspaces/Javelin/client/public/images/"
echo ""
echo "# Or if you need to rename while copying:"
echo "cp your-image-1.jpg /workspaces/Javelin/client/public/images/javelin-logo-1.jpg"
echo "cp your-image-2.jpg /workspaces/Javelin/client/public/images/javelin-logo-2.jpg"
echo "cp your-image-3.jpg /workspaces/Javelin/client/public/images/javelin-site-2.jpg"
echo "cp your-image-4.jpg /workspaces/Javelin/client/public/images/javelin-site-3.jpg"
echo "cp your-image-5.jpg /workspaces/Javelin/client/public/images/javelin-site-5.jpg"
echo "cp your-image-6.jpg /workspaces/Javelin/client/public/images/javelin-guard-4.jpg"
echo ""
