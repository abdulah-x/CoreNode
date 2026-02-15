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

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/abdulah-x/CoreNode.git
cd CoreNode

# Setup environment
copy .env.example .env
# Edit .env: MONGODB_URI=your_connection_string

# Install dependencies
npm install
cd client && npm install && cd ..

# Run backend (Terminal 1)
npm run dev

# Run frontend (Terminal 2)
cd client && npm run dev
```

**Backend:** http://localhost:5000  
**Frontend:** http://localhost:3000

## 📡 API Endpoints

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

## 📝 License

Open source - Educational purposes
