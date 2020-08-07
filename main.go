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
	"gitlab.com/loonify/web/model"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"log"
	"os"
)

func main() {
	// router configuration
	e := echo.New()

	// router middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Pre(middleware.AddTrailingSlash())

	// setting up connection to db
	db, err := NewDB()
	logFatal(err)

	db.LogMode(true)
	db.AutoMigrate(&model.User{}, &model.Post{}, &model.Address{})

	defer db.Close()

	InitRoutes(e, db)

	// starting router
	e.Logger.Fatal(e.Start(":" + os.Getenv("PORT")))
}

func logFatal(err error) {
	if err != nil {
		log.Fatal(err)
	}
}