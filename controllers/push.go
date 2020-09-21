package controllers

import (
	"github.com/appleboy/go-fcm"
	"loonify/db"
)

type PushController struct{}

func (PushController) Send(to string, data map[string]interface{}) (*fcm.Response, error) {
	return db.FCMClient.Send(PushController{}.Create(to, data))
}

func (PushController) SendWithNotification(to string, data map[string]interface{}, notification fcm.Notification) (*fcm.Response, error) {
	return db.FCMClient.Send(PushController{}.CreateWithNotification(to, data, notification))
}

func (PushController) Create(to string, data map[string]interface{}) *fcm.Message {
	msg := &fcm.Message{
		To:             to,
		Data:           data,
		DryRun:         false,
		MutableContent: true,
		Priority:       "normal",
	}

	return msg
}

func (PushController) CreateWithNotification(to string, data map[string]interface{}, notification fcm.Notification) *fcm.Message {
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
