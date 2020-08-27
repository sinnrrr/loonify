package categories

import (
	"github.com/Kamva/mgm/v3"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"loonify/models"
	"net/http"
)

func Query() echo.HandlerFunc {
	return func(c echo.Context) error {
		var category []models.Category

		err := mgm.Coll(&models.Category{}).SimpleFind(&category, bson.D{})
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}

		return c.JSON(http.StatusOK, category)
	}
}

func Create() echo.HandlerFunc {
	return func(c echo.Context) error {
		category := new(models.Category)

		if err := c.Bind(category); err != nil {
			return c.JSON(http.StatusUnprocessableEntity, err)
		}

		err := mgm.Coll(category).Create(category)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}

		return c.JSON(http.StatusOK, category)
	}
}

func Read() echo.HandlerFunc {
	return func(c echo.Context) error {
		category := &models.Category{}
		coll := mgm.Coll(category)

		_ = coll.FindByID(c.Param("id"), category)

		return c.JSON(http.StatusOK, category)
	}
}

func Update() echo.HandlerFunc {
	return func(c echo.Context) error {
		category := &models.Category{}
		coll := mgm.Coll(category)

		_ = coll.FindByID(c.Param("id"), category)

		if err := c.Bind(category); err != nil {
			return c.JSON(http.StatusUnprocessableEntity, err)
		}

		err := mgm.Coll(category).Update(category)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}

		return c.JSON(http.StatusOK, category)
	}
}

func Delete() echo.HandlerFunc {
	return func(c echo.Context) error {
		category := &models.Category{}
		coll := mgm.Coll(category)

		_ = coll.FindByID(c.Param("id"), category)

		err := mgm.Coll(category).Delete(category)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}

		return c.JSON(http.StatusOK, category)
	}
}
