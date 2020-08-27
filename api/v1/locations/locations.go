package locations

import (
	"github.com/Kamva/mgm/v3"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"loonify/models"
	"net/http"
)

func Query() echo.HandlerFunc {
	return func(c echo.Context) error {
		var location []models.Location

		err := mgm.Coll(&models.Location{}).SimpleFind(&location, bson.D{})
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}

		return c.JSON(http.StatusOK, location)
	}
}

func Create() echo.HandlerFunc {
	return func(c echo.Context) error {
		location := new(models.Location)

		if err := c.Bind(location); err != nil {
			return c.JSON(http.StatusUnprocessableEntity, err)
		}

		err := mgm.Coll(location).Create(location)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}

		return c.JSON(http.StatusOK, location)
	}
}

func Read() echo.HandlerFunc {
	return func(c echo.Context) error {
		location := &models.Location{}
		coll := mgm.Coll(location)

		_ = coll.FindByID(c.Param("id"), location)

		return c.JSON(http.StatusOK, location)
	}
}

func Update() echo.HandlerFunc {
	return func(c echo.Context) error {
		location := &models.Location{}
		coll := mgm.Coll(location)

		_ = coll.FindByID(c.Param("id"), location)

		if err := c.Bind(location); err != nil {
			return c.JSON(http.StatusUnprocessableEntity, err)
		}

		err := mgm.Coll(location).Update(location)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}

		return c.JSON(http.StatusOK, location)
	}
}

func Delete() echo.HandlerFunc {
	return func(c echo.Context) error {
		location := &models.Location{}
		coll := mgm.Coll(location)

		_ = coll.FindByID(c.Param("id"), location)

		err := mgm.Coll(location).Delete(location)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}

		return c.JSON(http.StatusOK, location)
	}
}