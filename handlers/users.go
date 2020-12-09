package handlers

import (
	"github.com/labstack/echo/v4"
	"loonify/common"
	"loonify/databases"
	"loonify/models"
	"net/http"
	"strconv"
)

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
