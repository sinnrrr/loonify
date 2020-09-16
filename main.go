// @title Loonify API
// @version 1.0
package main

import (
	"fmt"
	"github.com/getsentry/sentry-go/echo"
	_ "github.com/joho/godotenv/autoload"
	"github.com/labstack/echo-contrib/prometheus"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	echoSwagger "github.com/swaggo/echo-swagger"
	"io/ioutil"
	_ "loonify/docs"
	"loonify/routes"
	"net/http"
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

	e.GET("/" + os.Getenv("SWAGGER_PATH"), RedirectToSwagger)
	e.GET(fmt.Sprintf("/%s/*", os.Getenv("SWAGGER_PATH")), echoSwagger.WrapHandler)

	e.Pre(middleware.AddTrailingSlashWithConfig(
		middleware.TrailingSlashConfig{
			Skipper: urlSkipperForAdd,
		},
	))

	e.Pre(middleware.RemoveTrailingSlashWithConfig(
		middleware.TrailingSlashConfig{
			Skipper: urlSkipperForRemove,
		},
	))

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.Secure())
	e.Use(middleware.CORS())

	e.Use(sentryecho.New(sentryecho.Options{
		Repanic: true,
	}))

	p := prometheus.NewPrometheus("echo", nil)
	p.Use(e)

	return e
}

func urlSkipperForAdd(c echo.Context) bool {
	if len(c.Request().URL.String()) < 8 {
		return false
	} else if c.Request().URL.String()[:8] != "/metrics" && c.Request().URL.String()[:8] != "/swagger" {
		return false
	}

	return true
}

func urlSkipperForRemove(c echo.Context) bool {
	if len(c.Request().URL.String()) < 8 {
		return true
	} else if c.Request().URL.String()[:8] != "/metrics" && c.Request().URL.String()[:8] != "/swagger" {
		return true
	}

	return false
}


func RedirectToSwagger(c echo.Context) error {
	return c.Redirect(http.StatusPermanentRedirect, "/swagger/index.html")
}
