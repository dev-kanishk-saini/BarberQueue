import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    salon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "salon",
      required: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
    versionKey: false,
  }
);


const createAppointment = (appointmentData) => {
  return new Appointment(appointmentData).save();
};

const updateAppointment = (appointmentId, data) => {
  return Appointment.findByIdAndUpdate(appointmentId, data, { new: true });
};

const getsalonAppointments = (salonId) => {
  return Appointment.find({ salon: salonId });
};

const getuserAppointments = (customerId) => {
  return Appointment.find({ customer: customerId });
};

const deleteAppointment = (appointmentId) => {
  return Appointment.findByIdAndDelete(appointmentId);
};

const Appointment = mongoose.model("appointment", appointmentSchema);


export { Appointment, createAppointment, updateAppointment, getsalonAppointments, getuserAppointments, deleteAppointment   };
