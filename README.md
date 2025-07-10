# 📝 Blog App - MERN Stack Project

A full-featured Blog Application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). Users can register, login, create, edit, delete blogs, and view profiles. The project includes secure authentication, user sessions, blog management, and more.

---

## 🚀 Features

- 🔐 User Authentication (Register, Login, Logout)
- 👤 Profile Page with User Info & Blog History
- 📝 Create, Edit, Delete Blogs
- 📃 View All Blogs & Single Blog Details
- 🔍 Authorization to prevent unauthorized deletion/editing
- 🌐 Protected Routes with JWT or Session Authentication
- ⚙️ Fully RESTful API with error handling
- 📦 Reusable components (React)
- 📁 MVC structure for clean backend code

---

## 🧰 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Bcrypt.js
- Cookie Parser
- dotenv
- CORS

---

## 📂 Folder Structure

root/

├── backend/

│ ├── controllers/

│ ├── models/

│ ├── routes/

│ ├── middleware/

│ ├── .env

│ └── server.js

├── frontend/

│ ├── components/

│ ├── pages/

│ ├── AuthProvider.jsx

│ ├── App.jsx

│ └── main.jsx

├── .gitignore

└── README.md


---

## ⚙️ Setup Instructions

### 📦 Clone the repository

```bash
git clone https://github.com/kutubofficial/BlogApp.git
cd blog-app
```

##🖥️ Backend Setup
```bash
cd backend
npm install
```
✅ Create a .env file in the /backend folder:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

```bash
npm run dev
```
🌐 Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will run on: http://localhost:5173
##🧪 API Routes
🔑 Auth Routes
```bash
POST   /v1/users/register
POST   /v1/users/login
POST   /v1/users/logout
```
👤 User Routes
```bash
GET    /v1/users/profile/:id
```
📝 Blog Routes
```bash
GET    /v1/blogs/fetch-all
GET    /v1/blogs/fetch-one/:id
POST   /v1/blogs/create
PUT    /v1/blogs/update/:id
DELETE /v1/blogs/delete/:id
```
##🙌 Author
Kutubuddin Ansari


# 📝 License
This project is licensed under the MIT License.

---

### ✅ Final Tips

- Replace `kutubofficial` and links with your GitHub username.
- Push it with:

```bash
git add README.md
git commit -m "Added project README"
git push
```
