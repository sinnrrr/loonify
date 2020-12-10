package handlers

import (
	"github.com/labstack/echo/v4"
	"loonify/common"
	"loonify/databases"
	"loonify/models"
	"net/http"
	"strconv"
)

// Query users from database
func QueryUsers(c echo.Context) (err error) {
	var users []models.User

	page, _ := strconv.Atoi(c.QueryParam("page"))
	pageSize, _ := strconv.Atoi(c.QueryParam("page"))

	if err = databases.Query(
		&users,
		page,
		pageSize,
	); err != nil {
		return echo.NewHTTPError(
			http.StatusInternalServerError,
			"Database out",
		)
	}

	return common.GoodResponse(
		c,
		users,
		"Users were successfully queried",
	)
}

func ReadUser(c echo.Context) (err error) {
	var (
		user   = new(models.User)
		userID int
	)

	userID, _ = strconv.Atoi(c.Param("id"))
	if userID < 0 {
		return echo.NewHTTPError(http.StatusBadRequest)
	}

	if err = databases.Read(&user, userID); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError)
	}

	return common.GoodResponse(
		c,
		user,
		"User was successfully retrieved",
	)
}

func UpdateUser(c echo.Context) (err error) {
	var (
		user   = new(models.User)
		oldUser = new(models.User)
		userID int
	)

	userID, _ = strconv.Atoi(c.Param("id"))
	if userID < 0 {
		return echo.NewHTTPError(http.StatusBadRequest)
	}

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

	if err = databases.Read(&oldUser, userID); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError)
	}

	user.Token = oldUser.Token
	oldUser = user

	if err = databases.Save(&oldUser); err != nil {
		return echo.NewHTTPError(
			http.StatusUnprocessableEntity,
			"User with this email already exists",
		)
	}

	return common.GoodResponse(
		c,
		user,
		"User was updated successfully",
	)
}

//func DeleteUser(c echo.Context) (err error) {
//
//}
