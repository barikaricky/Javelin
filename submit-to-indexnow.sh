#!/bin/bash
# IndexNow URL Submission Script for Javelin Associates
# This submits all important pages to Bing and other search engines

echo "🚀 Submitting URLs to IndexNow API..."

curl -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "host": "www.javelinassociates.org",
    "key": "ac711c45e07c44379323aa6269e736f5",
    "keyLocation": "https://www.javelinassociates.org/ac711c45e07c44379323aa6269e736f5.txt",
    "urlList": [
      "https://www.javelinassociates.org/",
      "https://www.javelinassociates.org/#/about",
      "https://www.javelinassociates.org/#/services",
      "https://www.javelinassociates.org/#/contact",
      "https://www.javelinassociates.org/#/gallery",
      "https://www.javelinassociates.org/#/news",
      "https://www.javelinassociates.org/#/sites",
      "https://www.javelinassociates.org/#/team",
      "https://www.javelinassociates.org/#/recruitment"
    ]
  }'

echo ""
echo "✅ Submission complete! Check Bing Webmaster Tools to verify."
