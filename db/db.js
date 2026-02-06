// import { createClient } from '@supabase/supabase-js'
// import dotenv from 'dotenv';

// dotenv.config();

// // Create a single supabase client for interacting with your database
// export const supabase = createClient(process.env.DATABASEURL, process.env.API_KEY);
// export const supabaseAdmin = createClient(process.env.DATABASEURL, process.env.ADMIN_API_KEY);

import mongoose from "mongoose";



async function ConnectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export default ConnectDb;