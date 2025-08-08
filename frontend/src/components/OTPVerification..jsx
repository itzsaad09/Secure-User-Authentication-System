import React, { useState, useEffect, useRef } from "react";
import "./OTPVerification.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeOpenText,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { backendUrl } from "../App";

const OTPVerification = () => {
  // State to manage the 6-digit OTP input
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  // State to store feedback messages for the user
  const [message, setMessage] = useState("");
  // State to determine if the message is a success or error message
  const [isSuccess, setIsSuccess] = useState(false);
  // State to show a loading indicator on the button during API calls
  const [isLoading, setIsLoading] = useState(false);
  // State for the resend button's countdown timer
  const [countdown, setCountdown] = useState(60); // 60 seconds
  // State to control if the resend button is disabled
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const inputRefs = useRef([]);
  const email = localStorage.getItem("email");

  // Effect to handle the countdown timer
  useEffect(() => {
    let timer;
    if (isResendDisabled) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            setIsResendDisabled(false);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }

    // Cleanup function to clear the timer when the component unmounts
    return () => clearInterval(timer);
  }, [isResendDisabled]);

  // Handle OTP input changes and auto-focus
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus on the next input field if a digit is entered
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle form submission to the backend API
  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    const otpCode = otp.join("");

    // Client-side validation to ensure a 6-digit code is entered
    if (otpCode.length !== 6) {
      setMessage("Please enter the complete 6-digit code.");
      setIsSuccess(false);
      setIsLoading(false);
      return;
    }

    try {
      // Send a POST request to the backend's verify endpoint
      const response = await axios.post(backendUrl + "/api/auth/verify", {
        email,
        verificationCode: otpCode,
      });

      const token = Boolean(localStorage.getItem("token"));
      console.log(token);

      if (response.status === 200) {
        setMessage("Verification successful! Redirecting...");
        setIsSuccess(true);
        if (token) {
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1500);
        } else {
          setTimeout(() => {
            window.location.href = "/change-password";
          }, 1500);
        }
      } else {
        setMessage("Verification failed. Please try again.");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Verification error:", error);
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
      setIsLoading(false);
    }
  };

  // Handle resending the verification code
  const handleResend = async () => {
    setMessage("");
    setIsLoading(true);

    try {
      // Send a POST request to the backend's resend endpoint
      const response = await axios.post(backendUrl + "/api/auth/resend", {
        email,
      });

      if (response.status === 200) {
        setMessage("New verification code sent to your email!");
        setIsSuccess(true);
        // Reset the countdown timer
        setCountdown(60);
        setIsResendDisabled(true);
      } else {
        setMessage("Failed to resend code. Please try again.");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Resend code error:", error);
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
      setIsLoading(false);
    }
  };

  // Handle message display timeout
  setTimeout(() => {
    setMessage("");
  }, 1400);

  return (
    <div className="card">
      <div className="card2">
        <form className="form" onSubmit={handleVerify}>
          <p id="heading">Verify Your Account</p>
          <p className="subheading">
            A 6-digit code has been sent to your email address.
          </p>
          <div className="otp-input-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e.target, index)}
                onFocus={(e) => e.target.select()}
                ref={(el) => (inputRefs.current[index] = el)}
                className="otp-input-field"
              />
            ))}
          </div>
          {/* Message Display */}
          {message && (
            <p className={`message ${isSuccess ? "success" : "error"}`}>
              {message}
            </p>
          )}
          <button className="button1" type="submit" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify Account"}
          </button>
          <button
            className="button3"
            type="button"
            onClick={handleResend}
            disabled={isResendDisabled || isLoading}
          >
            <FontAwesomeIcon icon={faSyncAlt} />
            {isResendDisabled
              ? ` Resend code in ${countdown}s`
              : " Resend Code"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
