package api

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
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

func Init(api *echo.Echo, isHeroku bool) {
	htmlV1Path, err := filepath.Abs("api/v1/welcome/*.html")
	if err != nil {
		panic(err)
	}

	t := &Template{
		templates: template.Must(template.ParseGlob(htmlV1Path)),
	}

	api.Renderer = t

	var url string

	if isHeroku {
		url = "/api/"
	} else {
		url = "/"
	}

	apiGroup := api.Group(url)

	V1Group(apiGroup)
	RegisterRedirectToCurrent(api, url)
}

func V1Group(api *echo.Group) {
	v1Group := api.Group("v1")
	v1Group.GET("/", welcome.Welcome()).Name = "api.current"

	UsersV1Group(v1Group)
	PostsV1Group(v1Group)
	LocationsV1Group(v1Group)
	CategoriesV1Group(v1Group)
	OperationsV1Group(v1Group)
}

func OperationsV1Group(v1Group *echo.Group) {
	operationsGroup := v1Group.Group("/operations")

	operationsGroup.POST("/login/", operations.LogIn())
	operationsGroup.POST("/signup/", operations.SignUp())
}

func UsersV1Group(v1Group *echo.Group) {
	usersGroup := v1Group.Group(
		"/users",
		middleware.KeyAuth(func(key string, c echo.Context) (bool, error) {
			return token.Verify(key)
		}),
	)

	usersGroup.GET("/", users.Query())
	usersGroup.POST("/", users.Create())
	usersGroup.GET("/:id/", users.Read())
	usersGroup.PUT("/:id/", users.Update())
	usersGroup.DELETE("/:id/", users.Delete())
}

func PostsV1Group(v1Group *echo.Group) {
	postsGroup := v1Group.Group(
		"/posts",
		middleware.KeyAuth(func(key string, c echo.Context) (bool, error) {
			return token.Verify(key)
		}),
	)

	postsGroup.GET("/", posts.Query())
	postsGroup.POST("/", posts.Create())
	postsGroup.GET("/:id/", posts.Read())
	postsGroup.PUT("/:id/", posts.Update())
	postsGroup.DELETE("/:id/", posts.Delete())
}

func LocationsV1Group(v1Group *echo.Group) {
	locationsGroup := v1Group.Group(
		"/locations",
		middleware.KeyAuth(func(key string, c echo.Context) (bool, error) {
			return token.Verify(key)
		}),
	)

	locationsGroup.GET("/", locations.Query())
	locationsGroup.POST("/", locations.Create())
	locationsGroup.GET("/:id/", locations.Read())
	locationsGroup.PUT("/:id/", locations.Update())
	locationsGroup.DELETE("/:id/", locations.Delete())
}

func CategoriesV1Group(v1Group *echo.Group) {
	categoriesGroup := v1Group.Group(
		"/categories",
		middleware.KeyAuth(func(key string, c echo.Context) (bool, error) {
			return token.Verify(key)
		}),
	)

	categoriesGroup.GET("/", categories.Query())
	categoriesGroup.POST("/", categories.Create())
	categoriesGroup.GET("/:id/", categories.Read())
	categoriesGroup.PUT("/:id/", categories.Update())
	categoriesGroup.DELETE("/:id/", categories.Delete())
}

func RegisterRedirectToCurrent(api *echo.Echo, url string) {
	api.GET(url, func(c echo.Context) error {
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
