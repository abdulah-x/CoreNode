# 🚀 Quick Deployment Guide

## ✅ What We've Prepared

All deployment files are ready:
- ✅ `vercel.json` - Backend configuration
- ✅ `client/vercel.json` - Frontend configuration  
- ✅ CORS configured for production
- ✅ Environment variables support
- ✅ All changes pushed to GitHub

## 🎯 Deploy Now (Choose ONE method)

### Method 1: Vercel Dashboard (Recommended - 5 minutes)

#### Step 1: Deploy Backend API

1. **Go to**: https://vercel.com/new
2. **Sign in** with GitHub
3. **Import**: `abdulah-x/CoreNode`
4. **Configure:**
   - Name: `corenode-backend`
   - Root Directory: `./` (keep default)
   - Framework: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)

5. **Environment Variables** - Add these:
   ```
   MONGODB_URI = your_mongodb_atlas_connection_string
   PORT = 5000
   NODE_ENV = production
   ```

6. **Click Deploy** ⚡

7. **Copy your backend URL** (e.g., `https://corenode-backend.vercel.app`)

#### Step 2: Deploy Frontend

1. **Click "Add New Project"** again
2. **Import**: `abdulah-x/CoreNode` (same repo)
3. **Configure:**
   - Name: `corenode-frontend`
   - Root Directory: `client`
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Environment Variables** - Add this:
   ```
   VITE_API_URL = https://corenode-backend.vercel.app
   ```
   (Use YOUR backend URL from Step 1)

5. **Click Deploy** ⚡

6. **Visit your app** at the frontend URL! 🎉

#### Step 3: Update CORS (Important!)

After frontend deployment, you need to allow your frontend domain:

1. Note your frontend URL (e.g., `https://corenode-frontend.vercel.app`)
2. In `server.js`, update the allowedOrigins array:
   ```javascript
   const allowedOrigins = [
     'http://localhost:3000',
     'http://localhost:5173',
     'https://corenode-frontend.vercel.app', // ADD THIS
     process.env.FRONTEND_URL,
   ].filter(Boolean);
   ```
3. Commit and push:
   ```bash
   git add server.js
   git commit -m "chore: Add production frontend URL to CORS"
   git push origin main
   ```
4. Vercel will auto-redeploy your backend! ✅

---

### Method 2: Vercel CLI (Terminal)

```bash
# 1. Login to Vercel
vercel login

# 2. Deploy Backend (from project root)
vercel --prod

# 3. Deploy Frontend
cd client
vercel --prod

# 4. Add environment variables via dashboard or CLI
vercel env add MONGODB_URI production
vercel env add VITE_API_URL production
```

---

## 🔍 Your MongoDB Atlas Setup

Make sure MongoDB Atlas allows connections:

1. Go to MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Click "Allow Access From Anywhere"
4. Click "Confirm"

Your connection string format:
```
mongodb+srv://abdullahasad2001_db_user:N7E1vhUn1nXWzoyG@cluster1.6rs4c1q.mongodb.net/intern-tracker
```

---

## 🎓 After Deployment

You'll have:
- **Frontend**: `https://your-project.vercel.app` (React UI)
- **Backend**: `https://your-api.vercel.app` (REST API)
- **Database**: MongoDB Atlas (Cloud)

### Test Your App

1. Visit frontend URL
2. Add a new intern
3. Search and filter
4. Edit and delete records

### Auto-Deployments

Every time you push to GitHub:
- `main` branch → Production
- Other branches → Preview

---

## ❓ Need Help?

**CORS Errors?**
- Make sure you added frontend URL to CORS allowedOrigins
- Push changes and wait for auto-redeploy

**Can't connect to DB?**
- Check MongoDB Atlas allows all IPs (0.0.0.0/0)
- Verify MONGODB_URI is correct in Vercel env variables

**Build Failed?**
- Check Vercel build logs
- Ensure vercel.json files are in correct locations

---

## 📺 Watch Deployment

- **Dashboard**: https://vercel.com/dashboard
- **Logs**: Click on your project → Deployments → View Logs

---

**Ready? Start here:** https://vercel.com/new 🚀
