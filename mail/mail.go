package mail

import (
	"context"
	"fmt"
	"loonify/config"
	"loonify/db/redis"
	"math/rand"
	"net/smtp"
	"os"
	"strconv"
	"time"
)

func Send(subject string, to string, body string) error {
	return smtp.SendMail(
		os.Getenv("MAIL_HOST")+":"+os.Getenv("MAIL_PORT"),
		config.MailOptions,
		os.Getenv("MAIL_FROM_ADDRESS"),
		[]string{to},
		[]byte(fmt.Sprintf("Subject: %s\r\n\n%s\n", subject, body)),
	)
}

func SendVerificationCode(email string) error {
	var code = ""
	for i := 0; i < 6; i++ {
		code = code + strconv.Itoa(rand.Intn(10))
	}

	err := redis.Client.Set(context.Background(), email, code, 2 * time.Hour).Err()
	if err != nil {
		return err
	}

	return Send("Verification code", email, code)
}

func ResendVerificationCode(email string) error {
	code, err := redis.Client.Get(context.Background(), email).Result()
	if err != nil {
		return err
	}

	return Send("Verification code", email, code)
}