# 🔐 SecureNextAuth

````markdown

A **complete, production-ready authentication system** built using **Node.js**, **Next.js**, **Passport.js**, **JWT**, **MongoDB**, **Formik**, and **Yup** with **Tailwind CSS**.

SecureNextAuth provides end-to-end user authentication flows including **OTP verification**, **JWT-based login**, **secure password reset**, **profile management**, and **token refresh mechanisms** using **HTTP-only cookies**.

> Built for modern web apps that demand both security and a seamless user experience.

---

## 🚀 Features

- ✅ User Registration with OTP Email Verification  
- 🔐 Secure Login with JWT and Cookies  
- 📧 Forgot Password via Email with One-Time Reset Link  
- 🔁 Refresh Token Flow for Extended Sessions  
- 🔒 Password Reset & Change Functionality  
- 👤 Authenticated Profile Access  
- 🧭 Responsive Navbar and Sidebar for Logged-In Users  
- 🧠 Form Validation via Formik + Yup  
- 🛡️ Access Control with Middleware and Role Checks  

---

## 📦 Tech Stack

| Technology      | Purpose                            |
| --------------- | --------------------------------- |
| **Next.js**     | Frontend framework (React-based)  |
| **Node.js**     | Backend runtime environment       |
| **Express.js**  | API routing and middleware        |
| **Passport.js** | Authentication strategy management|
| **JWT**         | Token-based authentication        |
| **MongoDB**     | Database for user and token storage|
| **Mongoose**    | MongoDB ODM                      |
| **Formik + Yup**| Form state and validation handling|
| **Nodemailer**  | Email sending (OTP & Reset links) |
| **Cookies**     | Store access & refresh tokens     |
| **Tailwind CSS**| For styling                      |

---

## 🧪 Functionalities Included

- ✅ Register new account with email OTP verification  
- 🔐 Login with JWT access and refresh token flow  
- 🔁 Secure token refresh using HTTP-only cookies  
- 🧠 Forgot password - Email link with expiration  
- 🔄 Reset password via email token  
- 🔑 Change password (current password required)  
- 👁️ View user profile  
- 🚫 Protected routes using middleware  
- 🧭 Responsive navbar & sidebar for authenticated users  

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/SecureNextAuth.git
cd SecureNextAuth
````

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend root with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:3000
```

Run the backend server:

```bash
nodemon index
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

---

## 🛡️ Authentication Flow Overview

* On registration, users receive a One-Time OTP email for account verification.
* After verifying, users can log in and receive a **JWT access token** (short-lived) and a **refresh token** (stored in an HTTP-only cookie).
* The refresh token is used to automatically get new access tokens.
* Users can reset forgotten passwords securely via email links.
* Authenticated users can change passwords from their profile.

---

## 🔐 Security Considerations

* Uses **HTTP-only cookies** to store refresh tokens
* Tokens signed with strong secrets (JWT & Refresh)
* Rate limiting & expiration for OTPs and reset links
* Only **verified users** can log in
* Refresh token **rotation implemented**

---

## 🔗 Live Demo

*Coming soon...*

---

## 🛠️ Future Improvements

* ✅ Role-based access (admin/user)
* 🌍 i18n & multi-language support
* 📱 Two-Factor Authentication (2FA) support
* 📊 Admin dashboard for managing users
* 🧪 Unit & integration tests

---

## 🙌 Contributing

Contributions are welcome! Feel free to fork, open issues or PRs.

```bash
# Fork the repo
git checkout -b feature/new-feature
git commit -m "Add new feature"
git push origin feature/new-feature
```

Open a Pull Request on GitHub.

---

## 📬 Contact

Created by **Muhammad Saqib**
📧 [muhammadsaqib1336@gmail.com](mailto:muhammadsaqib1336@gmail.com)

---

## ⭐️ Support

If you like this project, consider giving it a ⭐ on [GitHub](https://github.com/yourusername/SecureNextAuth) to support it!


