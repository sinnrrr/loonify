package router

import (
	"errors"
	"github.com/labstack/echo/v4"
	"loonify/common"
	"loonify/databases"
	"loonify/models"
)

// Validating unique API token
func ValidateToken(
	token string,
	c echo.Context,
) (
	validated bool,
	err error,
) {
	var user models.User

	if err = databases.FindOneWithCondition(
		&models.User{
			Token: &token,
		},
		&user,
	); err != nil {
		common.Log.Error(err)
		return false, errors.New("this token hasn't been registered in database")
	}

	return true, nil
}
