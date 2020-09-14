package main

import (
	"fmt"
	"github.com/getsentry/sentry-go/echo"
	_ "github.com/joho/godotenv/autoload"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"io/ioutil"
	"loonify/routes"
	"os"
)

func main() {
	e := InitEcho()

	routes.InitRoutes(e)
	LaunchApp(e)
}

func LaunchApp(e *echo.Echo) {
	loonifile, err := ioutil.ReadFile("loonify.txt")
	if err != nil {
		panic(err)
	}

	fmt.Println(string(loonifile))

	// starting router
	e.Logger.Fatal(e.Start(":" + os.Getenv("PORT")))
}

func InitEcho() *echo.Echo {
	e := echo.New()
	e.HideBanner = true
	e.Static("/", "api/v1/welcome/favicon")

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.Secure())
	e.Pre(middleware.AddTrailingSlash())

	e.Use(sentryecho.New(sentryecho.Options{
		Repanic: true,
	}))

	return e
}
