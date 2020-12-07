package router

import (
	"fmt"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo-contrib/prometheus"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/swaggo/echo-swagger"
	"io/ioutil"
	_ "loonify/api"
	"loonify/common"
	"loonify/models"
	"os"
)

func RunRouter() {
	e := initRouter()

	registerRoutes(e)
	runRouter(e)
}

func OutputLogo() {
	logo, err := ioutil.ReadFile("assets/loonify.txt")
	if err != nil {
		common.Log.Panic(err)
	}

	fmt.Println(string(logo))
}

func initRouter() *echo.Echo {
	e := echo.New()

	e.Validator = &models.CustomValidator{Validator: validator.New()}
	e.HideBanner = true
	e.HidePort = true

	applyMiddlewares(e)

	registerSwagger(e)
	registerPrometheus(e)

	return e
}

func applyMiddlewares(e *echo.Echo) {
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.Secure())
	e.Use(middleware.CORS())
	e.Pre(middleware.RemoveTrailingSlash())
}

func registerSwagger(e *echo.Echo) {
	e.GET(os.Getenv("SWAGGER_PATH")+"/*", echoSwagger.WrapHandler)
}

func registerPrometheus(e *echo.Echo) {
	p := prometheus.NewPrometheus("echo", nil)
	p.Use(e)
}

func runRouter(e *echo.Echo) {
	common.Log.Info(
		"Starting " +
			common.YellowColor +
			"HTTP server" +
			common.ResetColor +
			" on port " +
			common.GreenColor + "[::]:" +
			os.Getenv("PORT") +
			common.ResetColor,
	)
	e.Logger.Fatal(e.Start(":" + os.Getenv("PORT")))
}
