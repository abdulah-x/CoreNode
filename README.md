# 🎓 Intern Tracker

Full-stack application for managing internship applications with React, Node.js/Express, and MongoDB.

**Repository:** [https://github.com/abdulah-x/CoreNode](https://github.com/abdulah-x/CoreNode)

## ✨ Features

- ✅ Complete CRUD operations
- 🔍 Real-time search & filtering (name, email, role, status)
- 📄 Pagination support
- ✏️ Inline editing
- ⚡ Modern React UI with animations
- 🛡️ Form validation (client & server-side)
- 🔒 Error handling & security

## 🛠️ Tech Stack

**Backend:** Node.js, Express, MongoDB (Mongoose)  
**Frontend:** React 18, Vite, Modern CSS

## 🚀 Local Development Setup

### Prerequisites

Before you begin, ensure you have:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB Atlas Account** (free tier) - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

### Step 1: Clone the Repository

```bash
git clone https://github.com/abdulah-x/CoreNode.git
cd CoreNode
```

### Step 2: Setup MongoDB

1. Create a free MongoDB Atlas cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user with read/write permissions
3. Whitelist your IP address (or use `0.0.0.0/0` for development)
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/intern-tracker`)

### Step 3: Configure Environment Variables

**Backend (.env):**
```bash
# Create .env file in root directory
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/intern-tracker
PORT=5000
NODE_ENV=development
```

**Frontend (client/.env):**
```bash
# Create .env file in client directory
VITE_API_URL=http://localhost:5000
```

### Step 4: Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### Step 5: Run the Application

**Option A: Run Both Servers Separately (Recommended)**

Open **two terminal windows**:

**Terminal 1 - Backend:**
```bash
npm run dev
# Server will start at http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
# App will open at http://localhost:5173
```

**Option B: Production Build**

```bash
# Build frontend
cd client
npm run build
cd ..

# Run backend (serves built frontend)
npm start
```

### Step 6: Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api/interns
- **Health Check:** http://localhost:5000/api/health

### 🔧 Troubleshooting

**Problem: MongoDB Connection Error**
- Verify your IP is whitelisted in MongoDB Atlas Network Access
- Check your connection string is correct in `.env`
- Ensure your MongoDB user has proper permissions

**Problem: Port Already in Use**
- Change `PORT=5000` to another port in `.env`
- Kill the process using the port (Windows: `netstat -ano | findstr :5000`)

**Problem: Frontend Can't Connect to Backend**
- Verify backend is running on http://localhost:5000
- Check `VITE_API_URL` in `client/.env`
- Clear browser cache and restart dev server

## 🌐 Production Deployment (Vercel)

### Deploy Backend

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your GitHub repository
4. Configure project:
   - **Framework Preset:** Other
   - **Root Directory:** `./` (leave as root)
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)
5. Add Environment Variables:
   - `MONGODB_URI` = Your MongoDB Atlas connection string
   - `NODE_ENV` = `production`
6. Click "Deploy"
7. Copy your backend URL (e.g., `https://corenode-backend.vercel.app`)

### Deploy Frontend

1. In Vercel, click "New Project" again
2. Import the **same repository**
3. Configure project:
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add Environment Variables:
   - `VITE_API_URL` = Your backend URL from step 7 above
5. Click "Deploy"
6. Your app is live! 🎉

### Update CORS (Important!)

After deploying frontend, update backend's CORS settings:

1. In your code, check `server.js` line ~19
2. Add your frontend URL to `allowedOrigins` array
3. Commit and push to GitHub (Vercel auto-redeploys)

```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-frontend.vercel.app', // Add this
];
```

### Live Demo

- **Frontend:** https://corenode-frontend.vercel.app
- **Backend:** https://corenode-backend.vercel.app

## � Available Scripts

### Backend (Root Directory)

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

### Frontend (client/ Directory)

```bash
npm run dev        # Start Vite dev server (http://localhost:5173)
npm run build      # Build for production
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
```

## �📡 API Endpoints

**Base URL:** `http://localhost:5000/api/interns`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all interns (supports ?q=search&role=Frontend&status=Applied&page=1&limit=10) |
| POST | `/` | Create new intern |
| GET | `/:id` | Get single intern |
| PATCH | `/:id` | Update intern |
| DELETE | `/:id` | Delete intern |

**Example Request:**
```json
POST /api/interns
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Frontend",
  "status": "Applied",
  "score": 85
}
```

## 📋 Intern Schema

| Field | Type | Validation |
|-------|------|------------|
| name | String | Required, min 2 chars |
| email | String | Required, unique, valid email |
| role | String | Frontend / Backend / Fullstack |
| status | String | Applied / Interviewing / Hired / Rejected |
| score | Number | 0-100 (default: 0) |

## � Project Structure

```
CoreNode/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components (InternForm, InternTable, etc.)
│   │   ├── App.jsx        # Main app component
│   │   ├── App.css        # Styles
│   │   └── main.jsx       # Entry point
│   ├── .env               # Frontend environment variables
│   └── package.json       # Frontend dependencies
│
├── controllers/           # Request handlers
│   └── internController.js
├── models/               # Mongoose schemas
│   └── Intern.js
├── routes/               # API routes
│   └── internRoutes.js
├── middleware/           # Custom middleware
│   └── errorHandler.js
├── .env                  # Backend environment variables
├── server.js             # Express server entry point
├── vercel.json          # Vercel deployment config
└── package.json         # Backend dependencies
```

## �📝 License

Open source - Educational purposes
