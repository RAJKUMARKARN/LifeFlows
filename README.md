# 🩸 LifeFlows – Blood Donation Platform

Hey there,
**LifeFlows** is a full-stack blood donation management system built to connect donors and recipients efficiently.  
It allows users to register, log in securely using JWT authentication, and manage their life-saving journeys.  
The app is designed with a clean UI, modern animations, and a secure backend.

------

## 🚀 Features

- 🔐 **User Authentication (JWT)** – Secure signup & login using Node.js, Express, MongoDB & JWT.
- 🩸 **Donor Management** – Users can view and register as blood donors.
- 💬 **AI Chat Support (Planned)** – AI-powered assistant to answer questions about donation & eligibility.
- 📍 **Find Nearby Donors (Planned)** – Integration with Google Maps API for location-based donor search.
- 🎥 **Informative Section (Planned)** – Human-centric videos & awareness campaigns about blood donation.
- 🌗 **Responsive Design** – Optimized for both desktop and mobile users.

------

## 🛠️ Tech Stack

### **Frontend:**
- ⚛️ React (Vite)
- 🎨 Tailwind CSS
- 🌐 Axios (for API calls)
- 🔄 React Router DOM (for navigation)

### **Backend:**
- 🧠 Node.js
- ⚙️ Express.js
- 🔐 JWT (JSON Web Token) for Authentication
- 🔑 bcrypt.js (for password hashing)
- 🗄️ MongoDB (Mongoose ORM)
- 🌍 CORS (Cross-Origin Resource Sharing)

-------

## 🧩 Project Structure

LifeFlows/
├── backend/
│ ├── config/
│ │ └── db.js # MongoDB connection setup
│ ├── controllers/
│ │ └── authController.js # Register/Login logic
│ ├── models/
│ │ └── User.js # User schema
│ ├── routes/
│ │ └── authRoutes.js # Auth routes
│ ├── .env # Environment variables
│ ├── package.json
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── Login.jsx
│ │ │ ├── SignUp.jsx
│ │ │ └── Dashboard.jsx
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── public/






































































