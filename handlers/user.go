package handlers

import (
	"github.com/labstack/echo/v4"
	"loonify/databases"
	"loonify/models"
)

func QueryUsers(c echo.Context) error {
	var users []models.User

	err := databases.PostgresClient.
		Scopes(
			databases.Paginate(
				c.QueryParam("page"),
				c.QueryParam("size"),
			),
		).
		Find(&users).
		Error
	if err != nil {
		return err //TODO
	}

	return c.JSON(200, users)
}

func Signup(c echo.Context) error {
	user := new(models.User)

	err := c.Bind(user)
	if err != nil {
		return err // TODO
	}

	//err = c.Validate(user)
	//if err != nil {
	//	return c.JSON(422, err.(validator.ValidationErrors))
	//}

	err = databases.PostgresClient.Create(&user).Error
	if err != nil {
		return err
	}

	return c.JSON(200, user)
}

//func ReadUser(c echo.Context) {
//	userID, err := c.
//}
