# 🎓 Intern Tracker

A full-stack application for managing internship applications built with React, Node.js/Express, and MongoDB.

## 📋 Features

### Backend

- **CRUD Operations**: Complete Create, Read, Update, Delete functionality for interns
- **Advanced Filtering**: Search by name/email with regex, filter by role and status
- **Pagination**: Efficient data loading with customizable page sizes
- **Error Handling**: Centralized error middleware with consistent error responses
- **Validation**: Comprehensive Mongoose schema validation

### Frontend

- **Modern React UI**: Clean, responsive single-page application
- **Real-time Search**: Debounced search with instant results
- **Filtering System**: Multi-criteria filtering (role, status)
- **Form Validation**: Client-side validation with helpful error messages
- **Edit Mode**: Inline editing with pre-filled forms
- **Loading States**: User-friendly loading indicators
- **Pagination Controls**: Navigate through large datasets easily

## 🛠️ Tech Stack

**Backend:**

- Node.js & Express.js
- MongoDB & Mongoose
- CORS for cross-origin requests

**Frontend:**

- React 18
- Vite (build tool)
- Modern CSS with responsive design

## 📁 Project Structure

```
CoreNode/
├── server.js                    # Express server entry point
├── package.json                 # Backend dependencies
├── .env.example                 # Environment variables template
├── models/
│   └── Intern.js               # Mongoose schema & model
├── controllers/
│   └── internController.js     # Business logic handlers
├── routes/
│   └── internRoutes.js         # API route definitions
├── middleware/
│   └── errorHandler.js         # Centralized error handling
└── client/                      # React frontend
    ├── package.json            # Frontend dependencies
    ├── vite.config.js          # Vite configuration
    ├── index.html              # HTML template
    └── src/
        ├── main.jsx            # React entry point
        ├── App.jsx             # Main App component
        ├── App.css             # Global styles
        ├── index.css           # Base styles
        └── components/
            ├── InternForm.jsx      # Add/Edit form component
            ├── InternTable.jsx     # Data table component
            └── SearchFilter.jsx    # Search & filter component
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**

   ```bash
   cd "e:\ML Stuff\CoreNode"
   ```

2. **Set up environment variables**

   ```bash
   copy .env.example .env
   ```

   Edit `.env` and configure:

   ```
   MONGODB_URI=mongodb://localhost:27017/intern-tracker
   PORT=5000
   ```

3. **Install backend dependencies**

   ```bash
   npm install
   ```

4. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

### Running the Application

#### Development Mode

**Terminal 1 - Backend Server:**

```bash
npm run dev
```

Server runs on `http://localhost:5000`

**Terminal 2 - Frontend Dev Server:**

```bash
cd client
npm run dev
```

Frontend runs on `http://localhost:3000`

#### Production Mode

**Build Frontend:**

```bash
cd client
npm run build
```

**Run Backend:**

```bash
npm start
```

## 📡 API Documentation

Base URL: `http://localhost:5000/api/interns`

### Endpoints

#### Create Intern

```http
POST /api/interns
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Frontend",
  "status": "Applied",
  "score": 85
}
```

#### Get All Interns (with filters)

```http
GET /api/interns?q=john&role=Frontend&status=Applied&page=1&limit=10
```

**Query Parameters:**

- `q` - Search term (name or email)
- `role` - Filter by role (Frontend, Backend, Fullstack)
- `status` - Filter by status (Applied, Interviewing, Hired, Rejected)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Response:**

```json
{
  "data": [...],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

#### Get Single Intern

```http
GET /api/interns/:id
```

#### Update Intern

```http
PATCH /api/interns/:id
Content-Type: application/json

{
  "status": "Hired",
  "score": 95
}
```

#### Delete Intern

```http
DELETE /api/interns/:id
```

### Error Response Format

```json
{
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE"
  }
}
```

**Error Codes:**

- `VALIDATION_ERROR` (400) - Invalid data
- `INVALID_ID` (400) - Invalid MongoDB ObjectId
- `DUPLICATE_ENTRY` (409) - Email already exists
- `NOT_FOUND` (404) - Resource not found
- `INTERNAL_ERROR` (500) - Server error

## 🎨 Data Model

### Intern Schema

| Field     | Type   | Rules                                        |
| --------- | ------ | -------------------------------------------- |
| name      | String | Required, min length 2                       |
| email     | String | Required, unique, valid email format         |
| role      | String | Enum: Frontend, Backend, Fullstack           |
| status    | String | Enum: Applied, Interviewing, Hired, Rejected |
| score     | Number | Min: 0, Max: 100, Default: 0                 |
| createdAt | Date   | Auto-generated timestamp                     |
| updatedAt | Date   | Auto-generated timestamp                     |

## 🧪 Testing the API

You can test the API using curl, Postman, or any HTTP client:

**Example with curl:**

```bash
# Create an intern
curl -X POST http://localhost:5000/api/interns \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Smith","email":"jane@example.com","role":"Backend","status":"Interviewing","score":92}'

# Get all interns
curl http://localhost:5000/api/interns

# Search for interns
curl "http://localhost:5000/api/interns?q=jane&status=Interviewing"
```

## 💡 Key Features Explained

### 1. Real-time Search

The search functionality uses debouncing to avoid excessive API calls while providing instant feedback.

### 2. Centralized Error Handling

All errors are caught and formatted consistently by the error middleware, making debugging easier.

### 3. Form Validation

- **Client-side**: Immediate feedback for user input
- **Server-side**: Mongoose validators ensure data integrity

### 4. Pagination

Efficient data loading with metadata including total count, page numbers, and navigation flags.

### 5. Edit Mode

Click "Edit" to populate the form with existing data, modify, and update seamlessly.

## 🎯 Usage Tips

1. **Search**: Type in the search box to filter by name or email (case-insensitive)
2. **Filter**: Use dropdowns to filter by role or status
3. **Add**: Fill the form and click "Add Intern"
4. **Edit**: Click "Edit" button, modify data, and click "Update Intern"
5. **Delete**: Click "Delete" button (confirmation required)
6. **Navigate**: Use Previous/Next buttons to browse through pages

## 🐛 Troubleshooting

**MongoDB Connection Issues:**

- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network connectivity

**Port Already in Use:**

- Change PORT in `.env` for backend
- Modify `vite.config.js` for frontend port

**CORS Errors:**

- Verify proxy configuration in `vite.config.js`
- Check CORS middleware in `server.js`

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Built as a demonstration of full-stack development best practices.

---

**Happy Coding! 🚀**
