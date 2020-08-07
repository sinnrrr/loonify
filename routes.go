package main

import (
	"github.com/jinzhu/gorm"
	"github.com/labstack/echo"
	"gitlab.com/loonify/web/graphql"
	"gitlab.com/loonify/web/handler"
	"path/filepath"
)

func InitRoutes(e *echo.Echo, db *gorm.DB) {
	// creating new instance of graphql handler
	h, err := graphql.NewHandler(db)
	logFatal(err)

	path, err := filepath.Abs("frontend/dist/index.html")
	logFatal(err)

	e.File("/", path)
	e.File("/office/", path)

	// routes
	api := e.Group("/api")

	api.GET("/", handler.Welcome())
	api.POST("/graphql", echo.WrapHandler(h))

	users := api.Group("/users")
	users.GET("/", handler.GetUsers(db))
	users.POST("/", handler.CreateUser(db))
	users.GET("/users/:id", handler.ReadUser(db))
	users.PUT("/users/:id", handler.UpdateUser(db))
	users.DELETE("/users/:id", handler.DeleteUser(db))

	posts := api.Group("/posts")
	posts.GET("/", handler.GetPosts(db))
}