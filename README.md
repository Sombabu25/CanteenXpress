## CanteenXpress ##
A "QR-based canteen order management system" built with MERN Stack (MongoDB, Express, React, Node.js)

This project streamlines college canteen operations by replacing manual order-taking with a **digital, QR-powered ordering system**.

---

## Introduction

CanteenXpress is designed to modernize the traditional canteen experience in colleges.  
Instead of students waiting in long queues to place orders, they simply **scan the QR code at their table**, browse the digital menu, place their orders, and choose payment methods.  
The system then updates the order status in real time for both students and canteen staff.

---

##  Problem Statement

- Long queues during lunch/dinner hours.
- Mismanagement of orders due to manual handling.
- No proper tracking of order status (students don’t know when their food is ready).
- Limited payment flexibility (cash-only in most canteens).
- Admins have no proper dashboard to manage menu & orders efficiently.

---

##  Solution

- Each table has a **unique QR code** linked to it.
- Students scan the QR → open the digital menu → place order.
- Payment flexibility: **Cash at counter** or **Online UPI/QR-based payments**.
- Orders move through workflow: **Pending → Preparing → Completed**.
- Admins get a **dashboard** to:
  - Add/update/delete menu items.
  - View and manage all orders.
  - Track status and sales.

---

##  Tech Stack

### Backend
- **Node.js** & **Express.js** – REST API
- **MongoDB + Mongoose** – Database
- **JWT** – Authentication & Authorization
- **Bcrypt.js** – Password hashing
- **CORS, Helmet, Morgan** – Security & Logging

### Frontend
- **React.js** – UI
- **React Router** – Navigation
- **Axios** – API calls
- **TailwindCSS** – Styling

---



##  Features

-  **Table-wise QR code** scanning for placing orders.
-  **Menu management** (add, update, delete items).
-  **User authentication** (JWT-based).
-  **Role-based access** (Admin & Student).
-  **Payment options**:
  - Cash (pay at counter).
  - Online (shows PhonePe/UPI QR code for scanning).
-  **Order workflow**:
  - Pending → Preparing → Completed.
-  **Admin dashboard**:
  - Manage menu items.
  - View all orders.
  - Update order status.

---



## Folder Structure
CanteenXpress/
│── backend/

│ ├── config/ # DB connection & JWT config

│ ├── controllers/ # API logic (auth, orders, menu)

│ ├── middleware/ # Auth & admin checks

│ ├── models/ # Mongoose schemas (User, Menu, Order, Table)

│ ├── routes/ # Express routes

│ ├── server.js # App entry point

│ └── package.json
│


│── frontend/

│ ├── public/ # Static files (QR codes, images, screenshots)

│ ├── src/

│ │ ├── components/ # Reusable UI components (Navbar, OrderCard, etc.)

│ │ ├── pages/ # Pages (Home, Checkout, Admin Dashboard)

│ │ ├── App.js # Main React app

│ │ ├── index.js # Entry point

│ └── package.json
│
│── README.md

## Project Status
- Backend API testing completed
- Currently working on Frontend UI



## Setup & Installation

1. **Clone the repository**
  - git clone https://github.com/your-username/CanteenXpress.git
  - cd CanteenXpress

2. **Backend setup**
   -cd backend
   -npm install
   -npm run dev

3. **Frontend setup**
   -cd frontend
   -npm install
   -npm start

4. **Environment variables (backend .env)
   -PORT=5000
   -MONGO_URI=mongodb://127.0.0.1:27017/canteen-app
   -JWT_SECRET=mysecretkey123
   -CORS_ORIGIN=http://localhost:3000









