package push

import (
	"fmt"
	"github.com/appleboy/go-fcm"
	"loonify/config"
	"os"
)

var client = Connect()

func Connect() *fcm.Client {
	client, err := fcm.NewClient(os.Getenv("FCM_TOKEN"))
	if err != nil {
		panic(err)
	}

	fmt.Println(config.Prefix + "Connection to FCM established successfully")

	return client
}

func Send(to string, data map[string]interface{}) (*fcm.Response, error) {
	msg := &fcm.Message{
		To:             to,
		Data:           data,
		DryRun:         false,
		MutableContent: true,
		Priority:       "normal",
	}

	return client.Send(msg)
}

func SendWithNotification(to string, data map[string]interface{}, notification fcm.Notification) (*fcm.Response, error) {
	msg := &fcm.Message{
		To:             to,
		Data:           data,
		DryRun:         false,
		MutableContent: true,
		Priority:       "normal",
		Notification:   &notification,
	}

	return client.Send(msg)
}


func Create(to string, data map[string]interface{}) *fcm.Message {
	msg := &fcm.Message{
		To:             to,
		Data:           data,
		DryRun:         false,
		MutableContent: true,
		Priority:       "normal",
	}

	return msg
}

func CreateWithNotification(to string, data map[string]interface{}, notification fcm.Notification) *fcm.Message {
	msg := &fcm.Message{
		To:             to,
		Data:           data,
		DryRun:         false,
		MutableContent: true,
		Priority:       "normal",
		Notification:   &notification,
	}

	return msg
}