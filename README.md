# 🚀 Trackr — Job & Internship Application Tracker

Trackr is a full-stack web application designed to help students and job seekers manage their job and internship applications in a structured and efficient way.

Instead of relying on scattered notes or spreadsheets, Trackr provides a clean dashboard to track applications, statuses, deadlines, and progress — all in one place.

---

## 🌐 Live Demo

🔗 Frontend: https://trackr-cu1gyxyh9-noman-ahmads-projects-2d4dbe54.vercel.app/
🔗 Backend API: https://trackr-backend-0572.onrender.com 

---

## ✨ Features

### 🔐 Authentication
- Secure user registration & login
- JWT-based authentication
- Protected routes

### 📋 Application Management
- Add new job/internship applications
- Edit and update applications
- Delete applications
- Track:
  - Role
  - Company
  - Location
  - Status (Applied, Interview, Rejected, Offer, Ghosted, Saved)
  - Job Type (Internship, Full-time, etc.)
  - Work Mode
  - Source
  - Deadline
  - Notes

### 📊 Dashboard
- Total applications overview
- Status-based breakdown
- Job-type distribution
- Recent applications
- Upcoming deadlines
- Visual charts (Bar + Pie)

### 🔍 Filtering & Sorting
- Filter by status, job type, work mode, source
- Search functionality
- Sort by newest, oldest, or deadline

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- Context API
- Recharts (for charts)

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (Authentication)
- bcryptjs

### Deployment
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas





## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/trackr.git](https://github.com/nomanahmad14/trackr.git
cd trackr

cd backend
npm install
```
Backend Setup
```
cd backend
npm install
```

Create a .env file inside /backend:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```
Run Backend
npm run server

Frontend Setup
```
cd frontend
npm install
```


Create .env inside /frontend:
VITE_API_URL=http://localhost:5000/api

Run frontend:

npm run dev









