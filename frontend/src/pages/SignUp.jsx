import React, { useState } from "react";
import "./SignUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdCard,
  faPhone,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { backendUrl } from "../App";
import axios from "axios";
import { useGoogleLogin } from '@react-oauth/google';
const SignUp = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    contactno: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contactno") {
      if (!value.startsWith("+92")) {
        setFormData({ ...formData, [name]: "+92 " });
        return;
      }
      const remainingDigits = value.substring(4).replace(/\D/g, "");
      let formattedDigits = "";
      if (remainingDigits.length > 0) {
        const firstThree = remainingDigits.substring(0, 3);
        const lastSeven = remainingDigits.substring(3, 10);
        if (lastSeven) {
          formattedDigits = `${firstThree} ${lastSeven}`;
        } else {
          formattedDigits = firstThree;
        }
      }
      const formattedValue = `+92 ${formattedDigits}`;
      setFormData({ ...formData, [name]: formattedValue });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleContactNoFocus = (e) => {
    if (!formData.contactno) {
      setFormData({ ...formData, contactno: "+92 " });
    }
  };

  const handleContactNoBlur = (e) => {
    if (formData.contactno.trim() === "+92") {
      setFormData({ ...formData, contactno: "" });
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true); // Set loading state

    if (
      !formData.fname ||
      !formData.lname ||
      !formData.contactno ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setMessage("Please fill in all fields.");
      setIsSuccess(false);
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      setIsSuccess(false);
      setIsLoading(false);
      return;
    }

    try {
      localStorage.setItem("email", formData.email);
      const response = await axios.post(
        backendUrl + "/api/auth/register",
        formData
      );

      if (response.status === 201) {
        console.log(response.data);
        setMessage("Registration successful! Redirecting to OTP verification...");
        setIsSuccess(true);
        localStorage.setItem("token", response.data.token);
        setTimeout(() => {
          window.location.href = "/verify";
        }, 1500);
      } else {
        setMessage("Registration failed. Please try again.");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An unexpected error occurred. Please try again later.");
      }
      setIsSuccess(false);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Google Sign-up logic using useGoogleLogin hook
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google Login Success:", tokenResponse);
      setMessage("Signing up with Google...");
      setIsLoading(true);
      try {
        // Send the access token to your backend for verification
        const response = await axios.post(backendUrl + "/api/auth/google", {
          token: tokenResponse.access_token,
        });

        if (response.status === 200) {
          console.log("Backend Google Auth Success:", response.data);
          setMessage("Google Sign-up successful! Redirecting...");
          setIsSuccess(true);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("email", response.data.user.email); // Store email for dashboard
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1500);
        } else {
          setMessage("Google Sign-up failed on server. Please try again.");
          setIsSuccess(false);
        }
      } catch (error) {
        console.error("Backend Google Auth Error:", error.response ? error.response.data : error.message);
        setMessage(error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "An error occurred during Google Sign-up. Please try again.");
        setIsSuccess(false);
      } finally {
        setIsLoading(false);
      }
    },
    onError: (errorResponse) => {
      console.error("Google Login Error:", errorResponse);
      setMessage("Google Sign-up failed. Please try again.");
      setIsSuccess(false);
      setIsLoading(false);
    },
  });

  const handleLoginRedirect = () => {
    window.location.href = "/signin";
  };

  return (
    <div className="signup-card">
      <div className="signup-card2">
        <form className="signup-form" onSubmit={handleSubmit}>
          <p id="signup-heading">Register</p>
          <div className="signup-field-group">
            <div className="signup-field">
              <FontAwesomeIcon icon={faIdCard} className="signup-input-icon" />
              <input
                type="text"
                className="signup-input-field"
                placeholder="First Name"
                autoComplete="off"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
              />
            </div>

            <div className="signup-field">
              <FontAwesomeIcon icon={faIdCard} className="signup-input-icon" />
              <input
                type="text"
                className="signup-input-field"
                placeholder="Last Name"
                autoComplete="off"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="signup-field">
            <FontAwesomeIcon icon={faPhone} className="signup-input-icon" />
            <input
              type="tel"
              className="signup-input-field"
              placeholder="+92 xxx xxxxxxx"
              autoComplete="off"
              name="contactno"
              value={formData.contactno}
              onChange={handleChange}
              onFocus={handleContactNoFocus}
              onBlur={handleContactNoBlur}
            />
          </div>

          <div className="signup-field">
            <FontAwesomeIcon icon={faEnvelope} className="signup-input-icon" />
            <input
              type="email"
              className="signup-input-field"
              placeholder="username@domain.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="signup-field signup-password-field">
            <FontAwesomeIcon icon={faLock} className="signup-input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              className="signup-input-field"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="signup-password-toggle-icon"
              onClick={handleTogglePassword}
            />
          </div>

          <div className="signup-field signup-password-field">
            <FontAwesomeIcon icon={faLock} className="signup-input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              className="signup-input-field"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="signup-password-toggle-icon"
              onClick={handleTogglePassword}
            />
          </div>

          {message && (
            <p className={`signup-message ${isSuccess ? "signup-success" : "signup-error"}`}>
              {message}
            </p>
          )}

          <button className="signup-button1" type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>

          <div className="signup-btn">
            <button
              className="signup-button2"
              type="button"
              onClick={handleLoginRedirect}
              disabled={isLoading} // Disable during loading
            >
              Already have an account? Login
            </button>
            <button
              className="signup-google-signup-button"
              type="button"
              onClick={() => {
                setIsLoading(true); // Set loading state when Google login starts
                googleLogin();
              }}
              disabled={isLoading}
            >
              <FontAwesomeIcon icon={faGoogle} className="signup-google-icon" />
              Sign up with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
