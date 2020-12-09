package common

import (
	"fmt"
	"loonify/config"
	"net/smtp"
)

// Send mail message through SMTP protocol
func SendMail(to []string, message []byte) (err error) {
	if err = smtp.SendMail(
		config.MailHostAddress,
		config.MailAuth,
		config.MailFrom,
		to,
		message,
	); err != nil {
		Log.Error(err)
	}

	Log.Info(fmt.Sprintf("Email to %s%s%s were sent successfully", config.PurpleColor, to, config.ResetColor))
	return nil
}
