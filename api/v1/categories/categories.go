package categories

import (
	"github.com/Kamva/mgm/v3"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	v1 "loonify/api/v1"
	"loonify/models"
	"net/http"
)

func Query(c echo.Context) error {
	var categories []models.Category

	err := mgm.Coll(&models.Category{}).SimpleFind(&categories, bson.D{})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusOK, v1.GoodResponseWithData(categories, "Categories were successfully retrieved"))
}

func Create(c echo.Context) error {
	category := new(models.Category)

	if err := c.Bind(category); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, v1.FailResponse(err.Error()))
	}

	err := mgm.Coll(category).Create(category)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusCreated, v1.GoodResponseWithData(category, "Category was successfully created"))
}

func Read(c echo.Context) error {
	category := &models.Category{}
	coll := mgm.Coll(category)

	_ = coll.FindByID(c.Param("id"), category)

	return c.JSON(http.StatusOK, v1.GoodResponseWithData(category, "Category was successfully retrieved"))
}

func Update(c echo.Context) error {
	category := &models.Category{}
	coll := mgm.Coll(category)

	_ = coll.FindByID(c.Param("id"), category)

	if err := c.Bind(category); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, v1.FailResponse(err.Error()))
	}

	err := mgm.Coll(category).Update(category)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusOK, v1.GoodResponseWithData(category, "Category was successfully updated"))
}

func Delete(c echo.Context) error {
	category := &models.Category{}
	coll := mgm.Coll(category)

	_ = coll.FindByID(c.Param("id"), category)

	err := mgm.Coll(category).Delete(category)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusOK, v1.GoodResponse("Category was successfully deleted"))
}
