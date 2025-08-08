/**
 * @fileoverview This module exports a single HTML string for a clean and responsive
 * one-time password (OTP) email template.
 *
 * It is designed to be used in a Node.js or similar backend environment where
 * the placeholders (e.g., [OTP_CODE]) can be replaced with dynamic data before sending.
 */

export const emailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your One-Time Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-top: 4px solid #007bff; /* Primary brand color */
            overflow: hidden;
        }
        .header {
            padding: 30px;
            text-align: center;
            border-bottom: 1px solid #eee;
        }
        .header h1 {
            margin: 0;
            color: #007bff;
            font-size: 24px;
        }
        .content {
            padding: 30px;
            text-align: center;
        }
        .content p {
            font-size: 16px;
            line-height: 1.6;
        }
        .otp-code {
            font-size: 40px;
            font-weight: bold;
            color: #28a745; /* Success green for emphasis */
            margin: 25px 0;
            padding: 15px 30px;
            background-color: #e9f7ef; /* Light green background */
            border-radius: 8px;
            display: inline-block;
            letter-spacing: 5px;
        }
        .warning {
            color: #dc3545; /* Red for warnings */
            font-weight: bold;
            margin-top: 20px;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #777;
            border-top: 1px solid #eee;
        }
        .footer p {
            margin: 5px 0;
        }
        .footer a {
            color: #007bff;
            text-decoration: none;
        }
        @media only screen and (max-width: 600px) {
            .email-container {
                border-radius: 0;
                margin: 0;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Your One-Time Password</h1>
        </div>
        <div class="content">
            <p>Hello [User Name],</p>
            <p>You recently requested a One-Time Password (OTP) for your account with **[Your Service/App Name]**.</p>
            <p>Please use the following OTP to complete your action:</p>
            <div class="otp-code">[OTP_CODE]</div>
            <p>This OTP is valid for [OTP_VALIDITY_MINUTES] minutes.</p>
            <p class="warning">**Do not share this code with anyone.**</p>
            <p>If you did not request this OTP, please ignore this email or contact our support team immediately.</p>
        </div>
        <div class="footer">
            <p>&copy; [Current Year] [Your Company Name]. All rights reserved.</p>
            <p>[Your Company Address, if applicable]</p>
            <p>
                <a href="[Your Website URL]">Visit our website</a> | 
                <a href="[Link to Privacy Policy]">Privacy Policy</a> |
                <a href="[Link to Support Page]">Support</a>
            </p>
        </div>
    </div>
</body>
</html>
`;
