# Dynamic Todo App

A full-stack **Todo application** with **user authentication** (signup & signin) and **persistent data storage** using **MongoDB**. This project is the advanced version of `local-todo-app`, now upgraded with a dynamic backend and a real database connection.

---

## 🚀 Features

* User **signup** & **signin** with JWT authentication.
* Each user has their **own todos** stored securely in MongoDB.
* Full CRUD operations:

  * ➕ Add todos
  * ✏️ Update todos
  * ❌ Delete todos
  * 📋 View todos
* Persistent storage with **MongoDB database**.
* Clean and modular code structure (`server.js`, `db.js`, `auth.js`).
* Simple and responsive **frontend** with vanilla HTML + JS.

---

## 📂 Project Structure

```
dynamic-todo-app
│-- node_modules/
│-- public/
│   │-- index.html
│   │-- signup.html
│   │-- signin.html
│   │-- todos.html
│   │-- todos.js
│-- package.json
│-- package-lock.json
│-- server.js
│-- db.js
│-- auth.js
```

---

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, Vanilla JS, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT (JSON Web Tokens)

---

## ⚙️ Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/dynamic-todo-app.git
   cd dynamic-todo-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Update MongoDB connection string:

   * Open `server.js`
   * Replace the placeholder with your actual MongoDB URI:

     ```js
     mongoose.connect('your-mongodb-uri-here');
     ```

4. Start the server:

   ```bash
   node server.js
   ```

5. Open your browser and go to:

   ```
   http://localhost:3000
   ```

---

## 🔑 Usage

* Open `/signup.html` → Create an account
* Login at `/signin.html` → Get your JWT token stored in browser localStorage
* Access `/todos.html` → Add, update, or delete todos

---

## 📌 Future Improvements

* Add password hashing (bcrypt)
* Add logout functionality
* Improve frontend UI with styling (Bootstrap/Tailwind)
* Deploy on cloud (Render, Vercel, or Heroku)

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

