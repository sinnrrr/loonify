package main

import (
	"github.com/labstack/echo-contrib/prometheus"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"log"
	"os"
)

const PREFIX = "--->"

func init() {
	f, err := os.OpenFile("loonify.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	logFatal(err)

	defer f.Close()

	log.SetOutput(f)
}

func main() {
	// router configuration
	e := echo.New()

	// router middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Pre(middleware.AddTrailingSlash())

	p := prometheus.NewPrometheus("echo", nil)
	p.Use(e)

	// setting up connection to db
	client := NewDB()

	InitRoutes(e, client)

	// starting router
	e.Logger.Fatal(e.Start(":" + os.Getenv("PORT")))
}

func logFatal(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
