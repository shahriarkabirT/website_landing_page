import { transporter } from "../config/mailConfig.js"

export const sendMail = async ({ name, businessName, phone, subscriptionType, message }) => {
  if (!name || !businessName || !phone || !subscriptionType) {
    throw new Error("Missing required fields: name, businessName, phone, subscriptionType")
  }

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_USER,
    subject: `New Lead from ${businessName} - ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2 style="color: #1a1a1a; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
          New Lead Details
        </h2>
        <table style="width: 100%; margin-top: 20px;">
          <tr>
            <td style="font-weight: bold; width: 120px;">Name:</td>
            <td>${name}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Business Name:</td>
            <td>${businessName}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Phone:</td>
            <td><a href="tel:${phone}">${phone}</a></td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Subscription:</td>
            <td style="color: #2563eb; font-weight: bold; text-transform: uppercase;">${subscriptionType}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; vertical-align: top;">Message:</td>
            <td>${message ? message.replace(/\n/g, "<br>") : "No additional requirements"}</td>
          </tr>
        </table>
        <p style="color: #666; font-size: 12px; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px;">
          This email was sent from your website contact form.
        </p>
      </div>
    `,
  }

  return transporter.sendMail(mailOptions)
}

export const sendMagicLinkEmail = async (email, link) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Your Login Link",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Login to Your Account</h2>
        <p>Click the button below to sign in instantly. This link will expire in 15 minutes.</p>
        <a href="${link}" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Sign In Now</a>
        <p style="color: #666; font-size: 12px;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  }
  return transporter.sendMail(mailOptions)
}

export const sendOrderConfirmationEmail = async (email, orderDetails) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Order Received - iDokan",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-xl: 12px;">
        <h2 style="color: #2563eb; margin-bottom: 20px;">Order Received!</h2>
        <p>Hi ${orderDetails.name},</p>
        <p>Thank you for choosing <strong>iDokan</strong>. We've received your order for <strong>${orderDetails.businessName}</strong>.</p>
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; font-weight: bold; color: #64748b;">Subscription Plan:</p>
          <p style="margin: 5px 0 0 0; font-size: 18px; color: #1e293b;">${orderDetails.subscriptionType}</p>
        </div>
        <p style="background-color: #fef3c7; color: #92400e; padding: 12px; border-radius: 6px; font-weight: 500;">
          ⚠️ Please wait for confirmation from iDokan. Our team will review your order and contact you shortly.
        </p>
        <p>If you have any questions, feel free to reply to this email.</p>
        <p style="margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 20px; color: #64748b; font-size: 14px;">
          Best Regards,<br>Team iDokan
        </p>
      </div>
    `,
  }
  return transporter.sendMail(mailOptions)
}

export const sendOrderNotificationToAdmin = async (orderDetails) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_RECEIVER || process.env.MAIL_USER,
    subject: `New Order: ${orderDetails.businessName} - ${orderDetails.subscriptionType}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2 style="color: #1a1a1a; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
          New Order Details
        </h2>
        <table style="width: 100%; margin-top: 20px;">
          <tr><td style="font-weight: bold; width: 140px;">Customer Name:</td><td>${orderDetails.name}</td></tr>
          <tr><td style="font-weight: bold;">Business Name:</td><td>${orderDetails.businessName}</td></tr>
          <tr><td style="font-weight: bold;">Email:</td><td>${orderDetails.email}</td></tr>
          <tr><td style="font-weight: bold;">Phone:</td><td><a href="tel:${orderDetails.phone}">${orderDetails.phone}</a></td></tr>
          <tr><td style="font-weight: bold;">Subscription:</td><td style="color: #2563eb; font-weight: bold; text-transform: uppercase;">${orderDetails.subscriptionType}</td></tr>
          <tr><td style="font-weight: bold;">Transaction ID:</td><td>${orderDetails.transactionId || "N/A"}</td></tr>
          <tr><td style="font-weight: bold; vertical-align: top;">Message:</td><td>${orderDetails.message ? orderDetails.message.replace(/\n/g, "<br>") : "No additional requirements"}</td></tr>
        </table>
        <p style="color: #666; font-size: 12px; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px;">
          This is an automated notification for a new order on idokans.com.
        </p>
      </div>
    `,
  }
  return transporter.sendMail(mailOptions)
}
