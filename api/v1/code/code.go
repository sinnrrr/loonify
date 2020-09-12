package code

import (
	"context"
	"github.com/labstack/echo/v4"
	"loonify/api/v1"
	"loonify/db/redis"
	"loonify/mail"
	"loonify/models"
	"net/http"
)

func Resend(c echo.Context) error {
	user := &models.User{}
	if err := c.Bind(user); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, v1.FailResponse(err.Error()))
	}

	err := mail.SendVerificationCode(user.Email)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusOK, v1.GoodResponse("Verification code sent successfully"))
}

func Verify(c echo.Context) error {
	condition, err := redis.Client.Exists(context.Background(), c.QueryParam("code")).Result()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err.Error()))
	}

	if condition != 1 {
		return c.JSON(http.StatusNotFound, "The code has been expired or there are no authorization requests for this email")
	}

	return c.JSON(http.StatusOK, v1.GoodResponse("Code has been validated"))
}
