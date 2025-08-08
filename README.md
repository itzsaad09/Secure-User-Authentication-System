Here’s your **GitHub-ready README.md** version of your project, properly formatted with markdown, headings, bullet points, and code blocks for a clean, professional look.

---

````markdown
# 🔐 Secure User Authentication System

A robust and attractive **user authentication system** built with **React** for the frontend and **Node.js (Express)** with **MongoDB** for the backend.  
It includes essential features like **user registration**, **login**, **email OTP verification**, **password recovery**, and **Google authentication**.

---

## ✨ Features

- **User Registration**: Secure sign-up with first name, last name, contact number (**Pakistan format**), email, and password.
- **Email OTP Verification**: 6-digit OTP sent via email for account verification upon registration.
- **User Login**: Authenticate users using email and password.
- **Forgot Password**: Request a password reset via email.
- **Change Password**: Dedicated page for password updates.
- **Google Authentication**:
  - Existing Google users: Direct login.
  - New Google users: Redirected to sign-up form with pre-filled details.
- **Responsive Design**: Works on desktop, tablet, and mobile with a dark theme.
- **Secure Password Handling**: Passwords hashed with **bcrypt** before storage.
- **JWT Authentication**: Secure API access using JSON Web Tokens.

---

## 💻 Technologies Used

### **Frontend (React)**
- [React.js](https://react.dev/) – UI library
- [Axios](https://axios-http.com/) – HTTP client
- [React Router DOM](https://reactrouter.com/) – Client-side routing
- [@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google) – Google OAuth 2.0 hooks
- [Font Awesome](https://fontawesome.com/) – Icons
- **CSS3** – Styling and responsive design

### **Backend (Node.js & Express)**
- [Node.js](https://nodejs.org/) – Runtime environment
- [Express.js](https://expressjs.com/) – Web framework
- [MongoDB](https://www.mongodb.com/) – NoSQL database
- [Mongoose](https://mongoosejs.com/) – ODM
- [Bcrypt](https://www.npmjs.com/package/bcrypt) – Password hashing
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) – JWT handling
- [Validator.js](https://www.npmjs.com/package/validator) – String validation
- [Nodemailer](https://nodemailer.com/) – Email sending
- [Axios](https://axios-http.com/) – Google API calls

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### **Prerequisites**
- Node.js **v14 or higher**
- MongoDB (**local** or **MongoDB Atlas**)
- Google Cloud Project with **OAuth 2.0 Client ID** for Web Application

---

### 1️⃣ Clone the Repository
```bash
git clone <your-repository-url>
cd <your-repository-name>
````

---

### 2️⃣ Backend Setup

```bash
cd backend   # or cd server
npm install  # or yarn install
```

#### Create `.env` in the backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_very_strong_secret_key_for_jwt
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_specific_password
```

> **Note:** For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833) instead of your normal password.

#### Run the Backend:

```bash
npm start   # or yarn start
```

Backend will run on **[http://localhost:5000](http://localhost:5000)**.

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend   # or cd client
npm install      # or yarn install
```

#### Create `.env` in the frontend directory:

```env
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_WEB_CLIENT_ID
VITE_BACKEND_URL=http://localhost:5000
```

#### Run the Frontend:

```bash
npm run dev   # or yarn dev
```

Frontend will be available at **[http://localhost:5173](http://localhost:5173)**.

---

## 🚦 Usage

### **Landing Page**

* Simple **"Sign In"** and **"Sign Up"** buttons.

### **Sign Up**

1. Fill in required details.
2. For **Google Sign Up**:

   * Form is pre-filled with Google data.
   * Complete missing fields (like contact number) and set a password.
3. After registration → redirected to **OTP Verification**.

### **OTP Verification**

* Check email for 6-digit code.
* Enter to verify your account.
* Option to resend OTP after a countdown.

### **Sign In**

* Enter verified email + password.
* Or sign in with Google (if registered).
* If email isn’t registered → redirected to sign-up page.

### **Dashboard**

* Redirected here after successful login.

### **Forgot Password**

* Enter your email to receive reset instructions.

### **Change Password**

* Access via reset link or user settings.

---

## 🤝 Contributing

Contributions are welcome!
Please fork the repository, make your changes, and submit a pull request.

---

## 📄 License

This project is licensed under the **MIT License**.

```

---

If you want, I can also **add badges** (like React, Node.js, MongoDB, License, etc.) at the top so it looks more professional on GitHub. That’ll make it look like a premium open-source project.
```
