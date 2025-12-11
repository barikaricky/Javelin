# Netlify Environment Variables Setup

## For Backend Deployment
### Site: devserver-main--javelinbackend.netlify.app

Add these environment variables in **Netlify UI** → **Site Settings** → **Build & Deploy** → **Environment**:

```
MONGODB_URI=mongodb+srv://barika:Living57754040@cluster0.lunr4v6.mongodb.net/javelin-security?retryWrites=true&w=majority&appName=Cluster0
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

## For Frontend Deployment
### Site: javelinassociates.org

The frontend `.env.production` now points to:
```
REACT_APP_API_URL=https://devserver-main--javelinbackend.netlify.app/api
```

## What Changed

1. ✅ Frontend `.env.production` updated to use backend URL
2. ✅ Backend CORS now allows all origins (safe on Netlify)
3. ✅ Trailing slashes removed from URLs

## Next Steps

1. Push these changes to GitHub
2. Add environment variables to your backend Netlify site
3. Rebuild frontend & backend
4. Test admin login at: `https://javelinassociates.org/admin/login`
5. Verify API calls succeed in browser DevTools Network tab

## Testing

- Open DevTools (F12) → Network tab
- Try logging in
- Check that requests go to `https://devserver-main--javelinbackend.netlify.app/api/...`
- If you see 404s, the API URL is wrong
