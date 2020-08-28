package categories

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
		var category []models.Category

		err := mgm.Coll(&models.Category{}).SimpleFind(&category, bson.D{})
		if err != nil {
			return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err))
		}

		return c.JSON(http.StatusOK, v1.Response{
			Data: category,
			Status: "success",
			Message: "Categories were successfully retrieved",
		})
	}
}

func Create() echo.HandlerFunc {
	return func(c echo.Context) error {
		category := new(models.Category)

		if err := c.Bind(category); err != nil {
			return c.JSON(http.StatusUnprocessableEntity, v1.FailResponse(err))
		}

		err := mgm.Coll(category).Create(category)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err))
		}

		return c.JSON(http.StatusCreated, v1.Response{
			Data: category,
			Status: "success",
			Message: "Category was successfully created",
		})
	}
}

func Read() echo.HandlerFunc {
	return func(c echo.Context) error {
		category := &models.Category{}
		coll := mgm.Coll(category)

		_ = coll.FindByID(c.Param("id"), category)

		return c.JSON(http.StatusOK, v1.Response{
			Data: category,
			Status: "success",
			Message: "Category was successfully retrieved",
		})
	}
}

func Update() echo.HandlerFunc {
	return func(c echo.Context) error {
		category := &models.Category{}
		coll := mgm.Coll(category)

		_ = coll.FindByID(c.Param("id"), category)

		if err := c.Bind(category); err != nil {
			return c.JSON(http.StatusUnprocessableEntity, v1.FailResponse(err))
		}

		err := mgm.Coll(category).Update(category)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err))
		}

		return c.JSON(http.StatusOK, v1.Response{
			Data: category,
			Status: "success",
			Message: "Category was successfully updated",
		})
	}
}

func Delete() echo.HandlerFunc {
	return func(c echo.Context) error {
		category := &models.Category{}
		coll := mgm.Coll(category)

		_ = coll.FindByID(c.Param("id"), category)

		err := mgm.Coll(category).Delete(category)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err))
		}

		return c.JSON(http.StatusOK, v1.Response{
			Data: category,
			Status: "success",
			Message: "Category was successfully deleted",
		})
	}
}
