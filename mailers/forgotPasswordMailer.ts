/* TODO - You need to add a mailer integration in `integrations/` and import here.
 *
 * The integration file can be very simple. Instantiate the email client
 * and then export it. That way you can import here and anywhere else
 * and use it straight away.
 */
import { mailjetIntegration } from "integrations/mailjet"
import previewEmail from "preview-email"

type ResetPasswordMailer = {
  to: string
  token: string
}

export function forgotPasswordMailer({ to, token }: ResetPasswordMailer) {
  // In production, set APP_ORIGIN to your production server origin
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN
  const resetUrl = `${origin}/reset/password?token=${token}`

  const msg = {
    from: "dimasoltusyuk@gmail.com",
    to,
    subject: "Інструкція з відновлення паролю",
    html: `
      <h1>Відновити пароль</h1>

      <a href="${resetUrl}">
        Натисніть тут, щоб встановити новий пароль
      </a>
    `,
  }

  return {
    async send() {
      if (process.env.NODE_ENV === "production") {
        // throw new Error("No production email implementation in mailers/forgotPasswordMailer")

        const transporter = mailjetIntegration()

        transporter.sendMail(msg)
      } else {
        // Preview email in the browser
        await previewEmail(msg)
      }
    },
  }
}
