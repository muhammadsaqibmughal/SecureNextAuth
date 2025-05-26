 #🔐 SecureNextAuth

A **complete, production-ready authentication system** built using **Node.js**, **Next.js**, **Passport.js**, **JWT**, **MongoDB**, **Formik**, and **Yup** with **Tailwind CSS**. SecureNextAuth provides end-to-end user authentication flows including **OTP verification**, **JWT-based login**, **secure password reset**, **profile management**, and **token refresh mechanisms** using **HTTP-only cookies**.<br>

> Built for modern web apps that demand both security and a seamless user experience.<br>



##🚀 Features

✅ User Registration with OTP Email Verification<br>
🔐 Secure Login with JWT and Cookies  <br>
📧 Forgot Password via Email with One-Time Reset Link  <br>
🔁 Refresh Token Flow for Extended Sessions  <br>
🔒 Password Reset & Change Functionality  <br>
👤 Authenticated Profile Access  <br>
🧭 Responsive Navbar and Sidebar for Logged-In Users  <br>
🧠 Form Validation via Formik + Yup  <br>
🛡️ Access Control with Middleware and Role Checks  <br>

<br>
<br>

##📦 Tech Stack

| Technology      | Purpose                             |<br>
|-----------------|-------------------------------------|<br>
| **Next.js**     | Frontend framework (React-based)    |<br>
| **Node.js**     | Backend runtime environment         |<br>
| **Express.js**  | API routing and middleware          |<br>
| **Passport.js** | Authentication strategy management  |<br>
| **JWT**         | Token-based authentication          |<br>
| **MongoDB**     | Database for user and token storage |<br>
| **Mongoose**    | MongoDB ODM                         |<br>
| **Formik + Yup**| Form state and validation handling  |<br>
| **Nodemailer**  | Email sending (OTP & Reset links)   |<br>
| **Cookies**     | Store access & refresh tokens       |<br>
| **Tailwind CSS**| For designing                       |<br>
<br>
<br>
<br>


##🧪 Functionalities Included
<br>
- ✅ Register new account with email OTP verification<br>
- 🔐 Login with JWT access and refresh token flow<br>
- 🔁 Secure token refresh using HTTP-only cookies<br>
- 🧠 Forgot password - Email link with expiration<br>
- 🔄 Reset password via email token<br>
- 🔑 Change password (current password required)<br>
- 👁️ View user profile<br>
- 🚫 Protected routes using middleware<br>
- 🧭 UI: Responsive navbar & sidebar for authenticated users<br>
<br>
##⚙️ Getting Started
###1. Clone the Repository
bash<br>
Copy<br>
`git clone https://github.com/yourusername/SecureNextAuth.git`<br>
`cd SecureNextAuth`<br>
<br>
###2. Backend Setup
bash<br>
Copy<br>
`cd backend`<br>
`npm install`<br>
<br>
**Create a .env file in the backend root:**
`env`<br>
Copy<br>
`PORT=5000`<br>
`MONGO_URI=your_mongodb_connection_string`<br>
`JWT_SECRET=your_jwt_secret`<br>
`REFRESH_TOKEN_SECRET=your_refresh_token_secret`<br>
`EMAIL_USER=your_email@example.com`<br>
`EMAIL_PASS=your_email_password`<br>
`CLIENT_URL=http://localhost:3000`<br>
<br>
<br>
**Run the backend server:**

bash<br>
`nodemon index`<br>

###3. Frontend Setup

bash<br>
`cd ../frontend`<br>
`npm install`<br>
<br>

##🛡️ Authentication Flow Overview
On registration, user receives a One-Time OTP email for account verification.<br>
After verifying, they can log in and receive a JWT access token (short-lived) and refresh token (stored in an HTTP-only cookie).<br>
Refresh token is used to get new access tokens automatically.<br>
Users can reset forgotten passwords securely via an email link.<br>
Authenticated users can change passwords from their profile.<br>
<br>
##🔐 Security Considerations
Uses HTTP-only cookies to store refresh tokens<br>
Tokens signed with strong secrets (JWT & Refresh)<br>
Rate limiting & expiration for OTPs and reset links<br>
Only verified users can log in<br>
Refresh token rotation implemented<br>
<br>
##🔗 Live Demo<br>
<br>
<br>
##🛠️ Future Improvements
✅ Role-based access (admin/user)<br>
🌍 i18n & multi-language support<br>
📱 2FA support<br>
📊 Admin dashboard for managing users<br>
🧪 Unit & integration tests<br>
<br>
##🙌 Contributing
Contributions are welcome! Feel free to fork, open issues or PRs.<br>

Fork the repo<br>
Create your feature branch (git checkout -b feature/new-feature)<br>
Commit your changes (git commit -m 'Add new feature')<br>
Push to the branch (git push origin feature/new-feature)<br>
Open a Pull Request<br>
<br>
##📬 Contact
Created by Your **Muhammad Saqib**<br>
📧 muhammadsaqib1336@gmail.com<br>
<br>
##⭐️ Support
If you like this project, consider giving it a ⭐ on GitHub to support it!<br>




