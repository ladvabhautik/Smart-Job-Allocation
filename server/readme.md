# 🚀 Smart Job Allocation System

A production-ready backend system for intelligent contractor ranking
using ZIP Intelligence, weighted scoring logic, and dynamic aggregation
pipelines.

------------------------------------------------------------------------

# 📌 Project Overview

Smart Job Allocation is built using:

-   Node.js
-   Express.js
-   MongoDB (Atlas)
-   Mongoose
-   JWT Authentication
-   Aggregation Pipelines
-   Jest Unit Testing

The system automatically ranks contractors based on weighted scoring
logic and supports admin override functionality.

------------------------------------------------------------------------

# 🎯 Core Features

## ✅ Contractor Registration

Contractors register with: - Trade - Rating - Completion Rate - Avg
Response Time - Active Jobs - ZIP Code

## ✅ Job Posting

Jobs are posted with: - ZIP Code - Trade Required - Urgency (Normal /
Urgent)

## ✅ ZIP Intelligence Scoring

Each ZIP includes:

-   Population Mobility Score (30%)
-   Business Activity Score (25%)
-   Demographic Fit Score (20%)
-   Seasonal Demand Score (25%)

### Formula:

ZIP Score = (0.30 × Mobility) + (0.25 × Business Activity) + (0.20 ×
Demographic Fit) + (0.25 × Seasonal Demand)

ZIP score is dynamically calculated using a pre-save hook.

------------------------------------------------------------------------

## ✅ Contractor Bid Ranking Logic

  Factor                 Weight
  ---------------------- ---------------------
  Distance from ZIP      25%
  Contractor Rating      25%
  Completion Rate        20%
  Response Time          10% (20% if urgent)
  Trade Match Accuracy   20%

### Special Rules

-   If contractor has ≥ 5 active jobs → 10% penalty
-   If job is Urgent → Response Time weight doubles
-   Admin can override ranking manually

Ranking is calculated using MongoDB Aggregation Pipelines.

------------------------------------------------------------------------

# 🏗 Project Structure

    src/
    │
    ├── config/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── services/
    ├── tests/
    └── server.js

------------------------------------------------------------------------

# 🔐 Authentication

-   JWT-based authentication
-   Role-based access (admin / contractor)
-   Middleware-protected routes

------------------------------------------------------------------------

# 🧪 Unit Tests

Run tests:

npm test

------------------------------------------------------------------------

# ⚙️ Environment Setup

Create a `.env` file in project root:

PORT=5000 MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

------------------------------------------------------------------------

# 🛠 Backend Setup & Run Guide

## Step 1 --- Install Dependencies

npm install

## Step 2 --- Start Development Server

npm run dev

## Step 3 --- Production Mode

npm start

------------------------------------------------------------------------

# 📬 API Endpoints

Auth: POST /api/auth/register POST /api/auth/login

Jobs: POST /api/jobs GET /api/jobs

Bids: POST /api/bids GET /api/bids/:jobId PATCH
/api/bids/override/:bidId

------------------------------------------------------------------------

# 📊 Ranking Flow

1.  Contractor submits bid
2.  Weighted score calculated
3.  Aggregation pipeline sorts bids
4.  Penalty & urgent logic applied
5.  Admin override handled

------------------------------------------------------------------------

# 👨‍💻 Author

Developed by Bhautik\
Smart Job Allocation System
