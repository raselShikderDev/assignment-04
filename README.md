# 📚 My Library 

This is a full-stack **Library Management System** that allows users to:

- 📖 View all books
- ➕ Add a new book
- 📝 Edit book details
- 📦 Borrow a book
- 📊 View a summary of borrowed books

The project is built using **React**, **TypeScript**, **Redux Toolkit Query**, **Tailwind CSS**, and **Node.js** with **Express** and **MongoDB** on the backend.

---

## 🔗 Live Links

- **Client (Frontend)**: [https://your-vercel-client-url.vercel.app](#)
- **Server (Backend)**: [https://server-mylibray.onrender.com](https://server-mylibray.onrender.com)

---

## 📁 Project Folder Structure

```
assignment-04/
├── client/               # Frontend (Vite + React)
│   ├── src/
│   │   ├── apps/
│   │   │   ├── custom_components/
│   │   │   ├── pages/
│   │   │   ├── redux/
│   │   │   └── router/
│   │   └── main.tsx
│   ├── public/
│   ├── index.html
│   └── vite.config.ts
│
├── server/               # Backend (Express + MongoDB)
│   ├── app/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── zodSchema/
│   │   └── middleware/
│   ├── app.ts
│   └── index.ts
│
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🛠️ Tech Stack

### 🧩 Frontend
- React + Vite
- TypeScript
- Redux Toolkit Query (RTK Query)
- React Hook Form
- Zod (for form validation)
- Tailwind CSS
- Shadcn UI (for clean components)

### 🛠 Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- Zod (for input validation)
- CORS (for frontend-backend communication)

---

## 🚀 How to Run the Project Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/assignment-04.git
cd assignment-04
```

---

### 2. Start the Server

```bash
cd server
npm install
npm run dev
```

> Make sure MongoDB is running locally or use MongoDB Atlas.

---

### 3. Start the Client

```bash
cd client
npm install
npm run dev
```

> Visit `http://localhost:5173` in your browser.

---

## ⚙️ Environment Variables

For this project, no special environment variables are needed in the frontend.  
Backend connection is hardcoded for demonstration purposes.

If you need to configure dynamic URLs later, consider using a `.env` file in both `client` and `server`.

---

## 🧪 Features and Pages

| Page Name         | Path                  | Description                      |
|------------------|-----------------------|----------------------------------|
| 📘 Book List      | `/books`              | View all available books         |
| ➕ Create Book     | `/create-book`        | Add a new book                   |
| ✏️ Edit Book       | `/edit-book/:id`      | Update an existing book          |
| 📦 Borrow Book     | `/borrow/:bookId`     | Borrow a specific book           |
| 📊 Borrow Summary  | `/borrow-summary`     | See how many times books borrowed |

---

## 🌍 Deployment

- **Backend** is deployed on [Render](https://render.com)
- **Frontend** is deployed on [Vercel](https://vercel.com)

No environment variable is needed on Vercel in this setup. All API URLs are hardcoded as:

```
https://server-mylibray.onrender.com/books
https://server-mylibray.onrender.com/borrow
```

---

## 💡 Tips for Beginners

- Make sure your server allows CORS requests from your frontend (especially in production).
- Use proper API URLs in `fetchBaseQuery` when deploying.
- Always test routes manually with tools like Postman before connecting from the frontend.

---

## 📩 Contact

Made by **[Rasel Shikder](https://github.com/raselShikderDev)**  
If you have questions or feedback, feel free to open an issue or message me!

---

## 📝 License

This project is for educational purposes only.
