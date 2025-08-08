import authModel from "../models/authModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendVerificationCode from "../middleware/email.js";
import axios from "axios";

// Create Token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// Controller Function for Registration
const register = async (req, res) => {
  try {
    const { fname, lname, contactno, email, password, confirmPassword } =
      req.body; // Validation

    if (
      !fname ||
      !lname ||
      !contactno ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({ message: "All fields are required" });
    } else if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }
   // Corrected mobile phone validation to use 'en-PK' locale
    else if (!/^(\+92 )?[0-9]{3} [0-9]{7}$/.test(contactno)) {
      return res.status(400).json({
        message:
          "Invalid contact number. Must be in the format '+92 xxx xxxxxxx'.",
      });
    } else if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: "Password is not strong enough" });
    } else if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    } // Check if email and contact number already exists

    const existingUser = await authModel.findOne({ email, contactno });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or contact number already exists" });
    } // Hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); // Verification Code

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString(); // Expire Verification Code in 2 minutes

    const verificationCodeExpiresAt = new Date();
    verificationCodeExpiresAt.setMinutes(
      verificationCodeExpiresAt.getMinutes() + 3
    ); // Create user

    const newUser = new authModel({
      fname,
      lname,
      contactno,
      email,
      password: hashedPassword,
      verificationCode,
      verificationCodeExpiresAt,
      isVerified: false,
    }); // Save user

    const user = await newUser.save(); // Send verification code

    const subject = "Please verify your email address.";
    await sendVerificationCode(
      fname,
      lname,
      email,
      subject,
      verificationCode,
      verificationCodeExpiresAt
    ); // Create token

    const token = createToken(user._id); // Send response

    res.status(201).json({
      user,
      token,
      message:
        "User registered successfully. Please check your email for the verification code.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller Function to verify the code
const verify = async (req, res) => {
  try {
    const { email, verificationCode } = req.body; // Find user by email

    const user = await authModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    } // Check if the provided code matches the one in the database

    if (user.verificationCode !== verificationCode) {
      return res.status(400).json({ message: "Invalid verification code." });
    } // Check if the verification code has expired

    if (new Date() > user.verificationCodeExpiresAt) {
      // If expired, remove the code and expiration time from the user document
      user.verificationCode = null;
      user.verificationCodeExpiresAt = null;
      await user.save();
      return res.status(400).json({
        message: "Verification code has expired. Please request a new one.",
      });
    } // If code is valid and not expired, mark user as verified

    user.isVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpiresAt = null;
    await user.save(); // You can create a new token or send a success message

    const token = createToken(user._id);
    res.status(200).json({ token, message: "Account successfully verified!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller Function to resend the verification code
const resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await authModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const verificationCodeExpiresAt = new Date();
    verificationCodeExpiresAt.setMinutes(
      verificationCodeExpiresAt.getMinutes() + 3
    );
    user.verificationCode = verificationCode;
    user.verificationCodeExpiresAt = verificationCodeExpiresAt;
    await user.save();
    const subject = "Please verify your email address.";
    await sendVerificationCode(
      user.fname,
      user.lname,
      user.email,
      subject,
      verificationCode,
      verificationCodeExpiresAt
    );
    res.status(200).json({ message: "Verification code sent successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller Function to Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const token = createToken(user._id);
    res.status(200).json({ token, message: "Login successful." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller Function to Recover Password
const recoverPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const user = await authModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    await user.save();
    const token = createToken(user._id);

    res.status(200).json({ token, message: "Password recovery successful." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller Function to Get User Data
const getUser = async (req, res) => {
  try {
    const {email} = req.query;
    const user = await authModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// New Controller Function for Google Authentication
const googleAuth = async (req, res) => {
  try {
    const { token } = req.body; // Google access_token from frontend

    if (!token) {
      return res
        .status(400)
        .json({ message: "Google access token is required." });
    }

    // 1. Verify the Google access token with Google's API
    const googleResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
    );
    const googleProfile = googleResponse.data;

    const { email, given_name, family_name, sub: googleId } = googleProfile; // 'sub' is Google's unique user ID

    // 2. Check if a user with this email already exists in your database
    let user = await authModel.findOne({ email });

    if (user) {
      // If user exists, update their Google ID if not already set (optional)
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
      // Log them in
      const appToken = createToken(user._id);
      return res
        .status(200)
        .json({
          user: {
            email: user.email,
            fname: user.fname,
            lname: user.lname,
            isVerified: user.isVerified,
          },
          token: appToken,
          message: "Google login successful.",
        });
    } else {
      // If user does not exist, register them
      // You might want to generate a random strong password for them
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8); // Example: random 16-char string
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(generatedPassword, salt);

      const newUser = new authModel({
        fname: given_name || "GoogleUser", // Use Google's first name, or a default
        lname: family_name || "", // Use Google's last name
        email: email,
        password: hashedPassword, // Store a generated password
        googleId: googleId, // Store Google's unique ID
        isVerified: true, // Mark as verified since Google handles email verification
        contactno: "", // Google Auth might not provide phone, so leave empty or prompt user later
      });

      user = await newUser.save();
      const appToken = createToken(user._id);
      return res
        .status(200)
        .json({
          user: {
            email: user.email,
            fname: user.fname,
            lname: user.lname,
            isVerified: user.isVerified,
          },
          token: appToken,
          message: "Google registration successful.",
        });
    }
  } catch (error) {
    console.error(
      "Google Auth Error:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ message: "Google authentication failed. Please try again." });
  }
};

export {
  register,
  verify,
  resendVerificationCode,
  login,
  recoverPassword,
  getUser,
  googleAuth,
};
