import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import connectDB from "./config/connectdb.js";
import userRoute from "./routes/userRoutes.js";


const app = express();
const port = process.env.PORT;
const dbUrl = process.env.DATABASE_URL;

// this will solve CORS policy Error
const corsOption = {
  // set origin to a specific origin
  origin: process.env.FRONTEND_HOST,
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOption));

// json inputs
app.use(express.json());

// Passport middleware
app.use(passport.initialize());

// Cookie parser
app.use(cookieParser());

// Database connection
connectDB(dbUrl);

// Load routes
app.use("/api/user", userRoute);

// server listening
app.listen(port, () => {
  console.log(`Server is Running on http://localhost:${port}`);
});
