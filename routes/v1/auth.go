package v1

import (
	"github.com/labstack/echo/v4"
	"loonify/api/v1/auth"
)

func AuthGroup(v1Group *echo.Group) {
	authGroup := v1Group.Group("/auth")

	authGroup.POST("/login/", auth.LogIn)
	authGroup.POST("/signup/", auth.SignUp)
}
