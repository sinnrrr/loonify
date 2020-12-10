package router

import (
	"fmt"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo-contrib/prometheus"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	echoLogrus "github.com/neko-neko/echo-logrus/v2"
	"github.com/neko-neko/echo-logrus/v2/log"
	"github.com/pangpanglabs/echoswagger/v2"
	"io/ioutil"
	_ "loonify/api"
	"loonify/common"
	"loonify/config"
	"loonify/models"
	"os"
)

var echoValidator = validator.New()

// Initializing, configuring and running router
func RunRouter() {
	r := initRouter()

	registerRoutes(r)

	runRouter(r)
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
func initRouter() echoswagger.ApiRoot {
	e := echo.New()

	applyLogger(e)
	applyMiddlewares(e)
	applyErrorHandler(e)

	registerValidator(e)
	registerPrometheus(e)

	return wrapEchoSwagger(e)
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

// Apply logger middleware
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

// Wrapping Echo with Swagger
func wrapEchoSwagger(e *echo.Echo) echoswagger.ApiRoot {
	swaggerConfiguration := echoswagger.Info{
		Title:       "Loonify",
		Description: "Swagger formatted OpenAPI specifications",
		Version:     "1.0",
	}

	r := echoswagger.New(e, os.Getenv("SWAGGER_PATH"), &swaggerConfiguration)
	r.AddSecurityAPIKey(
		"token",
		"API auth token",
		echoswagger.SecurityInHeader,
	)

	return r
}

// Registering Prometheus for Echo
func registerPrometheus(e *echo.Echo) {
	p := prometheus.NewPrometheus("echo", nil)
	p.Use(e)
}

// Running router
func runRouter(r echoswagger.ApiRoot) {
	common.Log.Info(
		"Starting " +
			config.YellowColor +
			"HTTP server" +
			config.ResetColor +
			" on port " +
			config.GreenColor + "[::]:" +
			os.Getenv("PORT") +
			config.ResetColor,
	)

	r.Echo().Logger.Fatal(r.Echo().Start(":" + os.Getenv("PORT")))
}

// Swagger group constructor
func initGroup(
	r echoswagger.ApiRoot,
	name string,
	prefix string,
	guarded bool,
) echoswagger.ApiGroup {
	group := r.Group(name, prefix)

	if guarded {
		group.SetSecurity("token")
		group.EchoGroup().Use(middleware.KeyAuth(ValidateToken))
	}

	return group
}
