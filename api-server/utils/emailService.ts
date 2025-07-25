import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);
console.log("🔐 Resend Key (should not be undefined):", process.env.RESEND_API_KEY);

// Function to send a confirmation email to users who join the waitlist
// This email thanks them for joining and informs them they are on the waitlist.

export async function sendConfirmationEmail(to: string, fullName: string) {
  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to,
      cc: process.env.EMAIL_CC,
      subject: "Welcome to Tasklane Waitlist 🎉",
      html: `
        <p>Hi ${fullName},</p>
        <p>Thank you for joining the Tasklane waitlist! You're officially on the list!</p>
        <p>We'll be in touch with updates and exclusive information about our product launch.</p>
        <p>Feel free to contact us if you have any questions or feedback, we'd love to hear from you!</p>
        <p>  </p>
        <p>Sincerely,</p>
        <p>  </p>
        <p>The Tasklane Team</p>
      `,
    });

    console.log("✅ Email sent:", data);
    return data;
  } catch (error) {
    console.error("❌ Email send error:", error);
    throw error;
  }
}

// company admin eamil inviation to create and admin user account for the company.
export async function sendAdminInviteEmail(to: string, contactName: string, companyName: string) {
  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to,
      cc: process.env.EMAIL_CC,
      subject: "Invitation to reate an admintrator user account on TaskLane",
      html: `
        <p>Hi ${contactName},</p>
        <p>T</p>
        <p>The TaskLane account for your company, <strong>${companyName}</strong> , has been activated.</p>
        <p>Please <a href="${process.env.FRONTEND_URL}/login">click here</a> to create your admin account for your organization.</p>
        <p> Please feel free to reach out if you have any questions or feedback at contact@tasklane.ai</p>
        <p>We look forward to helping you streamline your employee training and onboarding processes.</p
        <p>T</p>        
        <p>— The TaskLane Team</p>
      `,
    });

    console.log("✅ Admin invite email sent:", data);
    return data;
  } catch (error) {
    console.error("❌ Failed to send admin invite email:", error);
    throw error;
  }
}

// User invitation email by company administrator to create a tasklane user account.
export async function sendUserInviteEmail(to: string, contactName: string, companyName: string) {
  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to,
      cc: process.env.EMAIL_CC,
      subject: "Invitation to create a TaskLane user account",
      html: `
        <p>Hi ${contactName},</p>
        <p>You have been invited by your company, <strong>${companyName}</strong>, to create a TaskLane user account.</p>
        <p>Please <a href="${process.env.FRONTEND_URL}/login">click here</a> to create your account.</p>
        <p>If you have any questions or need assistance, feel free to reach out to  your company administrator.</p>
        <p>T</p>        
        <p>— The TaskLane Team</p>
      `,
    });

    console.log("✅ User invite email sent:", data);
    return data;
  } catch (error) {
    console.error("❌ Failed to send user invite email:", error);
    throw error;
  }

}

// Function to send a reminder email to users on the waitlist
// This email reminds them that they are still on the waitlist and encourages them to stay engaged
export async function sendWaitlistReminderEmail(to: string, name: string) {
  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to,
      cc: process.env.EMAIL_CC,
      subject: "Reminder: You're on the Tasklane Waitlist",
      html: `
        <p>Hi ${name},</p>
        <p>Just a quick reminder that you're on our waitlist. We're excited to bring Tasklane to you soon!</p>
        <p>If you have any questions, feel free to reply to this email.</p>
        <p>– The Tasklane Team</p>
      `,
    });
    console.log("✅ Reminder email sent:", data);
    return data;
  } catch (error) {
    console.error("❌ Failed to send waitlist reminder:", error);
    throw error;
  }
}


// Function to send an invitation email to a product owner
// This email invites them to join TaskLane as a Product Owner and provides a link to create

export async function sendProductOwnerInviteEmail(to: string, name: string, inviteLink: string) {
  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to,
      cc: process.env.EMAIL_CC,
      subject: "You're invited to join TaskLane as a Product Owner",
      html: `
        <p>Hi ${name},</p>
        <p>You've been invited to join TaskLane as a Product Owner.</p>
        <p>Please click the link below to create your account:</p>
        <p><a href="${inviteLink}">${inviteLink}</a></p>
        <p>We look forward to having you onboard!</p>
        <p>– The Tasklane Team</p>
      `,
    });

    console.log("✅ Product owner invite sent:", data);
    return data;
  } catch (error) {
    console.error("❌ Failed to send product owner invite:", error);
    throw error;
  }
}
