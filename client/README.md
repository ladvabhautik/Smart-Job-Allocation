# 🚀 Smart Job Allocation -- Frontend (Enterprise Version)

## 📌 Overview

This is the Enterprise-Level Frontend for the Smart Job Allocation
System.

The application supports:

-   Role-based authentication (Admin / Contractor)
-   Smart Job Posting
-   Contractor Bidding
-   Weighted Dynamic Ranking
-   Admin Override System
-   Real-time Dashboard Analytics
-   Secure Route Protection
-   Optimistic UI Updates
-   Enterprise Redux Architecture

------------------------------------------------------------------------

# 🏗 Tech Stack

-   React 19
-   Redux Toolkit
-   React Router v6
-   PrimeReact UI
-   ApexCharts
-   Axios (with interceptors)
-   JWT Authentication

------------------------------------------------------------------------

# 📂 Folder Structure

src/ │ ├── app/ │ └── store.js │ ├── services/ │ └── axios.js │ ├──
routes/ │ └── ProtectedRoute.jsx │ ├── features/ │ ├── auth/ │ ├── jobs/
│ └── bids/ │ ├── pages/ │ ├── Dashboard.jsx │ ├── JobsPage.jsx │ ├──
BidsPage.jsx │ ├── Login.jsx │ └── Register.jsx │ └── App.jsx

------------------------------------------------------------------------

# 🔐 Authentication & Security

✔ JWT-based authentication\
✔ Token auto-attached via Axios interceptor\
✔ Role extracted using jwt-decode\
✔ Secure route-level protection\
✔ Role-based UI rendering

------------------------------------------------------------------------

# 📊 Dashboard Features

-   Total Jobs
-   Urgent Jobs
-   Total Bids
-   Average Score
-   Jobs Distribution Chart
-   Jobs vs Bids Chart
-   Top 5 Contractors
-   Date Filter (All / 7 Days / 30 Days)

Charts powered by ApexCharts.

------------------------------------------------------------------------

# 🧠 Smart Ranking Logic (Backend Driven)

### Base Weighted Score

Distance (25%)\
Rating (25%)\
Completion Rate (20%)\
Response Time (10%)\
Trade Match Accuracy (20%)

### Special Rules

-   Contractor with 5+ active jobs → penalty applied\
-   Urgent job → Response Time weight doubled\
-   Admin can override ranking

Frontend dynamically reflects finalScore from backend.

------------------------------------------------------------------------

# ⚡ State Management

Redux Toolkit used for:

-   Authentication
-   Jobs
-   Bids

Includes:

-   Loading states
-   Error handling
-   Optimistic UI updates
-   Async thunk pattern

------------------------------------------------------------------------

# 🛠 Installation

## 1️⃣ Clone Repository

git clone `<repo-url>`{=html}\
cd frontend

## 2️⃣ Install Dependencies

npm install

## 3️⃣ Create Environment File

Create .env file:

VITE_API_URL=http://localhost:5000/api

## 4️⃣ Run Development Server

npm run dev

Frontend runs at:

http://localhost:5173

------------------------------------------------------------------------

# 🔌 Backend Requirement

Backend must be running at:

http://localhost:5000

Required API Endpoints:

-   POST /auth/login
-   POST /auth/register
-   GET /jobs
-   POST /jobs
-   GET /bids
-   GET /bids/:jobId
-   PATCH /bids/override/:bidId

------------------------------------------------------------------------

# 🧪 Testing Flow

## Admin Flow

1.  Login as admin\
2.  Create job\
3.  View bids\
4.  Override ranking\
5.  Check dashboard

## Contractor Flow

1.  Login as contractor\
2.  View job\
3.  Create bid\
4.  See auto-ranking

------------------------------------------------------------------------

# 🏢 Enterprise Highlights

✔ Secure Route Guards\
✔ Role-based rendering\
✔ Axios Interceptors\
✔ Clean folder structure\
✔ Scalable architecture\
✔ Production-ready frontend

------------------------------------------------------------------------

# 👨‍💻 Author

Developed by Bhautik\
Smart Job Allocation System
