# CORS Fix Instructions

We have updated the backend configuration to explicitly allow requests from your frontend domain (`https://www.javelinassociates.org`).

## What was fixed?
1. Updated `server/netlify/functions/api.js` to use a static list of allowed origins instead of a dynamic function. This is more reliable for serverless environments.
2. Added `optionsSuccessStatus: 200` to support legacy browsers and proxies.
3. Explicitly handled `OPTIONS` preflight requests.
4. Updated `server/server.js` to match the production configuration.

## How to apply the fix?

1. Run the deployment script:
   ```
   deploy-backend-fix.bat
   ```

   This runs `netlify deploy --prod --dir server/public --functions server/netlify/functions` so the function bundle is definitely published.

2. Wait 1-2 minutes for the deployment to propagate.

3. Clear your browser cache or try in an Incognito window.

4. Verify the CORS header is present by running (optional):
   ```bash
   curl -I https://javelinassocaite.netlify.app/api/health
   ```
   Ensure the response includes `Access-Control-Allow-Origin: https://www.javelinassociates.org`.
5. Attempt to login or register on `https://www.javelinassociates.org/admin`.

## Troubleshooting

If you still see CORS errors:
- Check the Netlify function logs in your Netlify Dashboard.
- Ensure the backend URL in your frontend matches the deployed Netlify URL (`https://javelinassocaite.netlify.app`).
- Confirm that the Netlify deployment completed successfully and you are not looking at an older build. The CLI output should list the Site URL and Functions URL.
