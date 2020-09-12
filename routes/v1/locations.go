package v1

import (
	"github.com/labstack/echo/v4"
	"loonify/api/token"
	"loonify/api/v1/locations"
)

func LocationsGroup(v1Group *echo.Group) {
	locationsGroup := v1Group.Group("/locations")

	locationsGroup.GET("/", locations.Query, token.InitMiddleware("location", "query"))
	locationsGroup.POST("/", locations.Create, token.InitMiddleware("location", "create"))
	locationsGroup.GET("/:id/", locations.Read)
	locationsGroup.PUT("/:id/", locations.Update, token.InitMiddleware("location", "update"))
	locationsGroup.DELETE("/:id/", locations.Delete, token.InitMiddleware("location", "delete"))
}
