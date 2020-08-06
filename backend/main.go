// Package classification loonify.
//
// Documentation of our awesome API.
//
//     Schemes: http
//     Version: 0.1
//
//     Consumes:
//     - application/json
//
//     Produces:
//     - application/json
//
// swagger:meta

package main

import (
	"github.com/sinnrrr/loonify/datastore"
	"github.com/sinnrrr/loonify/graphql"
	"github.com/sinnrrr/loonify/handler"
	"github.com/sinnrrr/loonify/model"

	"log"
	"os"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	// router configuration
	e := echo.New()

	// router middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Pre(middleware.AddTrailingSlash())

	// setting up connection to db
	db, err := datastore.NewDB()
	logFatal(err)

	db.LogMode(true)
	db.AutoMigrate(&model.User{}, &model.Post{}, &model.Address{})

	defer db.Close()

	// creating new instance of graphql handler
	h, err := graphql.NewHandler(db)
	logFatal(err)

	// routes
	e.GET("/", handler.Welcome())
	e.POST("/graphql", echo.WrapHandler(h))

	users := e.Group("/users")
	users.GET("/", handler.GetUsers(db))
	users.POST("/", handler.CreateUser(db))
	users.GET("/users/:id", handler.ReadUser(db))
	users.PUT("/users/:id", handler.UpdateUser(db))
	users.DELETE("/users/:id", handler.DeleteUser(db))

	posts := e.Group("/posts")
	posts.GET("/", handler.GetPosts(db))

	// starting router
	e.Logger.Fatal(e.Start(":" + os.Getenv("PORT")))
}

func logFatal(err error) {
	if err != nil {
		log.Fatal(err)
	}
}