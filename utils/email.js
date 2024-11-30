import nodemailer from "nodemailer";
import { getRecipientsFromDB } from "../controller/subscribeController.js";

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 25,
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
    from: 'flora@email.com',
    to: to.email,
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

export const sendEmailToAll = async (flower) => {
    try {
      // Fetch recipients from the database
      const recipients = await getRecipientsFromDB();
  
      if (recipients.length === 0) {
        console.log("No recipients found.");
        return;
      }
  
      // Send email to all recipients
      recipients.forEach(async (email) => {
        try {
          await transporter.sendMail({
            from: '"Flower Shop" <flora@mail.com>',
            to: email,
            subject: `New Flower Added: ${flower.name}`,
            text: `A new flower, ${flower.name}, has been added to our shop!`,
            html: `<h1>New Flower: ${flower.name}</h1><p>${flower.description}</p><p>Price: $${flower.price}</p>`,
          });
          console.log(`Notification sent to ${email}`);
        } catch (error) {
          console.error(`Error sending email to ${email}:`, error);
        }
      });
    } catch (error) {
      console.error("Error sending emails:", error); 
    }
  };
  
