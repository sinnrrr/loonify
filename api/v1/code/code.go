package code

import (
	"context"
	"github.com/Kamva/mgm/v3"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"loonify/api/v1"
	"loonify/db/redis"
	"loonify/mail"
	"loonify/models"
	"net/http"
)

func Resend(c echo.Context) error {
	user := &models.User{}
	coll := mgm.Coll(user)

	if err := c.Bind(user); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, v1.FailResponse(err.Error()))
	}

	err := mail.ResendVerificationCode(user.Email)
	if err != nil {
		condition, err := coll.CountDocuments(context.Background(), bson.M{"email": user.Email})
		if err != nil {
			return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err.Error()))
		}

		if condition != 1 {
			return c.JSON(http.StatusNotFound, v1.FailResponse("User with this email does not exist"))
		}

		err = mail.SendVerificationCode(user.Email)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err.Error()))
		}

		return c.JSON(http.StatusOK, v1.GoodResponse("Verification code sent successfully"))
	}

	return c.JSON(http.StatusOK, v1.GoodResponse("Verification code resent successfully"))
}

func Verify(c echo.Context) error {
	code := &models.Code{}
	if err := c.Bind(code); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, v1.FailResponse(err.Error()))
	}

	rightCode, err := redis.Client.Get(context.Background(), code.Email).Result()
	if err != nil {
		return c.JSON(http.StatusUnauthorized, v1.FailResponse("The code has been expired or there are no authorization requests for this email"))
	}

	if code.Code != rightCode {
		return c.JSON(http.StatusUnauthorized, v1.FailResponse("The code doesn't seem to be valid"))
	}

	redis.Client.Del(context.Background(), code.Email)

	return c.JSON(http.StatusOK, v1.GoodResponse("Code has been validated"))
}
