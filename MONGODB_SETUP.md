# MongoDB Setup Guide for Intern Tracker

## ⚠️ MongoDB is Required

The Intern Tracker backend needs MongoDB to run. You have two options:

## Option 1: MongoDB Atlas (Cloud - Recommended for Quick Start) ☁️

**Fastest way to get started - No local installation needed!**

1. **Create free account:**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up for free (no credit card required)

2. **Create a cluster:**
   - Choose "Free Shared Cluster" (M0)
   - Select a region close to you
   - Click "Create Cluster" (takes 3-5 minutes)

3. **Get connection string:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/intern-tracker?retryWrites=true&w=majority`

4. **Update .env file:**
   Replace the MONGODB_URI in `.env` with your connection string:

   ```
   MONGODB_URI=mongodb+srv://youruser:yourpassword@cluster0.xxxxx.mongodb.net/intern-tracker?retryWrites=true&w=majority
   PORT=5000
   ```

5. **Whitelist your IP:**
   - In Atlas, go to "Network Access"
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (for development)

---

## Option 2: Local MongoDB Installation 💻

**For local development and testing**

### Windows Installation:

1. **Download MongoDB:**
   - Visit: https://www.mongodb.com/try/download/community
   - Select Windows version
   - Download the MSI installer

2. **Install MongoDB:**
   - Run the installer
   - Choose "Complete" installation
   - **Important:** Check "Install MongoDB as a Service"
   - Check "Install MongoDB Compass" (GUI tool)

3. **Verify Installation:**

   ```powershell
   mongod --version
   ```

4. **Start MongoDB (if not running as service):**

   ```powershell
   # Create data directory
   New-Item -ItemType Directory -Force -Path C:\data\db

   # Start MongoDB
   mongod --dbpath C:\data\db
   ```

5. **Your .env is already configured:**
   ```
   MONGODB_URI=mongodb://localhost:27017/intern-tracker
   PORT=5000
   ```

### Quick Start with Chocolatey (Windows Package Manager):

```powershell
# Install Chocolatey (if not installed)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install MongoDB
choco install mongodb -y

# Start MongoDB
net start MongoDB
```

---

## ✅ After MongoDB is Running

1. **Restart the backend server:**

   ```powershell
   cd "e:\ML Stuff\CoreNode"
   npm run dev
   ```

2. **You should see:**

   ```
   ✅ Connected to MongoDB
   🚀 Server running on http://localhost:5000
   📡 API available at http://localhost:5000/api
   ```

3. **Then start the frontend in a new terminal:**

   ```powershell
   cd "e:\ML Stuff\CoreNode\client"
   npm run dev
   ```

4. **Open your browser:**
   ```
   http://localhost:3000
   ```

---

## 🔧 Troubleshooting

**MongoDB won't start?**

- Check if port 27017 is already in use
- Ensure data directory exists
- Run PowerShell as Administrator

**Connection refused error?**

- Verify MongoDB is running: `Get-Service MongoDB` (Windows service)
- Check `.env` has correct connection string
- For Atlas: Verify IP is whitelisted

**Can't connect to Atlas?**

- Check your internet connection
- Verify username/password in connection string
- Ensure IP address is whitelisted in Atlas

---

## 📞 Need Help?

- MongoDB Docs: https://docs.mongodb.com/
- Atlas Setup: https://docs.atlas.mongodb.com/getting-started/
- MongoDB Community: https://www.mongodb.com/community/forums/
