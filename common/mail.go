package common

import (
	"fmt"
	"net/smtp"
	"os"
)

var (
	auth = smtp.PlainAuth(
		"",
		os.Getenv("SMTP_USER"),
		os.Getenv("SMTP_PASS"),
		os.Getenv("SMTP_HOST"),
	)

	from    = os.Getenv("SMTP_FROM")
	address = os.Getenv("SMTP_HOST") + ":" + os.Getenv("SMTP_PORT")
)

// Send mail message through SMTP protocol
func SendMail(to []string, message []byte) (err error) {
	if err = smtp.SendMail(
		address,
		auth,
		from,
		to,
		message,
	); err != nil {
		Log.Error(err)
	}

	Log.Info(fmt.Sprintf("Email to %s%s%s were sent successfully", PurpleColor, to, ResetColor))
	return nil
}
