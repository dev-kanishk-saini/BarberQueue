
import { supabase } from "./db.js";

export async function createUser({
  name,
  gender,
  email,
  role,
  phone,
  password
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'http://localhost:8000/verify-email'
      // OR your production URL
    }
  });

  if (error) {
    throw new Error(error.message);
  }

  // When email confirmation is enabled, user is NOT fully active yet
  if (!data.user) {
    return {
      message: 'Signup successful. Please verify your email.'
      
    };
  }

  const { error: insertError } = await supabase
    .from('users')
    .insert({
      id: data.user.id,
      name,
      gender,
      role,
      phone,
      email
    });

  if (insertError) {
    throw new Error(insertError.message);
  }

  return {
    message: 'User created successfully'
  };
}


export async function createAdminUser({
  name,
  gender,
  email,
  role,
  phone,
  password
}) {
  // 1. Create user WITHOUT confirming email
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: false
  });

  if (error) {
    throw new Error(error.message);
  }

  // 2. Send verification email
  await supabase.auth.admin.generateLink({
    type: 'signup',
    email,
    options: {
      redirectTo: 'http://localhost:8000/verify-email'
    }
  });

  // 3. Insert profile
  const { error: insertError } = await supabase
    .from('users')
    .insert({
      id: data.user.id,
      name,
      gender,
      role,
      phone,
      email
    });

  if (insertError) {
    throw new Error(insertError.message);
  }

  return {
    message: 'Admin user created. Verification email sent.'
  };
}
