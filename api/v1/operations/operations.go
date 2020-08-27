package operations

import (
	"github.com/Kamva/mgm/v3"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"loonify/api/token"
	"loonify/models"
	"net/http"
)

func LogIn() echo.HandlerFunc {
	return func(c echo.Context) error {
		var result []models.User

		user := new(models.User)

		if err := c.Bind(user); err != nil {
			return c.JSON(http.StatusUnprocessableEntity, err)
		}

		//if err := c.Validate(user); err != nil {
		//	return c.JSON(http.StatusUnprocessableEntity, err)
		//}

		err := mgm.Coll(&models.User{}).SimpleFind(&result, bson.M{"email": user.Email, "password": user.Password})
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}

		if result == nil {
			return c.JSON(http.StatusUnauthorized, result)
		}

		err = token.Create(result[0].IDField.GetID().(primitive.ObjectID).Hex())
		if err != nil {
			panic(err)
		}

		return c.JSON(http.StatusOK, result[0])
	}
}

func SignUp() echo.HandlerFunc {
	return func(c echo.Context) error {
		user := new(models.User)

		if err := c.Bind(user); err != nil {
			return c.JSON(http.StatusUnprocessableEntity, err)
		}

		err := mgm.Coll(user).Create(user)
		if err != nil {
			panic(err)
		}

		err = token.Create(user.IDField.GetID().(primitive.ObjectID).Hex())
		if err != nil {
			panic(err)
		}

		return c.JSON(http.StatusOK, user)
	}	
}