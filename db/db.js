import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';

dotenv.config();

// Create a single supabase client for interacting with your database
export const supabase = createClient(process.env.DATABASEURL, process.env.API_KEY);