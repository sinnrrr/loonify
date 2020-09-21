package v1

import (
	"github.com/Kamva/mgm/v3"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"loonify/config"
	"loonify/models"
	"net/http"
)

type UsersController struct {}

// Query godoc
// @Summary List users
// @Description Get all users from database
// @Tags Users
// @Accept  json
// @Produce  json
// @Success 200 {object} models.UserResponse
// @Failure 500 {object} config.DefaultResponse
// @Router /users [get]
func (UsersController) Query(c echo.Context) error {
	var users []models.User

	err := mgm.Coll(&models.User{}).SimpleFind(&users, bson.D{})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, config.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusOK, config.GoodResponseWithData(users, "Users were successfully retrieved"))
}

// Read godoc
// @Summary Show the user
// @Description Get the user by ID
// @ID get-string-by-int
// @Tags Users
// @Accept  json
// @Produce  json
// @Param id path int true "User ID"
// @Success 200 {object} models.UserResponse
// @Router /users/{id} [get]
func (UsersController) Read(c echo.Context) error {
	user := &models.User{}
	coll := mgm.Coll(user)

	_ = coll.FindByID(c.Param("id"), user)

	return c.JSON(http.StatusOK, config.GoodResponseWithData(user, "User was successfully retrieved"))
}

// Update godoc
// @Summary Update concrete user
// @Description Update user information using user ID
// @ID get-string-by-int
// @Tags Users
// @Accept  json
// @Produce  json
// @Param id path int true "User ID"
// @Success 200 {object} models.UserResponse
// @Failure 400 {object} config.DefaultResponse
// @Failure 422 {object} config.ResponseWithData
// @Failure 500 {object} config.DefaultResponse
// @Router /users/{id} [post]
func (UsersController) Update(c echo.Context) error {
	user := &models.User{}
	coll := mgm.Coll(user)

	_ = coll.FindByID(c.Param("id"), user)

	if err := c.Bind(user); err != nil {
		return c.JSON(http.StatusBadRequest, config.FailResponse(err.Error()))
	}

	if err := config.Validator.Struct(user); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, config.ValidationResponse(config.ProceedValidation(err)))
	}

	err := mgm.Coll(user).Update(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, config.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusCreated, config.GoodResponseWithData(user, "User was successfully updated"))
}

// Delete godoc
// @Summary Delete concrete user
// @Description Delete user from database using user ID
// @ID get-string-by-int
// @Tags Users
// @Accept  json
// @Produce  json
// @Param id path int true "User ID"
// @Success 200 {object} models.UserResponse
// @Failure 422 {object} config.ResponseWithData
// @Failure 500 {object} config.DefaultResponse
// @Router /users/{id} [delete]
func (UsersController) Delete(c echo.Context) error {
	user := &models.User{}
	coll := mgm.Coll(user)

	_ = coll.FindByID(c.Param("id"), user)

	err := mgm.Coll(user).Delete(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, config.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusOK, config.GoodResponseWithData(user, "User was successfully retrieved"))
}