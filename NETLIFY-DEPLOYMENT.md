# Netlify Deployment Guide - Javelin Associates

## Overview
Your Javelin Associates application is now configured to run entirely on Netlify with:
- **Frontend**: React app deployed to https://javelinassociates.org/
- **Backend**: Express API converted to Netlify Functions at https://javelinassociates.org/api/

## What Changed

### 1. **Netlify Functions Setup**
- Created `netlify/functions/api.js` - This wraps your Express app as a serverless function
- All `/api/*` requests are automatically routed to this function via `netlify.toml`

### 2. **Configuration Files**
- **netlify.toml**: Build and deployment configuration
  - Builds React frontend from `client/build`
  - Deploys serverless functions from `netlify/functions`
  - Redirects all `/api/*` calls to the serverless function
  - SPA routing for frontend (all 404s go to index.html)

### 3. **Frontend Updates**
- **api.js**: Now uses relative `/api` paths in production
- **.env.production**: Sets `REACT_APP_API_URL=/api` for production
- **imageHelper.js**: Updated to handle Netlify image URLs
- **ContactForm.jsx** & **Recruitment.jsx**: Updated to use dynamic API URLs

### 4. **Backend Package**
- Added `serverless-http` dependency to convert Express to serverless

## Deployment Steps

### Prerequisites
1. Netlify account (https://netlify.com)
2. GitHub account with your project repo
3. MongoDB Atlas account (already configured)

### Step 1: Prepare Your Code

```bash
# Install dependencies
cd server
npm install serverless-http

cd ../client
npm install
```

### Step 2: Create/Update .env Files

**server/.env** (for Netlify):
```
MONGODB_URI=mongodb+srv://barika:Living57754040@cluster0.lunr4v6.mongodb.net/
PORT=5000
NODE_ENV=production
JWT_SECRET=07e382096077b3b15337616e3410a529
CORS_ORIGIN=https://javelinassociates.org
CLIENT_URL=https://javelinassociates.org
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@javelinassociates.com
ADMIN_EMAIL=hr@javelinassociates.com
```

### Step 3: Push to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Setup for Netlify deployment"

# Add remote (replace with your repo)
git remote add origin https://github.com/yourusername/javelin.git

# Push to main branch
git push -u origin main
```

### Step 4: Connect to Netlify

**Option A: Using Netlify UI**
1. Go to https://app.netlify.com
2. Click "New site from Git"
3. Connect your GitHub account
4. Select your repository
5. Configure build settings:
   - **Build command**: `cd client && npm install && npm run build`
   - **Publish directory**: `client/build`
   - **Functions directory**: `netlify/functions`
6. Add environment variables (Settings > Build & Deploy > Environment):
   - All variables from your `.env` file
7. Click "Deploy site"

**Option B: Using Netlify CLI**
```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize site
netlify init

# Deploy
netlify deploy --prod
```

### Step 5: Configure Domain

In Netlify Dashboard:
1. Go to your site settings
2. Domain settings
3. Update your domain DNS records to point to Netlify
4. Enable HTTPS (automatic with Let's Encrypt)

## Verifying Deployment

### 1. Check Frontend
```bash
curl https://javelinassociates.org/
# Should return your React app HTML
```

### 2. Check API Health
```bash
curl https://javelinassociates.org/api/health
# Should return: { "status": "ok", "message": "Server is running on Netlify" }
```

### 3. Test a Full API Endpoint
```bash
curl https://javelinassociates.org/api/team
# Should return team members list
```

### 4. Check Browser Console
- Visit https://javelinassociates.org
- Open DevTools (F12)
- Check Console tab for any API errors
- Check Network tab to verify `/api/` requests are working

## Environment Variables Reference

| Variable | Production Value | Local Dev | Notes |
|----------|------------------|-----------|-------|
| REACT_APP_API_URL | `/api` | `http://localhost:5000/api` | Frontend API base URL |
| NODE_ENV | `production` | `development` | Node environment |
| MONGODB_URI | `mongodb+srv://...` | `mongodb+srv://...` | MongoDB connection |
| JWT_SECRET | Your secret | Your secret | JWT signing key |
| CLOUDINARY_* | Your credentials | Your credentials | Image storage |
| EMAIL_* | Your email config | Your email config | Email sending |
| CLIENT_URL | `https://javelinassociates.org` | `http://localhost:3000` | Frontend URL for CORS |

## Testing Locally Before Deployment

```bash
# Terminal 1: Start backend
cd server
npm start

# Terminal 2: Start frontend
cd client
npm start

# Frontend will run on http://localhost:3000
# Backend will run on http://localhost:5000
```

## Troubleshooting

### API Requests Failing (404)
- Check that `netlify.toml` has the redirect rule for `/api/*`
- Verify environment variables are set in Netlify dashboard
- Check Netlify function logs in dashboard

### Images Not Loading
- Verify Cloudinary credentials are correct
- Check that upload paths are stored correctly in MongoDB
- Verify `imageHelper.js` is correctly detecting image URLs

### CORS Errors
- Check `CORS_ORIGIN` and `CLIENT_URL` in server `.env`
- Ensure `https://javelinassociates.org` is in allowed origins
- Netlify proxy should handle CORS, but check middleware

### Database Connection Issues
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas (allow 0.0.0.0/0)
- Verify connection string includes database name

### Build Failures
- Check Netlify deploy logs for errors
- Ensure `client/package.json` scripts are correct
- Verify all dependencies are installed locally

## Local Development with Netlify Functions

To test Netlify Functions locally:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# In project root
netlify dev

# Frontend: http://localhost:3000
# API: http://localhost:3000/api (proxied to function)
```

## File Structure After Setup

```
Javelin/
├── netlify/
│   └── functions/
│       └── api.js          (Serverless backend)
├── client/
│   ├── public/
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js      (Updated for /api paths)
│   │   ├── utils/
│   │   │   └── imageHelper.js
│   │   └── ...
│   ├── package.json
│   ├── .env.production     (New)
│   └── build/              (Build output)
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── package.json        (Updated with serverless-http)
└── netlify.toml            (New)
```

## Next Steps

1. ✅ Code is configured
2. → Push to GitHub
3. → Connect to Netlify
4. → Test all endpoints
5. → Monitor Netlify dashboard for logs
6. → Update DNS records if needed
7. → Test from frontend at https://javelinassociates.org

## Support Links

- **Netlify Docs**: https://docs.netlify.com/
- **Netlify Functions**: https://docs.netlify.com/functions/overview/
- **Environment Variables**: https://docs.netlify.com/environment-variables/overview/
- **Serverless HTTP**: https://github.com/dougmoscrop/serverless-http

## Rollback Plan

If something goes wrong:
1. Keep your local setup running (`npm start` in both folders)
2. Revert the commit on GitHub
3. Netlify will auto-rebuild from main branch
4. Or manually trigger deploy in Netlify dashboard

---

**Last Updated**: December 11, 2025
