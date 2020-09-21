package v1

import (
	"fmt"
	"github.com/appleboy/go-fcm"
	"github.com/labstack/echo/v4"
	"loonify/config"
	"loonify/controllers"
	"net/http"
)

type PushController struct {}

// SendPush godoc
// @Summary Send a push
// @Description Send a push to the concrete device using FCM
// @Tags Push
// @Accept  json
// @Produce  json
// @Success 200 {object} models.UserResponse
// @Failure 400 {object} config.DefaultResponse
// @Router /push [post]
func (PushController) SendPush(c echo.Context) error {
	var (
		pushModel = new(fcm.Message)
		err       error
	)

	if err := c.Bind(pushModel); err != nil {
		return c.JSON(http.StatusBadRequest, config.FailResponse(err.Error()))
	}

	if pushModel.Notification != nil {
		_, err = controllers.PushController{}.SendWithNotification(pushModel.To, pushModel.Data, *pushModel.Notification)
	} else {
		_, err = controllers.PushController{}.Send(pushModel.To, pushModel.Data)
	}

	if err != nil {
		return c.JSON(http.StatusBadRequest, config.ErrorResponse(fmt.Sprintf(err.Error())))
	}

	return c.JSON(http.StatusOK, config.GoodResponse("Push sent successfully"))
}
