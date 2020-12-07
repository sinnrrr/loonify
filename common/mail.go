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

func SendMail(to []string, message []byte) (err error) {
	err =  smtp.SendMail(
		address,
		auth,
		from,
		to,
		message,
	)
	if err != nil {
		Log.Panic(err)
	}

	Log.Info(fmt.Sprintf("Email to %s%s%s were sent successfully", PurpleColor, to, ResetColor))
	return
}
