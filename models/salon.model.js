import mongoose from "mongoose";

const salonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
    },

    openAt: {
      type: String,
      required: true,
    },

    closeAt: {
      type: String, // "21:00"
      required: true,
    },

    services: {
      type: [String],
      default: [],
    },

    salon_image: {
      type: [String],
      default: [],
    },

    pin: {
      type: Number,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
    versionKey: false,
  }
);


const initializeSalon = (salonData) => {
  return new Salon(salonData).save();
};

const updateSalon = (salonId, data) => {    
  return Salon.findByIdAndUpdate(salonId, data, { new: true });
};

const getSalon = (salonId) => {
  return Salon.findById(salonId);
};

const getallSalons = async () => {
  return await Salon.find();
};

const deleteSalon = (salonId) => {
  return Salon.findByIdAndDelete(salonId);
};

const Salon = mongoose.model("salon", salonSchema);
export { Salon, initializeSalon, updateSalon, getSalon,getallSalons, deleteSalon };