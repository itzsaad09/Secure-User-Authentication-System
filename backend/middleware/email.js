import transporter from "./emailConfig.js";
import { emailTemplate } from "./emailTemplate.js";

const sendVerificationCode = async (
  fname,
  lname,
  email,
  subject,
  verificationCode,
  verificationCodeExpiresAt
) => {
  const mailOptions = {
    from: '"Do not reply to this email" <info.mail.sender23@gmail.com>',
    to: email,
    subject: subject,
    html: emailTemplate
      .replace("[User Name]", `${fname} ${lname}`)
      .replace("[OTP_CODE]", verificationCode)
      .replace(
        "[OTP_VALIDITY_MINUTES]",
        Math.floor((verificationCodeExpiresAt - Date.now()) / 60000)
      ),
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendVerificationCode;
