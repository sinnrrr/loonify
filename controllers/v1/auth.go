package v1

import (
	"github.com/Kamva/mgm/v3"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
	"loonify/config"
	"loonify/controllers"
	"loonify/models"
	"net/http"
)

type AuthController struct{}

//var newUserAccessLevel = 0

// LogIn godoc
// @Summary Make a login operation
// @Description Make a login attempt
// @Tags Auth
// @Accept  json
// @Produce  json
// @Success 200 {object} models.UserResponse
// @Success 400 {object} config.DefaultResponse
// @Failure 401 {object} config.DefaultResponse
// @Failure 422 {object} config.ResponseWithData
// @Failure 500 {object} config.DefaultResponse
// @Router /auth/login [post]
func (AuthController) LogIn(c echo.Context) error {
	var result []models.User

	user := new(models.User)

	if err := c.Bind(user); err != nil {
		return c.JSON(http.StatusBadRequest, config.FailResponse(err.Error()))
	}

	if err := config.Validator.Struct(user); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, config.ValidationResponse(config.ProceedValidation(err)))
	}

	err := mgm.Coll(&models.User{}).SimpleFind(&result, bson.M{"email": user.Email})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, config.ErrorResponse(err.Error()))
	}

	if result == nil {
		return c.JSON(http.StatusUnauthorized, config.FailResponse("There are no users with that email address"))
	}

	err = bcrypt.CompareHashAndPassword([]byte(result[0].Password), []byte(user.Password))
	if err != nil {
		return c.JSON(http.StatusUnauthorized, config.FailResponse("Your password doesn't match with our records"))
	}

	return c.JSON(http.StatusOK, config.GoodResponseWithData(result[0], "User successfully logged in"))
}

// SignUp godoc
// @Summary Make a registration operation
// @Description Make a sign up attempt
// @Tags Auth
// @Accept  json
// @Produce  json
// @Success 200 {object} models.UserResponse
// @Failure 422 {object} config.ResponseWithData
// @Failure 500 {object} config.DefaultResponse
// @Router /auth/signup [post]
func (AuthController) SignUp(c echo.Context) error {
	user := new(models.User)

	if err := c.Bind(user); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, config.FailResponse(err.Error()))
	}

	if err := config.Validator.Struct(user); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, config.ValidationResponse(config.ProceedValidation(err)))
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, config.FailResponse(err.Error()))
	}

	user.ID = primitive.NewObjectID()
	user.Password = string(hashedPassword)

	err = controllers.MailController{}.SendVerificationCode(user.Email)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, config.ErrorResponse(err.Error()))
	}

	//generatedToken, err := token.Create(user.ID.Hex(), newUserAccessLevel)
	//if err != nil {
	//	return c.JSON(http.StatusInternalServerError, server.ErrorResponse(err.Error()))
	//}
	//
	//user.Token = generatedToken

	err = mgm.Coll(user).Create(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, config.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusOK, config.GoodResponseWithData(user, "User successfully registered"))
}
