package router

import (
	"fmt"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo-contrib/prometheus"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	echoLogrus "github.com/neko-neko/echo-logrus/v2"
	"github.com/neko-neko/echo-logrus/v2/log"
	"github.com/swaggo/echo-swagger"
	"io/ioutil"
	_ "loonify/api"
	"loonify/common"
	"loonify/models"
	"os"
)

var echoValidator = validator.New()

// Initializing, configuring and running router
func RunRouter() {
	e := initRouter()

	registerRoutes(e)
	runRouter(e)
}

// Print logo in terminal
func OutputLogo() {
	logo, err := ioutil.ReadFile("assets/loonify.txt")
	if err != nil {
		common.Log.Panic(err)
	}

	fmt.Println(string(logo))
}

// Initialize configured router instance
func initRouter() *echo.Echo {
	e := echo.New()

	applyLogger(e)
	applyMiddlewares(e)
	applyErrorHandler(e)

	registerValidator(e)
	registerSwagger(e)
	registerPrometheus(e)

	return e
}

// Apply custom error handler
func applyErrorHandler(e *echo.Echo) {
	e.HTTPErrorHandler = common.CustomErrorHandler
}

// Apply middlewares for router
func applyMiddlewares(e *echo.Echo) {
	e.Use(middleware.Recover())
	e.Use(middleware.Secure())
	e.Use(middleware.CORS())
	e.Pre(middleware.RemoveTrailingSlash())
}

// Apply Logrus logger middleware
func applyLogger(e *echo.Echo) {
	e.HideBanner = true
	e.HidePort = true
	e.Logger = log.Logger()
	e.Use(echoLogrus.Logger())
}

// Registering custom validator
func registerValidator(e *echo.Echo) {
	e.Validator = &models.CustomValidator{Validator: echoValidator}
}

// Registering Swagger route
func registerSwagger(e *echo.Echo) {
	e.GET(os.Getenv("SWAGGER_PATH")+"/*", echoSwagger.WrapHandler)
}

// Registering Prometheus for Echo
func registerPrometheus(e *echo.Echo) {
	p := prometheus.NewPrometheus("echo", nil)
	p.Use(e)
}

// Running router
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
