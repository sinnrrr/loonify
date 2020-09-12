package v1

import (
	"github.com/labstack/echo/v4"
	"loonify/api/token"
	"loonify/api/v1/categories"
)

func CategoriesGroup(v1Group *echo.Group) {
	categoriesGroup := v1Group.Group("/categories")

	categoriesGroup.GET("/", categories.Query)
	categoriesGroup.POST("/", categories.Create, token.InitMiddleware("category", "query"))
	categoriesGroup.GET("/:id/", categories.Read)
	categoriesGroup.PUT("/:id/", categories.Update, token.InitMiddleware("category", "update"))
	categoriesGroup.DELETE("/:id/", categories.Delete, token.InitMiddleware("category", "delete"))
}
