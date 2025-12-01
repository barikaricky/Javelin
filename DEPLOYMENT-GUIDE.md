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

## 🇳🇬 Nigeria SEO Checklist (CRITICAL FOR TOP 5 RANKING) ✅

### 1. Google Search Console (DO THIS FIRST!)
- Go to [Google Search Console](https://search.google.com/search-console)
- Add property: `https://www.javelinassociates.org`
- Verify ownership (DNS or HTML file)
- Submit sitemap: `https://www.javelinassociates.org/sitemap.xml`
- Set target country to **Nigeria** in Settings > International Targeting

### 2. Google Business Profile (ESSENTIAL!)
- Go to [Google Business Profile](https://business.google.com)
- Create listing: **"Javelin Associates Security Services"**
- **Categories to select:**
  - Primary: Security Guard Service
  - Secondary: Security Service, Private Investigator, Bodyguard Service
- Add complete information:
  - ✅ Full Lagos/Abuja address
  - ✅ Nigerian phone number (+234...)
  - ✅ Business hours (24/7)
  - ✅ Photos of team, vehicles, equipment
  - ✅ All services listed
  - ✅ Service areas: Lagos, Abuja, Port Harcourt, nationwide
- **Get reviews from existing clients** (aim for 20+ reviews)

### 3. Nigeria Business Directories (High Priority)
Register on these Nigerian directories:

| Directory | URL | Priority |
|-----------|-----|----------|
| Nigeria Yellow Pages | https://www.nigeriayellowpages.com | ⭐⭐⭐ |
| VConnect Nigeria | https://www.vconnect.com | ⭐⭐⭐ |
| BusinessList Nigeria | https://www.businesslist.com.ng | ⭐⭐⭐ |
| Finelib Nigeria | https://www.finelib.com | ⭐⭐ |
| Nigeria Business Directory | https://www.nigeriabusinessdirectory.com | ⭐⭐ |
| Infoisinfo Nigeria | https://www.infoisinfo.com.ng | ⭐⭐ |

### 4. Bing & Yahoo
- Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
- Add your site
- Submit sitemap

### 5. Create Location-Specific Pages
Create separate pages targeting these keywords:
- `/security-company-lagos` - "Security Company in Lagos"
- `/security-services-abuja` - "Security Services Abuja"
- `/security-guards-port-harcourt` - "Security Guards Port Harcourt"
- `/vip-protection-nigeria` - "VIP Protection Nigeria"

### 6. Content Marketing for Nigeria
Create blog posts targeting Nigerian searches:
- "Top 10 Security Tips for Businesses in Lagos"
- "How to Choose a Security Company in Nigeria"
- "VIP Protection Services in Abuja: What to Expect"
- "Event Security Checklist for Nigerian Events"
- "Corporate Security Best Practices in Nigeria"

### 7. Social Media (Nigerian Audience)
Create profiles with consistent NAP (Name, Address, Phone):

| Platform | Action |
|----------|--------|
| Facebook | Create Business Page, join Nigerian business groups |
| LinkedIn | Company page, connect with Nigerian businesses |
| Instagram | Showcase team, security operations |
| Twitter/X | Industry news, security tips |

### 8. Nigerian Backlinks (Important!)
Get listed/mentioned on:
- Nigerian news sites (The Guardian Nigeria, Punch, Vanguard)
- Nigerian business blogs
- Security industry publications
- Chamber of Commerce listings

---

## Target Keywords (Already Optimized)

Your site is now optimized for:
- "security company Nigeria" 
- "security services Lagos"
- "security guards Abuja"
- "VIP protection Nigeria"
- "private security company Nigeria"
- "armed guards Nigeria"
- "corporate security Lagos"
- "event security Nigeria"
- "bodyguards Nigeria"
- "executive protection Lagos"

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

## 📊 Track Your Rankings

Use these free tools to monitor your Nigeria rankings:
- [Google Search Console](https://search.google.com/search-console) - See search queries
- [Ubersuggest](https://neilpatel.com/ubersuggest/) - Track keyword rankings
- [Google Alerts](https://www.google.com/alerts) - Monitor brand mentions

---

## Expected Timeline to Top 5

| Milestone | Timeline |
|-----------|----------|
| Indexed by Google | 1-2 weeks |
| Appearing in search results | 2-4 weeks |
| Top 20 for local keywords | 1-2 months |
| Top 10 for "security company Lagos" | 2-3 months |
| Top 5 for Nigerian security searches | 3-6 months |

**Speed up ranking by:**
- Getting 20+ Google reviews
- Regular blog content
- Backlinks from Nigerian sites
- Active social media

---

## Support

For deployment issues, check:
- Netlify Docs: https://docs.netlify.com
- Vercel Docs: https://vercel.com/docs
