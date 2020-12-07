package handlers

import (
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
	"loonify/common"
	"loonify/databases"
	"loonify/models"
	"net/http"
)

func QueryUsers(c echo.Context) (err error) {
	var users []models.User

	if err = databases.PostgresClient.
		Scopes(
			databases.Paginate(
				c.QueryParam("page"),
				c.QueryParam("size"),
			),
		).
		Find(&users).
		Error; err != nil {
		common.Log.Error(err)
		return //TODO
	}

	return c.JSON(http.StatusOK, users)
}

func Signup(c echo.Context) (err error) {
	user := new(models.User)

	if err = c.Bind(user); err != nil {
		common.Log.Error(err)
		return // TODO
	}

	if err = c.Validate(user); err != nil {
		common.Log.Error(err)
		return // TODO
	}

	if err = databases.PostgresClient.
		Create(&user).
		Error; err != nil {
		common.Log.Error(err)
		return // TODO
	}

	return c.JSON(http.StatusCreated, user)
}

func Login(c echo.Context) (err error) {
	user := new(models.User)

	if err = c.Bind(user); err != nil {
		common.Log.Error(err)
		return // TODO
	}

	rawPassword := user.Password

	if err = c.Validate(user); err != nil {
		common.Log.Error(err)
		return // TODO
	}

	if err = databases.PostgresClient.
		Where(
			&models.User{
				Email: user.Email,
			},
		).First(&user).
		Error; err != nil {
		common.Log.Error(err)
		return c.JSON(http.StatusUnprocessableEntity, "No email in database") // TODO
	}

	if err = bcrypt.CompareHashAndPassword(
		[]byte(*user.Password),
		[]byte(*rawPassword),
	); err != nil {
		common.Log.Error(err)
		return c.JSON(http.StatusUnprocessableEntity, "Password doesn't match") // TODO
	}

	return c.JSON(http.StatusOK, user)
}
