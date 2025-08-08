import React, { useState } from 'react';
import './ChangePassword.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { backendUrl } from '../App'; 

const ChangePassword = () => {
    // State to hold the new password and confirmation
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmNewPassword: "",
    });
    // State to manage the visibility of the password fields
    const [showPassword, setShowPassword] = useState(false);
    // State to store feedback messages for the user
    const [message, setMessage] = useState("");
    // State to determine if the message is a success or error message
    const [isSuccess, setIsSuccess] = useState(false);
    // State to show a loading indicator on the button during API calls
    const [isLoading, setIsLoading] = useState(false);

    // Handle input changes and update state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Toggle the visibility of the password fields
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    // Simple client-side password strength check (for demonstration)
    const isStrongPassword = (password) => {
        // This is a basic check. You should align this with your backend's strength requirements.
        return password.length >= 8 && 
               /[A-Z]/.test(password) && 
               /[a-z]/.test(password) && 
               /[0-9]/.test(password) && 
               /[^A-Za-z0-9]/.test(password);
    };

    // Handle form submission to change the password
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Clear previous messages
        setIsLoading(true); // Start loading
        setIsSuccess(false); // Reset success status

        // Client-side validation
        if (!formData.newPassword || !formData.confirmNewPassword) {
            setMessage("Please fill in all fields.");
            setIsSuccess(false);
            setIsLoading(false);
            return;
        }

        if (formData.newPassword !== formData.confirmNewPassword) {
            setMessage("New passwords do not match.");
            setIsSuccess(false);
            setIsLoading(false);
            return;
        }

        if (!isStrongPassword(formData.newPassword)) {
            setMessage("Password is not strong enough. It must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
            setIsSuccess(false);
            setIsLoading(false);
            return;
        }

        const email = localStorage.getItem("email");
        const password = formData.newPassword;
        const confirmPassword = formData.confirmNewPassword;

        try {
            const response = await axios.post(backendUrl + "/api/auth/recover", {
                email: email,
                password,
                confirmPassword
            });

            if (response.status === 200) {
                setMessage("Your password has been successfully changed! Redirecting to login...");
                setIsSuccess(true);
                // Redirect to login page after a short delay
                setTimeout(() => {
                    handleLoginRedirect();
                }, 2000);
            } else {
                setMessage("Failed to change password. Please try again.");
                setIsSuccess(false);
            }
        } catch (error) {
            console.error("Change password error:", error);
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage("An unexpected error occurred. Please try again later.");
            }
            setIsSuccess(false);
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    // Handle navigation back to the sign-in page
    const handleLoginRedirect = () => {
        window.location.href = '/signin';
    };

    return (
        <div className="card">
            <div className="card2">
                <form className="form" onSubmit={handleSubmit}>
                    <p id="heading">Change Password</p>
                    <p className="subheading">
                        Enter your new password below.
                    </p>
                    {/* New Password Field */}
                    <div className="field password-field">
                        <FontAwesomeIcon icon={faLock} className="input-icon" />
                        <input
                            type={showPassword ? "text" : "password"}
                            className="input-field"
                            placeholder="New Password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                        />
                        <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            className="password-toggle-icon"
                            onClick={handleTogglePassword}
                        />
                    </div>
                    {/* Confirm New Password Field */}
                    <div className="field password-field">
                        <FontAwesomeIcon icon={faLock} className="input-icon" />
                        <input
                            type={showPassword ? "text" : "password"}
                            className="input-field"
                            placeholder="Confirm New Password"
                            name="confirmNewPassword"
                            value={formData.confirmNewPassword}
                            onChange={handleChange}
                            required
                        />
                        <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            className="password-toggle-icon"
                            onClick={handleTogglePassword}
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
                            {isLoading ? 'Changing...' : 'Change Password'}
                        </button>
                    </div>
                    <button
                        className="button3"
                        type="button"
                        onClick={handleLoginRedirect}
                    >
                        Back to Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
