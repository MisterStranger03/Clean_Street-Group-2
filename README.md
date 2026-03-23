# Clean Street

**A MERN-based Civic Issue Reporting and Tracking System**

Clean Street is a full-stack web application that empowers citizens to report, track, and monitor civic issues in their locality from broken roads to overflowing garbage with geotagged photos and real time status updates.

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white)](https://cloudinary.com/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Contributors](#contributors)

---

## Overview

Clean Street bridges the gap between citizens and civic authorities. Users can submit complaints about local issues with photographic evidence and geolocation data. A dedicated dashboard lets users monitor the status of submitted complaints, while the interactive Leaflet map visualizes reported issues across the city.

---

## Features

- 🔐 **User Authentication** — Secure sign-up and login with JWT-based session management
- 📸 **Image Uploads** — Attach photos to complaints, stored and served via Cloudinary
- 📍 **Geolocation Mapping** — Interactive Leaflet.js map displaying all reported issues with pin markers
- 📋 **Complaint Dashboard** — Track the status of submitted complaints (Pending / In Progress / Resolved)
- 🗂️ **Issue Categorisation** — Report issues by type (roads, sanitation, lighting, water supply, etc.)
- 📱 **Responsive UI** — Works across desktop and mobile screen sizes

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js (Create React App), CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Media Storage** | Cloudinary |
| **Maps** | Leaflet.js |
| **Authentication** | JSON Web Tokens (JWT), bcrypt |

---

## Project Structure

```
Clean_Street-Group-2/
├── backend/
│   ├── config/          # DB connection, Cloudinary config
│   ├── controllers/     # Route handler logic
│   ├── middleware/       # Auth middleware (JWT verification)
│   ├── models/          # Mongoose schemas (User, Complaint)
│   ├── routes/          # Express route definitions
│   └── server.js        # Entry point
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/  # Reusable UI components (Map, ComplaintCard, Navbar, etc.)
│       ├── pages/       # Route-level pages (Home, Login, Register, Dashboard, Report)
│       ├── context/     # Auth context / global state
│       ├── utils/       # API call helpers
│       └── App.js       # Root component with routing
│
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v16+
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas URI)
- A [Cloudinary](https://cloudinary.com/) account for image uploads

### 1. Clone the Repository

```bash
git clone https://github.com/MisterStranger03/Clean_Street-Group-2.git
cd Clean_Street-Group-2
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` directory (see [Environment Variables](#environment-variables)).

```bash
npm start
# Server runs on http://localhost:5000
```

### 3. Set Up the Frontend

```bash
cd ../frontend
npm install
npm start
# App runs on http://localhost:3000
```

---

## Environment Variables

Create a `.env` file inside the `backend/` directory with the following keys:

```env
# Server
PORT=5000

# MongoDB
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

---

## API Reference

### Auth

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive a JWT |

### Complaints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/complaints` | Fetch all complaints |
| `GET` | `/api/complaints/:id` | Fetch a single complaint |
| `POST` | `/api/complaints` | Submit a new complaint (auth required) |
| `PUT` | `/api/complaints/:id` | Update complaint status (auth required) |
| `DELETE` | `/api/complaints/:id` | Delete a complaint (auth required) |

> All protected routes require an `Authorization: Bearer <token>` header.

---

## Contributors

| Name | GitHub |
|---|---|
| Raman Sah | [@MisterStranger03](https://github.com/MisterStranger03) |
| Devi Saranya | [@DeviSaranya11](https://github.com/DeviSaranya11) |
| Subhayan Dutta | [@subhayandutta100-wq](https://github.com/subhayandutta100-wq) |

---

## License

This project was developed as a group internship project. Feel free to fork and build upon it.
