import nodemailer from "nodemailer";
import "dotenv/config";
import emailContent from "./emailContent";

export default async function sendEmail(email: string, url: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 465,
    service: "yahoo",
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    debug: false,
  });

  const content = emailContent(
    url,
    "Confirm",
    "HACKATHON",
    "",
    "You requested a password change!",
    "Thank you for using our platform, to confirm password change, please click the link below"
  );

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Change Password",
    html: content,
  };

  try {
    await transporter.sendMail(mailOptions);
    return "Mail Send!";
  } catch (ex) {
    return ex;
  }
}
