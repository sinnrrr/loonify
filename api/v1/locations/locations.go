package locations

import (
	"github.com/Kamva/mgm/v3"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	v1 "loonify/api/v1"
	"loonify/models"
	"net/http"
)

func Query(c echo.Context) error {
	var locations []models.Location

	err := mgm.Coll(&models.Location{}).SimpleFind(&locations, bson.D{})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusOK, v1.GoodResponseWithData(locations, "Locations were successfully retrieved"))
}

func Create(c echo.Context) error {
	location := new(models.Location)

	if err := c.Bind(location); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, v1.FailResponse(err.Error()))
	}

	err := mgm.Coll(location).Create(location)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusCreated, v1.GoodResponseWithData(location, "Location were successfully created"))
}

func Read(c echo.Context) error {
	location := &models.Location{}
	coll := mgm.Coll(location)

	_ = coll.FindByID(c.Param("id"), location)

	return c.JSON(http.StatusOK, v1.GoodResponseWithData(location, "Location was successfully retrieved"))
}

func Update(c echo.Context) error {
	location := &models.Location{}
	coll := mgm.Coll(location)

	_ = coll.FindByID(c.Param("id"), location)

	if err := c.Bind(location); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, v1.FailResponse(err.Error()))
	}

	err := mgm.Coll(location).Update(location)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusOK, v1.GoodResponseWithData(location, "Location was successfully updated"))
}

func Delete(c echo.Context) error {
	location := &models.Location{}
	coll := mgm.Coll(location)

	_ = coll.FindByID(c.Param("id"), location)

	err := mgm.Coll(location).Delete(location)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusOK, v1.GoodResponse("Location was successfully deleted"))
}
