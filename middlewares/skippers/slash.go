package skippers

import "github.com/labstack/echo/v4"

func UrlForAdding(c echo.Context) bool {
	if len(c.Request().URL.String()) < 8 {
		return false
	} else if c.Request().URL.String()[:8] != "/metrics" && c.Request().URL.String()[:8] != "/swagger" {
		return false
	}

	return true
}

func UrlForRemoving(c echo.Context) bool {
	if len(c.Request().URL.String()) < 8 {
		return true
	} else if c.Request().URL.String()[:8] != "/metrics" && c.Request().URL.String()[:8] != "/swagger" {
		return true
	}

	return false
}
