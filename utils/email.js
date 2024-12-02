import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Connection Error:", error);
  } else {
    console.log("SMTP Transporter is ready to send emails.");
  }
});

export const sendEmail = async (to, flower) => {
  const mailOptions = {
    from: "flora@email.com",
    to,
    subject: `New Flower Added: ${flower.name}`,
    text: `A new flower, ${flower.name}, has been added to the store!\n\nDescription: ${flower.description}\nPrice: $${flower.price}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
  }
};
