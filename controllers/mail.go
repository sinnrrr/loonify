package controllers

import (
	"context"
	"fmt"
	"loonify/config"
	"loonify/db"
	"math/rand"
	"net/smtp"
	"os"
	"strconv"
	"time"
)

type MailController struct {}

func (MailController) Send(subject string, to string, body string) error {
	return smtp.SendMail(
		os.Getenv("MAIL_HOST")+":"+os.Getenv("MAIL_PORT"),
		config.MailOptions,
		os.Getenv("MAIL_FROM_ADDRESS"),
		[]string{to},
		[]byte(fmt.Sprintf("Subject: %s\r\n\n%s\n", subject, body)),
	)
}

func (MailController) SendVerificationCode(email string) error {
	var code = ""
	for i := 0; i < 6; i++ {
		code = code + strconv.Itoa(rand.Intn(10))
	}

	err := db.RedisClient.Set(context.Background(), email, code, 2 * time.Hour).Err()
	if err != nil {
		return err
	}

	return MailController{}.Send("Verification code", email, code)
}

func (MailController) ResendVerificationCode(email string) error {
	code, err := db.RedisClient.Get(context.Background(), email).Result()
	if err != nil {
		return err
	}

	return MailController{}.Send("Verification code", email, code)
}