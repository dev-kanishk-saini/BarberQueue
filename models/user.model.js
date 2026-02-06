import mongoose from 'mongoose';


const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: Number,
      required: true,
      
    },
    email: {
      type: String,
      required: true,
     
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["customer", "owner", "admin"],
      default: "customer",
    },

    avatar: {
      type: String,
    },

    address: {
      type: String,
      required: true,
    },

    pin: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
    versionKey: false,
  }
);

const saveUser = (user) => {
  return new User(user).save();
};
const updateUser = (userId, data) => {
  return User.findByIdAndUpdate(userId, data, { new: true });
};

const getUser = (userId) => {
  return User.findById(userId);
};

const deleteUser = (userId) => {
  return User.findByIdAndDelete(userId);
};




const User  = mongoose.model('user', customerSchema);

export { User, saveUser, updateUser, getUser, deleteUser };