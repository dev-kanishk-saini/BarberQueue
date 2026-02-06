// import { createUser , createAdminUser , userLogin, userLogout } from '../db/user-queries.js';

// export const createuser = async (req, res, next) => {
//   try {
//     const { name, gender,email,role , phone, password , address , pin } = req.body;
//    // console.log({ name, gender,email,role, phone, password , address , pin});

//     if (!name || !email || !password || !role) {
//       return res.status(400).json({
//         message: 'Name, email, password and role are required'
//       });
//     }
//      let user;
//     if(role === "admin"){
//           user = await createAdminUser({ name, gender,email,role, phone, password });
//     }else{
//        user = await createUser({ name, gender,email,role, phone, password , address , pin });
       
//     }
   

//     res.status(201).json({
//       message: 'User created successfully',
//       user: {
//         id: user.id,
//         phone: user.phone,
//         name: user.name,
//         role: user.role,
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const loginUser = async (req, res, next) => {
//    try {
//       const { email, password } = req.body;

//       if (!email || !password) {
//         return res.status(400).json({
//           message: 'Email and password are required'
//         });
//       } ;
      
//     const { user, session, role }= await userLogin({ email, password });

//       res.status(200).json({
//         message: 'Login successful',
//         user: {
//           id: user.id,
//           email: user.email,
//           role: role,
//           accessToken: session.access_token,
//           refreshToken: session.refresh_token,
     
//         }
//       });
//    } catch (error) {
//     next(error);

//    }
// }   

// export const logoutUser = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     const token = authHeader?.startsWith('Bearer ')
//       ? authHeader.slice(7)
//       : null;

//     if (!token) {
//       return res.status(401).json({
//         message: 'Authorization token missing'
//       });
//     }

//     const { error } = await userLogout({ token });

//     if (error) {
//       throw error;
//     }

//     return res.status(200).json({
//       message: 'Logged out successfully'
//     });
//   } catch (error) {
//     next(error);
//   }
// };


// export const getUserProfile = async (req, res, next) => {};
// export const updateUserProfile = async (req, res, next) => {};

import { User , saveUser , updateUser , getUser, deleteUser } from "../models/user.model.js";

 const createUser = async (req, res, next) => {
      try {
        const { name, gender,email,role , phone, password , address , pin } = req.body;
        const user = await saveUser({ name, gender,email,role, phone, password , address , pin });
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
        res.status(500).json({
          message: 'Error creating user',
          error: error.message
        }); 
        console.error(error);
      }
};

const getUserProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUser(id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    res.status(200).json({
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        role: user.role,
        email: user.email,
        address: user.address,
        pin: user.pin
      }
    });
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, phone, address, pin } = req.body;
    const updatedUser = await updateUser(id, { name, phone, address, pin });
    if (!updatedUser) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    next(error);
  }
};

const deleteUserProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    res.status(200).json({
      message: 'User deleted successfully',
      user: deletedUser
    });
  } catch (error) {
    next(error);
  }
};



export { createUser, getUserProfile, updateUserProfile, deleteUserProfile };