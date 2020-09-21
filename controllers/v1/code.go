package v1

import (
	"context"
	"github.com/Kamva/mgm/v3"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"loonify/config"
	"loonify/controllers"
	"loonify/db"
	"loonify/models"
	"net/http"
)

type CodeController struct{}

// Resend godoc
// @Summary Resend email with code
// @Description Make a an email letter with authorization code again
// @Tags Auth
// @Accept  json
// @Produce  json
// @Success 200 {object} config.DefaultResponse
// @Success 400 {object} config.DefaultResponse
// @Success 404 {object} config.DefaultResponse
// @Failure 422 {object} config.ResponseWithData
// @Failure 500 {object} config.DefaultResponse
// @Router /code/resend [post]
func (CodeController) Resend(c echo.Context) error {
	user := &models.User{}
	coll := mgm.Coll(user)

	if err := c.Bind(user); err != nil {
		return c.JSON(http.StatusBadRequest, config.FailResponse(err.Error()))
	}

	err := controllers.MailController{}.ResendVerificationCode(user.Email)
	if err != nil {
		condition, err := coll.CountDocuments(context.Background(), bson.M{"email": user.Email})
		if err != nil {
			return c.JSON(http.StatusInternalServerError, config.ErrorResponse(err.Error()))
		}

		if condition != 1 {
			return c.JSON(http.StatusNotFound, config.FailResponse("User with this email does not exist"))
		}

		err = controllers.MailController{}.SendVerificationCode(user.Email)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, config.ErrorResponse(err.Error()))
		}

		return c.JSON(http.StatusOK, config.GoodResponse("Verification code sent successfully"))
	}

	return c.JSON(http.StatusOK, config.GoodResponse("Verification code resent successfully"))
}

// Verify godoc
// @Summary Verify code provided in email
// @Description Make a verification of authorization code, that was sent in letter
// @Tags Auth
// @Accept  json
// @Produce  json
// @Success 200 {object} config.DefaultResponse
// @Success 400 {object} config.DefaultResponse
// @Success 401 {object} config.DefaultResponse
// @Failure 422 {object} config.ResponseWithData
// @Router /code/verify [post]
func (CodeController) Verify(c echo.Context) error {
	code := &models.Code{}
	if err := c.Bind(code); err != nil {
		return c.JSON(http.StatusBadRequest, config.FailResponse(err.Error()))
	}

	rightCode, err := db.RedisClient.Get(context.Background(), code.Email).Result()
	if err != nil {
		return c.JSON(http.StatusUnauthorized, config.FailResponse("The code has been expired or there are no authorization requests for this email"))
	}

	if code.Code != rightCode {
		return c.JSON(http.StatusUnauthorized, config.FailResponse("The code doesn't seem to be valid"))
	}

	db.RedisClient.Del(context.Background(), code.Email)

	return c.JSON(http.StatusOK, config.GoodResponse("Code has been validated"))
}
