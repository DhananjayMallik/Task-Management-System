// ------------------------------------------
// 🌐 MongoDB Connection Using Mongoose
// ------------------------------------------

import mongoose from "mongoose";

// Function to connect to MongoDB
export const dbConnection = async () => {
  try {
    // connection using the MONGO_URI from .env file
    const connect = await mongoose.connect(process.env.MONGO_URI);

    // If successful, log the host (helpful for debugging)
    console.log(
      `MongoDB Connected Successfully ✅ → Host: ${connect.connection.host}`
    );
    
  } catch (error) {
    // If connection fails, log the error
    console.log(`❌ Database Connection Error: ${error.message}`);
  }
};
