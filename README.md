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

---

📁 React Project Folder Structure
employee-payroll-client/
│
├── 📁 public/                   # Static assets
│   └── index.html              # HTML template
│
├── 📁 src/
│   ├── 📁 assets/              # Images, icons, logos, etc.
│   │
│   ├── 📁 components/          # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── 📁 pages/               # Page-level components
│   │   ├── Home/
│   │   │   └── Home.jsx
│   │   ├── Login/
│   │   │   └── Login.jsx
│   │   ├── Register/
│   │   │   └── Register.jsx
│   │   ├── Dashboard/
│   │   │   ├── Employee/
│   │   │   │   ├── TaskLog.jsx
│   │   │   │   └── PaymentHistory.jsx
│   │   │   ├── HR/
│   │   │   │   ├── VerifyEmployees.jsx
│   │   │   │   ├── ManagePayroll.jsx
│   │   │   │   └── Finance.jsx
│   │   │   └── Admin/
│   │   │       └── ManageRoles.jsx
│   │   └── NotFound.jsx
│   │
│   ├── 📁 layout/              # Layouts for dashboard or public site
│   │   ├── MainLayout.jsx
│   │   └── DashboardLayout.jsx
│   │
│   ├── 📁 hooks/               # Custom hooks
│   │   ├── useAuth.js
│   │   ├── useAxios.js
│   │   └── useAxiosPublic.js
│   │
│   ├── 📁 context/             # Context providers
│   │   └── AuthProvider.jsx
│   │
│   ├── 📁 router/              # Routing setup
│   │   └── routes.jsx
│   │
│   ├── 📁 utils/               # Utility functions
│   │   └── formatDate.js
│   │
│   ├── App.jsx                # Root App component
│   ├── main.jsx               # App entry point
│   └── index.css              # Tailwind & custom styles
│
├── .env                       # Environment variables
├── .gitignore
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js             # If using Vite
└── package.json


## 📁 Project Structure

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
