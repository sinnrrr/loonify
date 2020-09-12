package push

import (
	"fmt"
	"github.com/appleboy/go-fcm"
	"github.com/labstack/echo/v4"
	"loonify/api/push"
	"loonify/api/v1"
	"net/http"
)

func SendPush(c echo.Context) error {
	msg := new(fcm.Message)

	if err := c.Bind(msg); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, v1.FailResponse(err.Error()))
	}

	response, err := push.SendCreated(msg)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(fmt.Sprintf("%#v\n", response)))
	}

	return c.JSON(http.StatusOK, v1.GoodResponse("Push sent successfully"))
}
