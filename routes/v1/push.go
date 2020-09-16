package v1

import (
	"github.com/labstack/echo/v4"
	"loonify/api/v1/push"
)

func PushGroup(v1Group *echo.Group) {
	pushGroup := v1Group.Group("/push")

	pushGroup.POST("/", push.SendPush)
}
