package users

import (
	"github.com/Kamva/mgm/v3"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	v1 "loonify/api/v1"
	"loonify/models"
	"net/http"
)

/*GetUsers handler*/
func Query() echo.HandlerFunc {
	return func(c echo.Context) error {
		var user []models.User

		err := mgm.Coll(&models.User{}).SimpleFind(&user, bson.D{})
		if err != nil {
			return c.JSON(http.StatusInternalServerError, v1.Response{
				Status: "error",
				Message: err.Error(),
			})
		}

		return c.JSON(http.StatusOK, v1.Response{
			Data: user,
			Status: "success",
			Message: "Users were successfully retrieved",
		})
	}
}

/*CreateUser handler*/
func Create() echo.HandlerFunc {
	return func(c echo.Context) error {
		user := new(models.User)

		if err := c.Bind(user); err != nil {
			return c.JSON(http.StatusUnprocessableEntity, v1.Response{
				Status: "fail",
				Message: err.Error(),
			})
		}

		//if err := c.Validate(user); err != nil {
		//	return c.JSON(http.StatusUnprocessableEntity, err)
		//}

		err := mgm.Coll(user).Create(user)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, v1.Response{
				Status: "error",
				Message: err.Error(),
			})
		}

		return c.JSON(http.StatusCreated, v1.Response{
			Data: user,
			Status: "success",
			Message: "User was successfully created",
		})
	}
}

func Read() echo.HandlerFunc {
	return func(c echo.Context) error {
		user := &models.User{}
		coll := mgm.Coll(user)

		_ = coll.FindByID(c.Param("id"), user)

		return c.JSON(http.StatusOK, v1.Response{
			Data: user,
			Status: "success",
			Message: "User was successfully retrieved",
		})
	}
}

func Update() echo.HandlerFunc {
	return func(c echo.Context) error {
		user := &models.User{}
		coll := mgm.Coll(user)

		_ = coll.FindByID(c.Param("id"), user)

		if err := c.Bind(user); err != nil {
			return c.JSON(http.StatusUnprocessableEntity, v1.Response{
				Status: "fail",
				Message: err.Error(),
			})
		}

		err := mgm.Coll(user).Update(user)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, v1.Response{
				Status: "error",
				Message: err.Error(),
			})
		}

		return c.JSON(http.StatusCreated, v1.Response{
			Data: user,
			Status: "success",
			Message: "User was successfully updated",
		})
	}
}

func Delete() echo.HandlerFunc {
	return func(c echo.Context) error {
		user := &models.User{}
		coll := mgm.Coll(user)

		_ = coll.FindByID(c.Param("id"), user)

		err := mgm.Coll(user).Delete(user)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, v1.Response{
				Status: "error",
				Message: err.Error(),
			})
		}

		return c.JSON(http.StatusOK, v1.Response{
			Data: user,
			Status: "success",
			Message: "User was successfully retrieved",
		})
	}
}