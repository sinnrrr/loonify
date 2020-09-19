package categories

import (
	"github.com/Kamva/mgm/v3"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	v1 "loonify/api/v1"
	"loonify/config"
	"loonify/models"
	"net/http"
)

// Query godoc
// @Summary List categories from database
// @Tags Categories
// @Accept  json
// @Produce  json
// @Success 200 {object} models.CategoryResponse
// @Failure 500 {object} v1.DefaultResponse
// @Router /categories [get]
func Query(c echo.Context) error {
	var categories []models.Category

	err := mgm.Coll(&models.Category{}).SimpleFind(&categories, bson.D{})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusOK, v1.GoodResponseWithData(categories, "Categories were successfully retrieved"))
}

// Create godoc
// @Summary Create category
// @Description Create category using provided information
// @Tags Categories
// @Accept  json
// @Produce  json
// @Success 200 {object} models.CategoryResponse
// @Success 400 {object} v1.DefaultResponse
// @Failure 500 {object} v1.DefaultResponse
// @Router /categories [post]
func Create(c echo.Context) error {
	category := new(models.Category)

	if err := c.Bind(category); err != nil {
		return c.JSON(http.StatusBadRequest, v1.FailResponse(err.Error()))
	}

	if err := config.Validator.Struct(category); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, v1.ValidationResponse(v1.ProceedValidation(err)))
	}

	err := mgm.Coll(category).Create(category)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusCreated, v1.GoodResponseWithData(category, "Category was successfully created"))
}

// Read godoc
// @Summary Show the category
// @Description Get the category by ID
// @ID get-string-by-int
// @Tags Categories
// @Accept  json
// @Produce  json
// @Param id path int true "Category ID"
// @Success 200 {object} models.CategoryResponse
// @Router /categories/{id} [get]
func Read(c echo.Context) error {
	category := &models.Category{}
	coll := mgm.Coll(category)

	_ = coll.FindByID(c.Param("id"), category)

	return c.JSON(http.StatusOK, v1.GoodResponseWithData(category, "Category was successfully retrieved"))
}

// Update godoc
// @Summary Update concrete category
// @Description Update category information using ID
// @ID get-string-by-int
// @Tags Categories
// @Accept  json
// @Produce  json
// @Param id path int true "Category ID"
// @Success 200 {object} models.CategoryResponse
// @Failure 400 {object} v1.DefaultResponse
// @Failure 422 {object} v1.ResponseWithData
// @Failure 500 {object} v1.DefaultResponse
// @Router /categories/{id} [post]
func Update(c echo.Context) error {
	category := &models.Category{}
	coll := mgm.Coll(category)

	_ = coll.FindByID(c.Param("id"), category)

	if err := c.Bind(category); err != nil {
		return c.JSON(http.StatusBadRequest, v1.FailResponse(err.Error()))
	}

	if err := config.Validator.Struct(category); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, v1.ValidationResponse(v1.ProceedValidation(err)))
	}

	err := mgm.Coll(category).Update(category)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusOK, v1.GoodResponseWithData(category, "Category was successfully updated"))
}

// Delete godoc
// @Summary Delete concrete category
// @Description Delete category from database using ID
// @ID get-string-by-int
// @Tags Categories
// @Accept  json
// @Produce  json
// @Param id path int true "Category ID"
// @Success 200 {object} models.CategoryResponse
// @Failure 422 {object} v1.ResponseWithData
// @Failure 500 {object} v1.DefaultResponse
// @Router /categories/{id} [delete]
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
