import React, { useState, useEffect } from 'react';
import './Dashboard.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { backendUrl } from '../App'; 
const Dashboard = () => {
    const [userName, setUserName] = useState(""); 
    // useEffect hook to fetch user data when the component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            const email = localStorage.getItem('email');
            const token = localStorage.getItem('token');

            // If no email is found, log an error and potentially redirect the user
            if (!email) {
                console.error("No email found in local storage. User might not be logged in.");
                window.location.href = "/signin";
                return;
            }

            try {
                // Make an API call to your backend to fetch user details
                // Include params for the email and potentially an Authorization header if your API is protected
                const response = await axios.get(backendUrl + `/api/auth/display`, {
                    params: { email },
                    // Uncomment and provide a valid token if your backend requires authentication
                    // headers: {
                    //     Authorization: `Bearer ${token}` 
                    // }
                });

                // Check if the API call was successful (status code 200)
                if (response.status === 200) {
                    const isVerified = response.data.isVerified;
                    if(isVerified === true) {
                        const userData = response.data;
                        setUserName(`${userData.fname} ${userData.lname}`);
                    } else {
                        window.location.href = "/verify";
                    }
                } else {
                    console.error("Failed to fetch user data:", response.data.message);
                }
            } catch (error) {
                // Catch any network errors or server-side errors
                console.error("Error fetching user data:", error.response ? error.response.data : error.message);
            }
        };

        fetchUserData();
    }, []);

    // Handle logout functionality
    const handleLogout = () => {
        // Clear authentication tokens and user data from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        // Redirect the user to the sign-in page
        window.location.href = "/signin";
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <div className="dashboard-header">
                    <h1 className="welcome-heading">Welcome,</h1>
                    {/* Display the fetched user name */}
                    <p className="user-name">{userName}!</p>
                </div>
                <div className="dashboard-content">
                    <p className="dashboard-message">
                        You have successfully logged in to your personalized dashboard.
                        Here you can access all your features and settings.
                    </p>
                    <button className="logout-button" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
