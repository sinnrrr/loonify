package push

import (
	"fmt"
	"github.com/appleboy/go-fcm"
	"os"
)

var client = Connect()

func Connect() *fcm.Client {
	client, err := fcm.NewClient(os.Getenv("FCM_TOKEN"))
	if err != nil {
		panic(err)
	}

	fmt.Println(os.Getenv("PREFIX") + "Connection to FCM established successfully")

	return client
}

func Create(to string, data map[string]interface{}) *fcm.Message {
	msg := &fcm.Message{
		To: to,
		Data: data,
	}

	return msg
}

func Send(to string, data map[string]interface{}) (*fcm.Response, error) {
	return client.Send(Create(to, data))
}

func SendCreated(msg *fcm.Message) (*fcm.Response, error) {
	return client.Send(msg)
}