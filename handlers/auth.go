package handlers

import (
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
	"loonify/common"
	"loonify/databases"
	"loonify/models"
	"net/http"
)

func Signup(c echo.Context) (err error) {
	user := new(models.User)

	if err = c.Bind(user); err != nil {
		return echo.NewHTTPError(
			http.StatusUnprocessableEntity,
			err,
		)
	}

	if err = c.Validate(user); err != nil {
		return echo.NewHTTPError(
			http.StatusUnprocessableEntity,
			err,
		)
	}

	if err = databases.Create(&user); err != nil {
		return echo.NewHTTPError(
			http.StatusUnprocessableEntity,
			"User with this email already exists",
		)
	}

	return common.GoodResponse(
		c,
		user,
		http.StatusCreated,
		"User was successfully created",
	)
}

func Login(c echo.Context) (err error) {
	user := new(models.User)

	if err = c.Bind(user); err != nil {
		return echo.NewHTTPError(
			http.StatusUnprocessableEntity,
			err,
		)
	}

	if err = c.Validate(user); err != nil {
		return echo.NewHTTPError(
			http.StatusUnprocessableEntity,
			err,
		)
	}

	rawPassword := user.Password

	if err = databases.FindOneWithCondition(
		&models.User{
			Email: user.Email,
		},
		&user,
	); err != nil {
		return echo.NewHTTPError(
			http.StatusUnprocessableEntity,
			"There are no records of this email in our database",
		)
	}

	if err = bcrypt.CompareHashAndPassword(
		[]byte(*user.Password),
		[]byte(*rawPassword),
	); err != nil {
		return echo.NewHTTPError(
			http.StatusUnprocessableEntity,
			"Password doesn't match",
		)
	}

	return common.GoodResponse(
		c,
		user,
		"User were successfully logged in",
	)
}
