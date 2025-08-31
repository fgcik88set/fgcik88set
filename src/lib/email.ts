import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendWelcomeEmail = async (email: string, name: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "FGC Ikot Ekpene Class of 1988 <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to FGC Ikot Ekpene Class of 1988 Alumni Portal",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to FGC Ikot Ekpene Alumni Portal</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #121212; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0c347d 0%, #1e40af 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: #f7e707; margin: 0; font-size: 28px; font-weight: bold;">
              Federal Government College Ikot Ekpene
            </h1>
            <p style="color: #f7e707; margin: 10px 0 0 0; font-size: 18px; font-weight: 600;">
              Class of 1988 Alumni Portal
            </p>
          </div>
          
          <div style="background: #ffffff; padding: 40px 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #0c347d; margin-top: 0; font-size: 24px;">
              Welcome to Our Alumni Community, ${name}!
            </h2>
            
            <p style="margin-bottom: 20px; font-size: 16px;">
              We're thrilled to have you join the Federal Government College Ikot Ekpene Class of 1988 Alumni Portal. 
              Your registration has been successfully completed!
            </p>
            
            <div style="background: #f8fafc; padding: 25px; border-radius: 8px; border-left: 4px solid #f7e707; margin: 25px 0;">
              <h3 style="color: #0c347d; margin-top: 0; font-size: 18px;">What you can do now:</h3>
              <ul style="margin: 15px 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Make secure payments for alumni dues</li>
                <li style="margin-bottom: 8px;">Register for upcoming events and reunions</li>
                <li style="margin-bottom: 8px;">Contribute to our welfare fund</li>
                <li style="margin-bottom: 8px;">Connect with fellow classmates</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXTAUTH_URL}/auth/login" 
                 style="background: #0c347d; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
                Login to Your Account
              </a>
            </div>
            
            <p style="font-size: 14px; color: #64748b; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              If you have any questions or need assistance, please don't hesitate to contact us.
              <br><br>
              Best regards,<br>
              <strong style="color: #0c347d;">FGC Ikot Ekpene Class of 1988 Alumni Association</strong>
            </p>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error("Welcome email error:", error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Welcome email error:", error)
    return { success: false, error }
  }
}

export const sendPasswordResetEmail = async (email: string, name: string, resetToken: string) => {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`

  try {
    const { data, error } = await resend.emails.send({
      from: "FGC Ikot Ekpene Class of 1988 <onboarding@resend.dev>",
      to: [email],
      subject: "Reset Your Password - FGC Ikot Ekpene Alumni Portal",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #121212; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0c347d 0%, #1e40af 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: #f7e707; margin: 0; font-size: 28px; font-weight: bold;">
              Federal Government College Ikot Ekpene
            </h1>
            <p style="color: #f7e707; margin: 10px 0 0 0; font-size: 18px; font-weight: 600;">
              Class of 1988 Alumni Portal
            </p>
          </div>
          
          <div style="background: #ffffff; padding: 40px 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #0c347d; margin-top: 0; font-size: 24px;">
              Password Reset Request
            </h2>
            
            <p style="margin-bottom: 20px; font-size: 16px;">
              Hello ${name},
            </p>
            
            <p style="margin-bottom: 20px; font-size: 16px;">
              We received a request to reset your password for your FGC Ikot Ekpene Alumni Portal account. 
              If you didn't make this request, you can safely ignore this email.
            </p>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 25px 0;">
              <p style="margin: 0; font-size: 14px; color: #92400e;">
                <strong>Security Notice:</strong> This password reset link will expire in 1 hour for your security.
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background: #0c347d; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; font-size: 16px;">
                Reset Your Password
              </a>
            </div>
            
            <p style="font-size: 14px; color: #64748b; margin-top: 30px;">
              If the button above doesn't work, you can copy and paste this link into your browser:
              <br>
              <a href="${resetUrl}" style="color: #0c347d; word-break: break-all;">${resetUrl}</a>
            </p>
            
            <p style="font-size: 14px; color: #64748b; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              If you continue to have problems, please contact our support team.
              <br><br>
              Best regards,<br>
              <strong style="color: #0c347d;">FGC Ikot Ekpene Class of 1988 Alumni Association</strong>
            </p>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error("Password reset email error:", error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Password reset email error:", error)
    return { success: false, error }
  }
}
