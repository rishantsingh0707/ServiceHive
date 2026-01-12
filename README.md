GigFlow – Mini Freelance Marketplace Platform

GigFlow is a mini freelance marketplace that connects clients and freelancers.
Clients can post gigs and hire freelancers, while freelancers can browse gigs, apply, and track application status.

This project demonstrates full-stack development skills, including authentication, role-based access, database relationships, and a complete hiring workflow.

🚀 Live Demo

Frontend: (add your deployed frontend URL here)

Backend: (add your deployed backend URL here)

Loom Video (Hiring Workflow): (add Loom link here)

🧩 Features
Authentication

User registration & login

JWT-based authentication

Role-based access (client, freelancer)

Protected routes

Freelancer Features

Browse all open gigs

Apply to gigs with proposals

View applied gigs with status:

pending

accepted

rejected

Client Features

Create new gigs

View own gigs

View applications per gig

Hire a freelancer

Mark gig as completed

Hiring Workflow

Client posts a gig

Freelancer applies

Client views applications

Client hires one freelancer

Gig moves to in-progress

Other applications are rejected

Client marks gig as completed

🛠 Tech Stack
Frontend

React (Vite)

React Router DOM

Context API (Auth state)

Axios

Tailwind CSS (Dark theme + glassmorphism UI)

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

bcrypt.js

📁 Project Structure
Backend
gigflow-backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── app.js
├── server.js
├── .env.example
└── package.json

Frontend
src/
├── api/
├── components/
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   └── RootRedirect.jsx
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── auth/
│   ├── client/
│   └── freelancer/
├── App.jsx
└── main.jsx

🔐 Environment Variables
Backend (.env)
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Frontend (.env)
VITE_API_URL=http://localhost:5000

⚠️ .env files are not committed.
Use .env.example for reference.

▶️ Running Locally
Backend
cd gigflow-backend
npm install
npm run dev


Backend runs on:

http://localhost:5000

Frontend
cd gigflow-frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173

🧪 Test Accounts (Optional)

You can create accounts using the UI:

Client

Role: Client

Freelancer

Role: Freelancer

🎥 Loom Demo (What is shown)

Client login → create gig

Freelancer login → browse gigs → apply

Client login → view applications → hire freelancer

Client marks gig as completed

✅ Key Highlights

Clean, role-based routing

Secure JWT authentication

Realistic hiring workflow

Dark theme UI with glassmorphism navbar

Production-ready project structure