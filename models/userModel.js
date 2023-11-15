import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 25,
      minlength: 2,
    },
    issuer_dn: {
      type: String,
      required: true,
    },
    serial_number: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("users", userSchema);
