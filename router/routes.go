package router

import (
	"github.com/labstack/echo/v4"
	"loonify/handlers"
)

// Registering all routes
func registerRoutes(e *echo.Echo) {
	usersRoutes(e)
}

// Registering users routes
func usersRoutes(e *echo.Echo) {
	e.GET("/users", handlers.QueryUsers)
	e.POST("/auth/signup", handlers.Signup)
	e.POST("/auth/login", handlers.Login)
}
