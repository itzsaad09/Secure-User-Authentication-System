import React from 'react';
import './LandingPage.css'; // Import the CSS file

const LandingPage = () => {
    // Handle navigation to the Sign In page
    const handleSignInRedirect = () => {
        window.location.href = '/signin';
    };

    // Handle navigation to the Sign Up page
    const handleSignUpRedirect = () => {
        window.location.href = '/register';
    };

    return (
        <div className="landing-container">
            <div className="landing-card">
                <h1 className="landing-heading">Welcome to Our App</h1>
                <p className="landing-subheading">Your journey begins here.</p>
                <div className="landing-buttons">
                    <button className="landing-button primary" onClick={handleSignInRedirect}>
                        Sign In
                    </button>
                    <button className="landing-button secondary" onClick={handleSignUpRedirect}>
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
