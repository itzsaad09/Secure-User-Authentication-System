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
```

### 2️⃣ Backend Setup
```bash
cd backend   # or cd server
npm install  # or yarn install
```

Create .env in the backend directory:

``` bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_very_strong_secret_key_for_jwt
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_specific_password
```
Note: For Gmail, use an App Password instead of your normal password.
Run the Backend:

``` bash
npm start   # or yarn start
```
Backend will run on http://localhost:5000.

### 3️⃣ Frontend Setup
``` bash
cd ../frontend   # or cd client
npm install      # or yarn install
```
Create .env in the frontend directory:
``` bash
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_WEB_CLIENT_ID
VITE_BACKEND_URL=http://localhost:5000
```
Run the Frontend:
``` bash
npm run dev   # or yarn dev
```
Frontend will be available at http://localhost:5173.

---

## 🚦 Usage

### 📌 Landing Page
- Displays **"Sign In"** and **"Sign Up"** buttons.
---

### 📝 Sign Up
1. Click **"Sign Up"**.
2. Fill in all required details:
   - First Name
   - Last Name
   - Contact Number (Pakistan format)
   - Email
   - Password
3. **Google Sign Up** option:
   - Click **"Sign up with Google"**.
   - The form will be pre-filled with your Google data.
   - Complete any missing fields (e.g., contact number) and set a password.
4. Upon successful registration:
   - Redirected to the **OTP Verification** page.

### 🔑 OTP Verification
- Check your registered email for a **6-digit verification code**.
- Enter the code to verify your account.
- If needed, click **"Resend Code"** (available after a countdown).

### 🔓 Sign In
1. Click **"Sign In"**.
2. Enter your **verified email** and **password**.
3. Or click **"Sign in with Google"**:
   - If your Google email is already registered → you’ll be logged in instantly.
   - If not → you’ll be redirected to **Sign Up** with pre-filled details.

### 🖥 Dashboard
- After successful login, you’ll be redirected to a personalized dashboard.
- Access your account features from here.

### 🔄 Forgot Password
1. On the **Sign In** page, click **"Forgot Password"**.
2. Enter your registered email.
3. You will receive a password reset link (or code) via email.

---

## Authors

👤 **Hafiz Muhammad Saad**

* Github: [@itzsaad09](https://github.com/itzsaad09)
* LinkedIn: [@itzsaad09](https://linkedin.com/in/itzsaad09)

## Show your support

Give a ⭐️ if this project helped you!




