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
    "Confirm email",
    "WELCOME",
    "IN THE HACKATHON",
    "Thank you for registering in our platform",
    "To confirm your account just click this link below"
  );

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Confirm Email",
    html: content,
  };

  try {
    await transporter.sendMail(mailOptions);
    return "Mail Send!";
  } catch (ex) {
    return ex;
  }
}
