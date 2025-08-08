import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    contactno: {
      type: String,
      required: false, // Changed to false to accommodate Google sign-ups without phone numbers
      // Removed unique: true from here. Email is the primary unique identifier.
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true, // Still required, as Google auth flow generates one if new user
    },
    // Removed confirmPassword: { type: String, ... } - this is a frontend-only field
    googleId: { // New field to store Google's unique user ID
      type: String,
      unique: true,
      sparse: true, // Allows null values, ensuring uniqueness only for non-null googleIds
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: String,
    verificationCodeExpiresAt: Date,
  },
  { timestamps: true }
);

const userModel = mongoose.models.user || mongoose.model("User", userSchema);
export default userModel;
