#!/bin/bash

echo "🎯 JAVELIN SECURITY - IMAGE ORGANIZER"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Create public images directory
echo "📁 Creating image directory..."
mkdir -p /workspaces/Javelin/client/public/images

# Find all image files in the project
echo ""
echo "🔍 Searching for image files..."
echo ""

# Search for images in common locations
IMAGE_LOCATIONS=(
    "/workspaces/Javelin/client/src/assets/images"
    "/workspaces/Javelin/client/public/images"
    "/workspaces/Javelin/client/src/components/image"
    "/workspaces/Javelin"
)

# Array to store found images
declare -a FOUND_IMAGES=()

for location in "${IMAGE_LOCATIONS[@]}"; do
    if [ -d "$location" ]; then
        while IFS= read -r -d '' file; do
            FOUND_IMAGES+=("$file")
            echo "  ✓ Found: $(basename "$file") in $location"
        done < <(find "$location" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" \) -print0 2>/dev/null)
    fi
done

# Also search in root directory
while IFS= read -r -d '' file; do
    FOUND_IMAGES+=("$file")
    echo "  ✓ Found: $(basename "$file") in root"
done < <(find /workspaces/Javelin -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" \) -print0 2>/dev/null)

echo ""
echo "📊 Total images found: ${#FOUND_IMAGES[@]}"
echo ""

if [ ${#FOUND_IMAGES[@]} -eq 0 ]; then
    echo -e "${RED}❌ No images found!${NC}"
    echo ""
    echo "Please upload your images to one of these locations:"
    echo "  - /workspaces/Javelin/"
    echo "  - /workspaces/Javelin/client/src/assets/images/"
    echo ""
    echo "Then run this script again."
    exit 1
fi

# Display found images and let user map them
echo "🏷️  Image Mapping Required"
echo "=========================="
echo ""
echo "Found images:"
for i in "${!FOUND_IMAGES[@]}"; do
    echo "  $((i+1)). $(basename "${FOUND_IMAGES[$i]}")"
done
echo ""

# Target filenames
TARGET_NAMES=(
    "javelin-logo-1.jpg"
    "javelin-logo-2.jpg"
    "javelin-site-2.jpg"
    "javelin-site-3.jpg"
    "javelin-site-5.jpg"
    "javelin-guard-4.jpg"
)

echo "Target filenames needed:"
for i in "${!TARGET_NAMES[@]}"; do
    echo "  $((i+1)). ${TARGET_NAMES[$i]}"
done
echo ""

# Auto-map if exact count matches
if [ ${#FOUND_IMAGES[@]} -eq 6 ]; then
    echo -e "${YELLOW}🤖 Auto-mapping 6 images...${NC}"
    echo ""
    
    for i in "${!FOUND_IMAGES[@]}"; do
        src="${FOUND_IMAGES[$i]}"
        dest="/workspaces/Javelin/client/public/images/${TARGET_NAMES[$i]}"
        
        echo "  Copying: $(basename "$src") → ${TARGET_NAMES[$i]}"
        cp "$src" "$dest"
        
        if [ $? -eq 0 ]; then
            echo -e "  ${GREEN}✓ Success${NC}"
        else
            echo -e "  ${RED}✗ Failed${NC}"
        fi
    done
else
    echo -e "${YELLOW}⚠️  Found ${#FOUND_IMAGES[@]} images, but need exactly 6${NC}"
    echo ""
    echo "Copying all found images with numbered names..."
    echo ""
    
    for i in "${!FOUND_IMAGES[@]}"; do
        src="${FOUND_IMAGES[$i]}"
        ext="${src##*.}"
        dest="/workspaces/Javelin/client/public/images/image-$((i+1)).$ext"
        
        echo "  Copying: $(basename "$src") → image-$((i+1)).$ext"
        cp "$src" "$dest"
    done
    
    echo ""
    echo "📝 Manual mapping required!"
    echo "Please rename the images in /workspaces/Javelin/client/public/images/"
    echo "to match the target names shown above."
fi

# Set permissions
chmod -R 755 /workspaces/Javelin/client/public/images

echo ""
echo "📋 Verifying images..."
ls -lh /workspaces/Javelin/client/public/images/

echo ""
echo -e "${GREEN}✅ Image organization complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. Verify images: ls /workspaces/Javelin/client/public/images/"
echo "  2. Start development: ./start-dev.sh"
echo ""
