import { createUser , createAdminUser , userLogin, userLogout } from '../db/user-queries.js';

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

export const loginUser = async (req, res, next) => {
   try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: 'Email and password are required'
        });
      } ;
      
      const user = await userLogin({ email, password });

      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.user.id,
          email: user.user.email,
          accessToken: user.session.access_token,
          refreshToken: user.session.refresh_token

        }
      });
   } catch (error) {
    next(error);
   }
}   

export const logoutUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.slice(7)
      : null;

    if (!token) {
      return res.status(401).json({
        message: 'Authorization token missing'
      });
    }

    const { error } = await userLogout({ token });

    if (error) {
      throw error;
    }

    return res.status(200).json({
      message: 'Logged out successfully'
    });
  } catch (error) {
    next(error);
  }
};
