package v1

import (
	"github.com/Kamva/mgm/v3"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"loonify/config"
	"loonify/models"
	"net/http"
)

type CategoriesController struct{}

// Query godoc
// @Summary List categories from database
// @Tags Categories
// @Accept  json
// @Produce  json
// @Success 200 {object} models.CategoryResponse
// @Failure 500 {object} config.DefaultResponse
// @Router /categories [get]
func (CategoriesController) Query(c echo.Context) error {
	var categories []models.Category

	err := mgm.Coll(&models.Category{}).SimpleFind(&categories, bson.D{})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, config.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusOK, config.GoodResponseWithData(categories, "Categories were successfully retrieved"))
}

// Create godoc
// @Summary Create category
// @Description Create category using provided information
// @Tags Categories
// @Accept  json
// @Produce  json
// @Success 200 {object} models.CategoryResponse
// @Success 400 {object} config.DefaultResponse
// @Failure 500 {object} config.DefaultResponse
// @Router /categories [post]
func (CategoriesController) Create(c echo.Context) error {
	category := new(models.Category)

	if err := c.Bind(category); err != nil {
		return c.JSON(http.StatusBadRequest, config.FailResponse(err.Error()))
	}

	if err := config.Validator.Struct(category); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, config.ValidationResponse(config.ProceedValidation(err)))
	}

	err := mgm.Coll(category).Create(category)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, config.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusCreated, config.GoodResponseWithData(category, "Category was successfully created"))
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
func (CategoriesController) Read(c echo.Context) error {
	category := &models.Category{}
	coll := mgm.Coll(category)

	_ = coll.FindByID(c.Param("id"), category)

	return c.JSON(http.StatusOK, config.GoodResponseWithData(category, "Category was successfully retrieved"))
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
// @Failure 400 {object} config.DefaultResponse
// @Failure 422 {object} config.ResponseWithData
// @Failure 500 {object} config.DefaultResponse
// @Router /categories/{id} [post]
func (CategoriesController) Update(c echo.Context) error {
	category := &models.Category{}
	coll := mgm.Coll(category)

	_ = coll.FindByID(c.Param("id"), category)

	if err := c.Bind(category); err != nil {
		return c.JSON(http.StatusBadRequest, config.FailResponse(err.Error()))
	}

	if err := config.Validator.Struct(category); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, config.ValidationResponse(config.ProceedValidation(err)))
	}

	err := mgm.Coll(category).Update(category)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, config.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusOK, config.GoodResponseWithData(category, "Category was successfully updated"))
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
// @Failure 422 {object} config.ResponseWithData
// @Failure 500 {object} config.DefaultResponse
// @Router /categories/{id} [delete]
func (CategoriesController) Delete(c echo.Context) error {
	category := &models.Category{}
	coll := mgm.Coll(category)

	_ = coll.FindByID(c.Param("id"), category)

	err := mgm.Coll(category).Delete(category)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, config.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusOK, config.GoodResponse("Category was successfully deleted"))
}
