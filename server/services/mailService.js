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
