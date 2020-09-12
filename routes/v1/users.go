package v1

import (
	"github.com/labstack/echo/v4"
	"loonify/api/token"
	"loonify/api/v1/users"
)

func UsersGroup(v1Group *echo.Group) {
	usersGroup := v1Group.Group("/users")

	usersGroup.GET("/", users.Query, token.InitMiddleware("user", "query"))
	//usersGroup.POST("/", users.Create, token.InitMiddleware("user", "create"))
	usersGroup.GET("/:id/", users.Read)
	usersGroup.PUT("/:id/", users.Update, token.InitMiddleware("user", "update"))
	usersGroup.DELETE("/:id/", users.Delete, token.InitMiddleware("user", "delete"))

	usersGroup.GET("/me/", users.Me, token.InitMiddleware("user", "read"))
}
