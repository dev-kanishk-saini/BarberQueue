import { createUser , createAdminUser } from '../db/user-queries.js';

export const createuser = async (req, res, next) => {
  try {
    const { name, gender,email,role , phone, password } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: 'Name, email, password and role are required'
      });
    }
     let user;
    if(role === "admin"){
          user = await createAdminUser({ name, gender,email,role, phone, password });
    }else{
       user = await createUser({ name, gender,email,role, phone, password });
       
    }
   

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        role: user.role,
      }
    });
  } catch (error) {
    next(error);
  }
};

