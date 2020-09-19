package push

import (
	"fmt"
	"github.com/appleboy/go-fcm"
	"github.com/labstack/echo/v4"
	"loonify/api/push"
	"loonify/api/v1"
	"net/http"
)

// SendPush godoc
// @Summary Send a push
// @Description Send a push to the concrete device using FCM
// @Tags Push
// @Accept  json
// @Produce  json
// @Success 200 {object} models.UserResponse
// @Failure 400 {object} v1.DefaultResponse
// @Router /push [post]
func SendPush(c echo.Context) error {
	var (
		pushModel = new(fcm.Message)
		err       error
	)

	if err := c.Bind(pushModel); err != nil {
		return c.JSON(http.StatusBadRequest, v1.FailResponse(err.Error()))
	}

	if pushModel.Notification != nil {
		_, err = push.SendWithNotification(pushModel.To, pushModel.Data, *pushModel.Notification)
	} else {
		_, err = push.Send(pushModel.To, pushModel.Data)
	}

	if err != nil {
		return c.JSON(http.StatusBadRequest, v1.ErrorResponse(fmt.Sprintf(err.Error())))
	}

	return c.JSON(http.StatusOK, v1.GoodResponse("Push sent successfully"))
}
