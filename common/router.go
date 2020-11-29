package common

import (
	"fmt"
	sentryecho "github.com/getsentry/sentry-go/echo"
	"github.com/labstack/echo-contrib/prometheus"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
	"io/ioutil"
	"os"
)

func Init() {
	e := InitRouter()
	OutputLogo()

	RunRouter(e)
}

func OutputLogo() {
	loonifile, err := ioutil.ReadFile("loonify.txt")
	if err != nil {
		panic(err)
	}

	fmt.Println(string(loonifile))
}

func InitRouter() *echo.Echo {
	e := echo.New()
	e.HideBanner = true

	applyMiddlewares(e)

	RegisterSentry(e)
	RegisterPrometheus(e)

	return e
}

func applyMiddlewares(e *echo.Echo) {
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.Secure())
	e.Use(middleware.CORS())
	e.Pre(middleware.RemoveTrailingSlash())
}

func RegisterSentry(e *echo.Echo) {
	e.Use(sentryecho.New(sentryecho.Options{
		Repanic: true,
	}))
}

func RegisterPrometheus(e *echo.Echo) {
	p := prometheus.NewPrometheus("echo", nil)
	p.Use(e)
}

func RunRouter(e *echo.Echo) {
	e.Logger.SetLevel(log.WARN)
	e.Logger.Fatal(e.Start(":" + os.Getenv("PORT")))
}