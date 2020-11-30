package common

import (
	"fmt"
	sentryecho "github.com/getsentry/sentry-go/echo"
	"github.com/labstack/echo-contrib/prometheus"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
	"github.com/swaggo/echo-swagger"
	"io/ioutil"
	_ "loonify/api"
	"os"
)

func InitRouter() {
	e := initRouter()
	OutputLogo()

	RunRouter(e)
}

func OutputLogo() {
	logo, err := ioutil.ReadFile("assets/loonify.txt")
	if err != nil {
		panic(err)
	}

	fmt.Println(string(logo))
}

func initRouter() *echo.Echo {
	e := echo.New()
	e.HideBanner = true

	applyMiddlewares(e)

	RegisterSentry(e)
	RegisterSwagger(e)
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

func RegisterSwagger(e *echo.Echo) {
	e.GET(os.Getenv("SWAGGER_PATH")+"/*", echoSwagger.WrapHandler)
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
