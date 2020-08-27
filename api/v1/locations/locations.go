package locations

import (
	"github.com/Kamva/mgm/v3"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	v1 "loonify/api/v1"
	"loonify/models"
	"net/http"
)

func Query() echo.HandlerFunc {
	return func(c echo.Context) error {
		var location []models.Location

		err := mgm.Coll(&models.Location{}).SimpleFind(&location, bson.D{})
		if err != nil {
			return c.JSON(http.StatusInternalServerError, v1.Response{
				Status: "error",
				Message: err.Error(),
			})
		}

		return c.JSON(http.StatusOK, v1.Response{
			Data: location,
			Status: "success",
			Message: "Locations were successfully retrieved",
		})
	}
}

func Create() echo.HandlerFunc {
	return func(c echo.Context) error {
		location := new(models.Location)

		if err := c.Bind(location); err != nil {
			return c.JSON(http.StatusUnprocessableEntity, v1.Response{
				Status: "fail",
				Message: err.Error(),
			})
		}

		err := mgm.Coll(location).Create(location)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, v1.Response{
				Status: "error",
				Message: err.Error(),
			})
		}

		return c.JSON(http.StatusCreated, v1.Response{
			Data: location,
			Status: "success",
			Message: "Location were successfully created",
		})
	}
}

func Read() echo.HandlerFunc {
	return func(c echo.Context) error {
		location := &models.Location{}
		coll := mgm.Coll(location)

		_ = coll.FindByID(c.Param("id"), location)

		return c.JSON(http.StatusOK, v1.Response{
			Data: location,
			Status: "success",
			Message: "Location was successfully retrieved",
		})
	}
}

func Update() echo.HandlerFunc {
	return func(c echo.Context) error {
		location := &models.Location{}
		coll := mgm.Coll(location)

		_ = coll.FindByID(c.Param("id"), location)

		if err := c.Bind(location); err != nil {
			return c.JSON(http.StatusUnprocessableEntity, v1.Response{
				Status: "fail",
				Message: err.Error(),
			})
		}

		err := mgm.Coll(location).Update(location)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, v1.Response{
				Status: "error",
				Message: err.Error(),
			})
		}

		return c.JSON(http.StatusOK, v1.Response{
			Data: location,
			Status: "success",
			Message: "Location was successfully updated",
		})
	}
}

func Delete() echo.HandlerFunc {
	return func(c echo.Context) error {
		location := &models.Location{}
		coll := mgm.Coll(location)

		_ = coll.FindByID(c.Param("id"), location)

		err := mgm.Coll(location).Delete(location)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, v1.Response{
				Status: "error",
				Message: err.Error(),
			})
		}

		return c.JSON(http.StatusOK, v1.Response{
			Data: location,
			Status: "success",
			Message: "Location was successfully deleted",
		})
	}
}