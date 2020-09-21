package v1

import (
	"github.com/Kamva/mgm/v3"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"loonify/config"
	"loonify/models"
	"net/http"
)

type LocationsController struct {}

// Query godoc
// @Summary List locations from database
// @Tags Locations
// @Accept  json
// @Produce  json
// @Success 200 {object} models.LocationResponse
// @Failure 500 {object} config.DefaultResponse
// @Router /locations [get]
func (LocationsController) Query(c echo.Context) error {
	var locations []models.Location

	err := mgm.Coll(&models.Location{}).SimpleFind(&locations, bson.D{})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, config.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusOK, config.GoodResponseWithData(locations, "Locations were successfully retrieved"))
}

// Create godoc
// @Summary Create location
// @Description Create location using provided information
// @Tags Locations
// @Accept  json
// @Produce  json
// @Success 200 {object} models.LocationResponse
// @Failure 400 {object} config.DefaultResponse
// @Failure 500 {object} config.DefaultResponse
// @Router /locations [post]
func (LocationsController) Create(c echo.Context) error {
	location := new(models.Location)

	if err := c.Bind(location); err != nil {
		return c.JSON(http.StatusBadRequest, config.FailResponse(err.Error()))
	}

	err := mgm.Coll(location).Create(location)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, config.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusCreated, config.GoodResponseWithData(location, "Location were successfully created"))
}

// Read godoc
// @Summary Show the location
// @Description Get the location by ID
// @ID get-string-by-int
// @Tags Locations
// @Accept  json
// @Produce  json
// @Param id path int true "Location ID"
// @Success 200 {object} models.CategoryResponse
// @Router /locations/{id} [get]
func (LocationsController) Read(c echo.Context) error {
	location := &models.Location{}
	coll := mgm.Coll(location)

	_ = coll.FindByID(c.Param("id"), location)

	return c.JSON(http.StatusOK, config.GoodResponseWithData(location, "Location was successfully retrieved"))
}

// Update godoc
// @Summary Update concrete location
// @Description Update location information using ID
// @ID get-string-by-int
// @Tags Locations
// @Accept  json
// @Produce  json
// @Param id path int true "Location ID"
// @Success 200 {object} models.LocationResponse
// @Failure 400 {object} config.DefaultResponse
// @Failure 422 {object} config.ResponseWithData
// @Failure 500 {object} config.DefaultResponse
// @Router /locations/{id} [post]
func (LocationsController) Update(c echo.Context) error {
	location := &models.Location{}
	coll := mgm.Coll(location)

	_ = coll.FindByID(c.Param("id"), location)

	if err := c.Bind(location); err != nil {
		return c.JSON(http.StatusBadRequest, config.FailResponse(err.Error()))
	}

	if err := config.Validator.Struct(location); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, config.ValidationResponse(config.ProceedValidation(err)))
	}

	err := mgm.Coll(location).Update(location)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, config.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusOK, config.GoodResponseWithData(location, "Location was successfully updated"))
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
func (LocationsController) Delete(c echo.Context) error {
	location := &models.Location{}
	coll := mgm.Coll(location)

	_ = coll.FindByID(c.Param("id"), location)

	err := mgm.Coll(location).Delete(location)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, config.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusOK, config.GoodResponse("Location was successfully deleted"))
}
