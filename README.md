📘 TASKMASTER PRO – Team Task Management System

A complete MERN Stack team task management platform designed for teams to track tasks, manage projects, and collaborate effectively.
Includes Admin/member roles, analytics dashboard, project management, task tracking, comments, file uploads, and activity logs.

🚀 Live Demo

(Add link when deployed)

📸 Screenshots

(Add screenshots after building UI)

📑 Table of Contents

About

Features

Tech Stack

Folder Structure

Installation & Setup

Environment Variables

API Endpoints

Validation (Yup)

Future Enhancements

📘 About the Project

TaskMaster Pro is a full-featured MERN stack project designed for real-world use cases such as team collaboration, project planning, and workflow tracking.

It includes a modern UI, secure backend, authentication, and dashboards.

You can use this project for:

Internship submissions


Company task management

MERN stack learning

⭐ Features
🔐 Authentication

Register & Login

Password hashing

JWT Authentication

Role-based Access (Admin/Member)

👨‍💼 Admin Features

Create projects

Add team members

Assign/remove roles

View all tasks

update user details

👥 Member Features

View assigned projects

Manage personal tasks

Update task status

Add comments

View notifications

📌 Task Management

Create/update/delete tasks

Assign tasks to users

Status flow: TODO → IN PROGRESS → DONE

Priority levels

Deadline support

Subtasks

Comments & attachments

Activity logs

📊 Dashboard

Total users

Total tasks

Project count

Tasks by priority

Tasks by status

Recent activity

🛠 Tech Stack
Frontend

React.js

Tailwind CSS

Axios

React Router


Backend

Node.js

Express.js

MongoDB + Mongoose

JSON Web Token (JWT)



Yup (validations)

Bcrypt.js

📁 Folder Structure
TaskMasterPro/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── validations/
│   ├── server.js
│   └── config/
│
└── frontend/
    ├── src/
    ├── components/
    ├── pages/
    ├── context/
    ├── hooks/
    └── App.js

⚙️ Installation & Setup
1. Clone the Repository
git clone  https://github.com/DhananjayMallik/Task-Management-System.git
cd TaskManagementSystem

🔧 Backend Setup
Start backend
# cd Server
# npm install
🖥 Frontend Setup
# cd Client
# npm install
# npm start
# npm run dev

🔑 Environment Variables

Create .env file in backend:

MONGO_URL=your_mongodb_uri
JWT_SECRET_KEY=your_secret_key
PORT