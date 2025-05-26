import mongoose from "mongoose";
const connectDB = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "passportjsauth",
    };
    await mongoose
      .connect(DATABASE_URL, DB_OPTIONS)
      .then(() => {
        console.log("Database connected Successfully");
      })
      .catch((err) => {
        console.log("Something Wrong in database connection", err);
        console.log("Something Wrong in database connection", err);
      });
  } catch (err) {
    console.log("Database Connection Error", err);
  }
};

export default connectDB;
 