package main

import (
	"fmt"
	"github.com/getsentry/sentry-go/echo"
	"github.com/go-playground/validator/v10"
	_ "github.com/joho/godotenv/autoload"
	"github.com/labstack/echo-contrib/prometheus"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"io/ioutil"
	"loonify/config"
	"loonify/db/redis"
	"loonify/routes/api"
	"loonify/routes/site"
	"os"
)

func main() {
	// Hosts
	hosts := map[string]*config.Host{}

	e := InitEcho()

	if config.IsHeroku {
		api.Init(e, config.IsHeroku)
		site.Init(e)
	} else {
		e.Any("/*", func(c echo.Context) (err error) {
			req := c.Request()
			res := c.Response()

			host := hosts[req.Host]

			if host == nil {
				err = echo.ErrNotFound
			} else {
				host.Echo.ServeHTTP(res, req)
			}

			return
		})
	}

	if !config.IsHeroku {
		//-----
		// API
		//-----
		apiEcho := echo.New()
		apiEcho.Validator = &config.CustomValidator{Validator: validator.New()}
		api.Init(apiEcho, config.IsHeroku)

		hosts["api."+os.Getenv("HOST")+":"+os.Getenv("PORT")] = &config.Host{Echo: apiEcho}

		//---------
		// Website
		//---------

		siteEcho := echo.New()
		site.Init(siteEcho)

		hosts[os.Getenv("HOST")+":"+os.Getenv("PORT")] = &config.Host{Echo: siteEcho}
	}

	LaunchApp(e)
}

func LaunchApp(e *echo.Echo) {
	p := prometheus.NewPrometheus("echo", nil)
	p.Use(e)

	redis.Connect()

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

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.Secure())
	e.Pre(middleware.AddTrailingSlash())

	e.Use(sentryecho.New(sentryecho.Options{
		Repanic: true,
	}))

	return e
}
