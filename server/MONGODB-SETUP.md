# MongoDB Atlas Connection Troubleshooting

## Current Status
Your MongoDB connection string is configured correctly, but the connection is timing out.

## ⚠️ Most Likely Issue: IP Whitelist

MongoDB Atlas blocks all connections by default for security. You need to whitelist your IP address.

## 🔧 Solution Steps

### 1. Whitelist Your IP Address

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Sign in to your account
3. Select your project (if you have multiple)
4. Click **"Network Access"** in the left sidebar (under Security section)
5. Click the **"Add IP Address"** button
6. Choose one of these options:
   - **Recommended for development**: Click **"Allow Access from Anywhere"** 
     - This adds `0.0.0.0/0` and allows connections from any IP
   - **More secure**: Click **"Add Current IP Address"** to only allow your current IP
7. Click **"Confirm"**
8. **Wait 2-3 minutes** for the changes to take effect

### 2. Verify Database User

1. In MongoDB Atlas, click **"Database Access"** (under Security)
2. Verify these settings for user **"barika"**:
   - User exists and is active
   - Password is: `Living57754040`
   - Authentication Method: `SCRAM`
   - Database User Privileges: `Atlas admin` or `Read and write to any database`
3. If password is wrong, click "Edit" and update it

### 3. Check Cluster Status

1. Click **"Database"** in the left sidebar
2. Verify your cluster **"Cluster0"** is:
   - ✅ Active (not paused)
   - ✅ Running (green status)
3. If paused, click "Resume"

## 🧪 Test the Connection

After completing the steps above:

```bash
# Go to server directory
cd "c:\Users\BOGI PHARMACARE\Documents\Javelin\server"

# Run the connection test
node quick-test.js
```

### Expected Success Output:
```
✓ SUCCESS! MongoDB Atlas Connected
  Host: cluster0.lunr4v6.mongodb.net
  Database: javelin-security
```

### If Still Failing:

1. **Authentication Error**: Reset the password in Database Access
2. **Timeout Error**: IP not whitelisted yet (wait 2-3 more minutes)
3. **Firewall Issue**: Check Windows Firewall isn't blocking Node.js

## 🚀 Start the Server

Once the test succeeds:

```bash
# Start the backend server
npm run dev
```

The server should display:
```
✓ MongoDB Connected Successfully!
  Host: cluster0-shard-00-01.lunr4v6.mongodb.net
  Database: javelin-security
Server running on port 5000
```

## 📝 Your Current Configuration

- **Connection URI**: `mongodb+srv://barika:****@cluster0.lunr4v6.mongodb.net/javelin-security`
- **Database**: `javelin-security`
- **User**: `barika`
- **Cluster**: `cluster0.lunr4v6.mongodb.net`

## ❓ Still Having Issues?

1. Check MongoDB Atlas status: https://status.cloud.mongodb.com/
2. Verify your internet connection
3. Try using MongoDB Compass to connect with the same URI
4. Contact MongoDB support if cluster is inaccessible
