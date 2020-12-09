package router

import (
	"github.com/labstack/echo/v4"
	"loonify/common"
	"loonify/databases"
	"loonify/models"
)

func ValidateToken(
	token string,
	c echo.Context,
) (
	validated bool,
	err error,
) {
	var user models.User

	if err = databases.FindWithCondition(
		&models.User{
			Token: &token,
		},
		&user,
	); err != nil {
		common.Log.Error(err)
		return false, err
	}

	return true, err
}
