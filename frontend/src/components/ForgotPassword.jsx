import React, { useState } from 'react';
import './ForgotPassword.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { backendUrl } from '../App'; 

const ForgotPassword = () => {
    // State to hold the email input
    const [email, setEmail] = useState("");
    // State to store feedback messages for the user
    const [message, setMessage] = useState("");
    // State to determine if the message is a success or error message
    const [isSuccess, setIsSuccess] = useState(false);
    // State to show a loading indicator on the button during API calls
    const [isLoading, setIsLoading] = useState(false);

    // Handle email input changes
    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    // Handle form submission to request password reset
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Clear previous messages
        setIsLoading(true); // Start loading
        setIsSuccess(false); // Reset success status

        // Client-side validation for email format (basic check)
        if (!email || !email.includes('@') || !email.includes('.')) {
            setMessage("Please enter a valid email address.");
            setIsSuccess(false);
            setIsLoading(false);
            return;
        }

        try {
            localStorage.setItem("email", email);
            window.location.href = "/verify";
        } catch (error) {
            console.error("Forgot password error:", error);
            // Check if the error response contains a specific message from the backend
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage("An unexpected error occurred. Please try again later.");
            }
            setIsSuccess(false);
        } finally {
            setIsLoading(false); 
        }
    };

    // Handle navigation back to the sign-in page
    const handleSignInRedirect = () => {
        window.location.href = '/signin';
    };

    return (
        <div className="card">
            <div className="card2">
                <form className="form" onSubmit={handleSubmit}>
                    <p id="heading">Forgot Password</p>
                    <p className="subheading">
                        Enter your email address to receive a password reset link.
                    </p>
                    <div className="field">
                        <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                        <input
                            type="email"
                            className="input-field"
                            placeholder="username@domain.com"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                        />
                    </div>
                    {/* Message Display */}
                    {message && (
                        <p className={`message ${isSuccess ? "success" : "error"}`}>
                            {message}
                        </p>
                    )}
                    <div className="btn">
                        <button
                            className="button1"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Sending...' : 'Get OTP'}
                        </button>
                    </div>
                    <button
                        className="button3"
                        type="button"
                        onClick={handleSignInRedirect}
                    >
                        Back to Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
