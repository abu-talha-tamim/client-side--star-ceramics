# React + Vite
Live link : https://star-ceramics-e6940.web.app


# ⭐ Star-T | Employee Management System

Welcome to **Star-T**, a modern Employee Management System built with **React**, **Firebase Authentication**, **Express**, and **MongoDB**. This system allows employee registration, login (email/password and social login), and role-based access control for Employees, HR, and Admin.

## ✨ Features

- 🔐 **Authentication**
  - Email/Password login
  - Google and GitHub social login
- 🧑‍💼 **User Roles**
  - Role-based interface: Employee, HR, Admin
  - Default role: Employee
- 💾 **Database Integration**
  - Stores user info in MongoDB upon login/registration
  - Prevents duplicate entries
- 📋 **User Info Fields**
  - Name, email, photo, role, salary, account number, designation, registration date
- ⚙️ **Routing & Navigation**
  - Protected routes using React Router
  - Redirects to the last visited page after login
- 📦 **Modern Stack**
  - React + Tailwind CSS
  - Firebase Auth
  - Axios + Express
  - MongoDB (via custom REST API)

---

## 🚀 Tech Stack

| Technology     | Description                          |
|----------------|--------------------------------------|
| React          | Frontend framework                   |
| Firebase Auth  | User authentication system           |
| Express.js     | Backend server and API               |
| MongoDB        | NoSQL database to store user data    |
| Tailwind CSS   | UI design and styling                |
| Axios          | HTTP client to communicate with API  |
| React Router   | Client-side routing                  |
| SweetAlert2    | Beautiful pop-up messages            |



🧪 Future Features
✅ Employee Dashboard

✅ HR Panel with Salary Management

✅ Admin Controls (User management)

🔄 Monthly Reports

📊 Performance Tracking

📁 Upload Documents

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
