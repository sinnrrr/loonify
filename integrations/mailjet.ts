import * as nodemailer from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"

export const nodemailerConfig: string | SMTPTransport | SMTPTransport.Options | undefined = {
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
}

export const mailjetIntegration = () => nodemailer.createTransport(nodemailerConfig)
