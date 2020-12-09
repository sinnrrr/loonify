package config

import (
	"net/smtp"
	"os"
)

var (
	MailAuth = smtp.PlainAuth(
		"",
		os.Getenv("SMTP_USER"),
		os.Getenv("SMTP_PASS"),
		os.Getenv("SMTP_HOST"),
	)

	MailFrom        = os.Getenv("SMTP_FROM")
	MailHostAddress = os.Getenv("SMTP_HOST") + ":" + os.Getenv("SMTP_PORT")
)
