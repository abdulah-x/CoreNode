# 🚀 Vercel Deployment Guide

This guide will help you deploy the Intern Tracker application to Vercel (full-stack).

## Prerequisites

- GitHub account with the repository pushed
- Vercel account (free) - Sign up at https://vercel.com
- MongoDB Atlas connection string

## Deployment Strategy

We'll deploy:
1. **Backend** - Node.js/Express API on Vercel
2. **Frontend** - React/Vite app on Vercel

## Option 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Deploy Backend

1. Go to https://vercel.com/dashboard
2. Click **"Add New Project"**
3. Import from GitHub: `abdulah-x/CoreNode`
4. Configure:
   - **Root Directory**: `./` (leave as root)
   - **Framework Preset**: Other
   - **Build Command**: Leave empty or `npm install`
   - **Output Directory**: Leave empty
5. Add Environment Variables:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   PORT=5000
   NODE_ENV=production
   ```
6. Click **Deploy**
7. **Save the backend URL** (e.g., `https://your-backend.vercel.app`)

### Step 2: Deploy Frontend

1. Click **"Add New Project"** again
2. Import same repository: `abdulah-x/CoreNode`
3. Configure:
   - **Root Directory**: `client`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend.vercel.app
   ```
   (Use the URL from Step 1)
5. Click **Deploy**

### Step 3: Update Backend CORS

After frontend deployment, update backend CORS to allow frontend domain:

In `server.js`, update CORS:
```javascript
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

Commit and push changes - Vercel will auto-redeploy.

## Option 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login

```bash
vercel login
```

### Step 3: Deploy Backend

```bash
# In project root
vercel --prod

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name? corenode-backend
# - Directory? ./
# - Override settings? N
```

Add environment variables:
```bash
vercel env add MONGODB_URI production
vercel env add PORT production
vercel env add NODE_ENV production
```

### Step 4: Deploy Frontend

```bash
cd client
vercel --prod

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name? corenode-frontend
# - Directory? ./
# - Override settings? N
```

Add environment variable:
```bash
vercel env add VITE_API_URL production
# Enter your backend URL: https://your-backend.vercel.app
```

## Post-Deployment

### Test Your Deployment

1. Visit your frontend URL
2. Try creating, editing, and deleting interns
3. Test search and filtering
4. Check browser console for errors

### Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Troubleshooting

**CORS Errors:**
- Ensure backend CORS includes frontend URL
- Check environment variables are set correctly

**Database Connection:**
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check MONGODB_URI is correct

**Build Fails:**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json

## URLs

After deployment, you'll have:
- **Frontend**: `https://your-frontend.vercel.app`
- **Backend API**: `https://your-backend.vercel.app/api/interns`

## Auto-Deployments

Vercel automatically redeploys when you push to GitHub:
- Push to `main` → Production deployment
- Push to other branches → Preview deployment

---

**Need help?** Check Vercel documentation: https://vercel.com/docs
