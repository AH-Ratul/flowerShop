import { sendEmail } from "../utils/email.js";

class Subscriber {
  constructor(email) {
    this.email = email;
  }

  async update(flower) {
    // Notify this subscriber via email
    try {
      await sendEmail(this.email, flower);
      console.log(`Notification sent to ${this.email}`);
    } catch (error) {
      console.error(`Error notifying ${this.email}:`, error);
    }
  }
}

export default Subscriber;
