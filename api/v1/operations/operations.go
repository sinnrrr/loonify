package operations

import (
	"github.com/Kamva/mgm/v3"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
	"loonify/api/token"
	v1 "loonify/api/v1"
	"loonify/models"
	"net/http"
)

var newUserAccessLevel = 0

func LogIn() echo.HandlerFunc {
	return func(c echo.Context) error {
		var result []models.User

		user := new(models.User)

		if err := c.Bind(user); err != nil {
			return c.JSON(http.StatusUnprocessableEntity, v1.FailResponse(err))
		}

		//if err := c.Validate(user); err != nil {
		//	return c.JSON(http.StatusUnprocessableEntity, err)
		//}

		err := mgm.Coll(&models.User{}).SimpleFind(&result, bson.M{"email": user.Email})
		if err != nil {
			return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err))
		}

		if result == nil {
			return c.JSON(http.StatusUnauthorized, v1.Response{
				Status: "fail",
				Message: "There are no users with that email address",
			})
		}

		err = bcrypt.CompareHashAndPassword([]byte(result[0].Password), []byte(user.Password))
		if err != nil {
			return c.JSON(http.StatusUnauthorized, v1.Response{
				Status: "fail",
				Message: "Your password doesn't match with our records",
			})
		}
		
		return c.JSON(http.StatusOK, v1.Response{
			Data: result[0],
			Status: "success",
			Message: "User successfully logged in",
		})
	}
}

func SignUp() echo.HandlerFunc {
	return func(c echo.Context) error {
		user := new(models.User)

		if err := c.Bind(user); err != nil {
			return c.JSON(http.StatusUnprocessableEntity, v1.FailResponse(err))
		}

		//if err := c.Validate(user); err != nil {
		//	return c.JSON(http.StatusUnprocessableEntity, err)
		//}

		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			return c.JSON(http.StatusUnprocessableEntity, v1.FailResponse(err))
		}

		generatedToken, err := token.Create(user.IDField.GetID().(primitive.ObjectID).Hex(), newUserAccessLevel)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err))
		}

		user.Password = string(hashedPassword)
		user.Token = generatedToken

		err = mgm.Coll(user).Create(user)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err))
		}

		return c.JSON(http.StatusOK, v1.Response{
			Data: user,
			Status: "success",
			Message: "User successfully registered",
		})
	}	
}