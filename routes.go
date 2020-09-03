package main

import (
	"github.com/labstack/echo/v4"
	"html/template"
	"io"
	"loonify/api/token"
	"loonify/api/v1/categories"
	"loonify/api/v1/locations"
	"loonify/api/v1/operations"
	"loonify/api/v1/posts"
	"loonify/api/v1/users"
	"loonify/api/v1/welcome"
	"net/http"
	"path/filepath"
)

func InitRoutes(api *echo.Echo) {
	htmlV1Path, err := filepath.Abs("api/v1/welcome/*.html")
	if err != nil {
		panic(err)
	}

	t := &Template{
		templates: template.Must(template.ParseGlob(htmlV1Path)),
	}

	api.Renderer = t
	apiGroup := api.Group("/")

	v1Group(apiGroup)
	registerRedirectToCurrent(api)
}

func v1Group(api *echo.Group) {
	v1Group := api.Group("v1")
	v1Group.GET("/", welcome.Welcome()).Name = "api.current"

	usersV1Group(v1Group)
	postsV1Group(v1Group)
	locationsV1Group(v1Group)
	categoriesV1Group(v1Group)
	operationsV1Group(v1Group)
}

func operationsV1Group(v1Group *echo.Group) {
	operationsGroup := v1Group.Group("/operations")

	operationsGroup.POST("/login/", operations.LogIn())
	operationsGroup.POST("/signup/", operations.SignUp())
}

func usersV1Group(v1Group *echo.Group) {
	usersGroup := v1Group.Group("/users")

	usersGroup.GET("/", users.Query(), token.InitMiddleware("user", "query"))
	//usersGroup.POST("/", users.Create(), token.InitMiddleware("user", "create"))
	usersGroup.GET("/:id/", users.Read())
	usersGroup.PUT("/:id/", users.Update(), token.InitMiddleware("user", "update"))
	usersGroup.DELETE("/:id/", users.Delete(), token.InitMiddleware("user", "delete"))

	usersGroup.GET("/me/", users.Me(), token.InitMiddleware("user", "read"))
}

func postsV1Group(v1Group *echo.Group) {
	postsGroup := v1Group.Group("/posts")

	postsGroup.GET("/", posts.Query())
	postsGroup.POST("/", posts.Create(), token.InitMiddleware("post", "create"))
	postsGroup.GET("/:id/", posts.Read())
	postsGroup.PUT("/:id/", posts.Update(), token.InitMiddleware("post", "update"))
	postsGroup.DELETE("/:id/", posts.Delete(), token.InitMiddleware("post", "delete"))
}

func locationsV1Group(v1Group *echo.Group) {
	locationsGroup := v1Group.Group("/locations")

	locationsGroup.GET("/", locations.Query(), token.InitMiddleware("location", "query"))
	locationsGroup.POST("/", locations.Create(), token.InitMiddleware("location", "create"))
	locationsGroup.GET("/:id/", locations.Read())
	locationsGroup.PUT("/:id/", locations.Update(), token.InitMiddleware("location", "update"))
	locationsGroup.DELETE("/:id/", locations.Delete(), token.InitMiddleware("location", "delete"))
}

func categoriesV1Group(v1Group *echo.Group) {
	categoriesGroup := v1Group.Group("/categories")

	categoriesGroup.GET("/", categories.Query())
	categoriesGroup.POST("/", categories.Create(), token.InitMiddleware("category", "query"))
	categoriesGroup.GET("/:id/", categories.Read())
	categoriesGroup.PUT("/:id/", categories.Update(), token.InitMiddleware("category", "update"))
	categoriesGroup.DELETE("/:id/", categories.Delete(), token.InitMiddleware("category", "delete"))
}

func registerRedirectToCurrent(api *echo.Echo) {
	api.GET("/", func(c echo.Context) error {
		return c.Redirect(http.StatusSeeOther, api.Reverse("api.current"))
	})
}

func RegisterGraphQL(api *echo.Group) {
	//h, err := graphql.NewHandler(db)
	//if err != nil {
	//	panic(err)
	//}

	//api.POST("/graphql", echo.WrapHandler(h))
}

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}
