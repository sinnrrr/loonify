package v1

import (
	"github.com/Kamva/mgm/v3"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"loonify/models"
	"net/http"
)

/*GetUsers handler*/
func QueryUsers() echo.HandlerFunc {
	return func(c echo.Context) error {
		var user []models.User

		err := mgm.Coll(&models.User{}).SimpleFind(&user, bson.D{})
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}

		return c.JSON(http.StatusOK, user)
	}
}

/*CreateUser handler*/
func CreateUser() echo.HandlerFunc {
	return func(c echo.Context) error {
		user := new(models.User)

		if err := c.Bind(user); err != nil {
			return c.JSON(http.StatusUnprocessableEntity, err)
		}

		if err := c.Validate(user); err != nil {
			return c.JSON(http.StatusUnprocessableEntity, err)
		}

		err := mgm.Coll(user).Create(user)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}

		return c.JSON(http.StatusOK, user)
	}
}

func ReadUser() echo.HandlerFunc {
	return func(c echo.Context) error {
		user := &models.User{}
		coll := mgm.Coll(user)

		_ = coll.FindByID(c.Param("id"), user)

		return c.JSON(http.StatusOK, user)
	}
}

func UpdateUser() echo.HandlerFunc {
	return func(c echo.Context) error {
		user := &models.User{}
		coll := mgm.Coll(user)

		_ = coll.FindByID(c.Param("id"), user)

		if err := c.Bind(user); err != nil {
			return c.JSON(http.StatusUnprocessableEntity, err)
		}

		err := mgm.Coll(user).Update(user)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}

		return c.JSON(http.StatusOK, user)
	}
}

func DeleteUser() echo.HandlerFunc {
	return func(c echo.Context) error {
		user := &models.User{}
		coll := mgm.Coll(user)

		_ = coll.FindByID(c.Param("id"), user)

		err := mgm.Coll(user).Delete(user)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}

		return c.JSON(http.StatusOK, user)
	}
}
