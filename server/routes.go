package server

import (
	"github.com/labstack/echo/v4"
	echoSwagger "github.com/swaggo/echo-swagger"
	"loonify/controllers/v1"
	"net/http"
	"os"
)

func InitRoutes(e *echo.Echo) {
	var (
		v1Group      = e.Group("/v1")
		swaggerGroup = e.Group(os.Getenv("SWAGGER_PATH"))
	)

	V1Group(v1Group)
	CodeV1Group(v1Group)
	AuthV1Group(v1Group)
	PushV1Group(v1Group)
	UsersV1Group(v1Group)
	PostsV1Group(v1Group)
	LocationsV1Group(v1Group)
	CategoriesV1Group(v1Group)

	SwaggerGroup(swaggerGroup)
	RegisterRedirectToCurrent(e)
}

func V1Group(v1Group *echo.Group) {
	welcomeController := new(v1.WelcomeController)

	v1Group.GET("/", welcomeController.Welcome)
}

func UsersV1Group(v1Group *echo.Group) {
	usersController := new(v1.UsersController)
	usersGroup := v1Group.Group("/users")

	usersGroup.GET("/", usersController.Query)
	usersGroup.GET("/:id/", usersController.Read)
	usersGroup.PUT("/:id/", usersController.Update)
	usersGroup.DELETE("/:id/", usersController.Delete)
}

func PostsV1Group(v1Group *echo.Group) {
	postsController := new(v1.PostsController)
	postsGroup := v1Group.Group("/posts")

	postsGroup.GET("/", postsController.Query)
	postsGroup.POST("/", postsController.Create)
	postsGroup.GET("/:id/", postsController.Read)
	postsGroup.PUT("/:id/", postsController.Update)
	postsGroup.DELETE("/:id/", postsController.Delete)
}

func LocationsV1Group(v1Group *echo.Group) {
	locationsController := new(v1.LocationsController)
	locationsGroup := v1Group.Group("/locations")

	locationsGroup.GET("/", locationsController.Query)
	locationsGroup.POST("/", locationsController.Create)
	locationsGroup.GET("/:id/", locationsController.Read)
	locationsGroup.PUT("/:id/", locationsController.Update)
	locationsGroup.DELETE("/:id/", locationsController.Delete)
}

func CategoriesV1Group(v1Group *echo.Group) {
	categoriesController := new(v1.CategoriesController)
	categoriesGroup := v1Group.Group("/categories")

	categoriesGroup.GET("/", categoriesController.Query)
	categoriesGroup.POST("/", categoriesController.Create)
	categoriesGroup.GET("/:id/", categoriesController.Read)
	categoriesGroup.PUT("/:id/", categoriesController.Update)
	categoriesGroup.DELETE("/:id/", categoriesController.Delete)
}

func AuthV1Group(v1Group *echo.Group) {
	authController := new(v1.AuthController)
	authGroup := v1Group.Group("/auth")

	authGroup.POST("/login/", authController.LogIn)
	authGroup.POST("/signup/", authController.SignUp)
}

func PushV1Group(v1Group *echo.Group) {
	pushController := new(v1.PushController)
	pushGroup := v1Group.Group("/push")

	pushGroup.POST("/", pushController.SendPush)
}

func CodeV1Group(v1Group *echo.Group) {
	codeController := new(v1.CodeController)
	codeGroup := v1Group.Group("/code")

	codeGroup.POST("/resend/", codeController.Resend)
	codeGroup.POST("/verify/", codeController.Verify)
}

func SwaggerGroup(swaggerGroup *echo.Group) {
	swaggerGroup.GET("/*", echoSwagger.WrapHandler)
	swaggerGroup.GET("/"+os.Getenv("SWAGGER_PATH"), RedirectToSwagger)
}

func RegisterRedirectToCurrent(e *echo.Echo) {
	e.GET("/", func(c echo.Context) error {
		return c.Redirect(http.StatusSeeOther, os.Getenv("DEFAULT_ROUTE"))
	})
}

func RedirectToSwagger(c echo.Context) error {
	return c.Redirect(http.StatusPermanentRedirect, os.Getenv("SWAGGER_PATH")+"/welcome.html")
}
