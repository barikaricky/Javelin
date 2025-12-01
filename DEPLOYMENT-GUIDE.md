# 🚀 Javelin Security - Deployment Guide

## Domain: https://www.javelinassociates.org

---

## Quick Deploy to Netlify (Recommended)

### Step 1: Build the Project
```bash
cd /workspaces/Javelin
chmod +x deploy.sh
./deploy.sh
```

### Step 2: Deploy to Netlify

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Sign up/Login with GitHub
3. Click "Add new site" > "Deploy manually"
4. Drag and drop the `/workspaces/Javelin/client/build` folder
5. Your site will be live at a random netlify.app URL

### Step 3: Connect Your Domain

1. In Netlify dashboard, go to **Site Settings**
2. Click **Domain Management** > **Add custom domain**
3. Enter: `javelinassociates.org`
4. Follow the DNS configuration instructions

### Step 4: DNS Configuration

Add these records at your domain registrar:

| Type  | Name | Value                          |
|-------|------|--------------------------------|
| A     | @    | 75.2.60.5                      |
| CNAME | www  | [your-site].netlify.app        |

---

## Alternative: Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Build and deploy
cd /workspaces/Javelin/client
npm run build
cd build
vercel --prod

# Follow prompts to connect domain
```

---

## SEO Checklist ✅

After deployment, complete these steps:

### 1. Google Search Console
- Go to [Google Search Console](https://search.google.com/search-console)
- Add property: `https://www.javelinassociates.org`
- Verify ownership (DNS or HTML file)
- Submit sitemap: `https://www.javelinassociates.org/sitemap.xml`

### 2. Google My Business
- Go to [Google Business Profile](https://business.google.com)
- Create listing for "Javelin Associates Security Services"
- Add address, phone, photos, services
- Get reviews from clients

### 3. Bing Webmaster Tools
- Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
- Add your site
- Submit sitemap

### 4. Social Media Profiles
Create consistent profiles on:
- Facebook Business Page
- LinkedIn Company Page
- Instagram Business
- Twitter/X

---

## Performance Optimization

After deployment, test with:
- [Google PageSpeed Insights](https://pagespeed.web.dev)
- [GTmetrix](https://gtmetrix.com)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

---

## SSL Certificate

Netlify and Vercel provide free SSL automatically.
Your site will be accessible via HTTPS.

---

## Monitoring

Set up free uptime monitoring:
- [UptimeRobot](https://uptimerobot.com) - Free
- [Better Uptime](https://betteruptime.com) - Free tier

---

## Support

For deployment issues, check:
- Netlify Docs: https://docs.netlify.com
- Vercel Docs: https://vercel.com/docs
