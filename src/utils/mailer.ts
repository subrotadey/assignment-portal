import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import nodemailer, { SentMessageInfo } from "nodemailer";

// Define types for the function parameters
type EmailOptions = {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
};

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: EmailOptions): Promise<SentMessageInfo> => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    // TODO: Configure Mail for usage

    if (emailType === "VERIFY") {
      const updateUser = await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
        }
      });

      console.log("Updated User for verify", updateUser);
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
        }
      });
    }

    const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "35e5ae7c509a65",
    pass: "2e2cd320b4e885"
  }
});

    const mailOptions = {
      from: "subrotadey540@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: `
      <p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Here</a> to ${emailType === "VERIFY" ? "Verify Your email" : "Reset Your password"}
      or copy and paste the link below in your browser.
      <br>
      ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </P>
      `,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
