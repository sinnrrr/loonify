package routes

import (
	"github.com/labstack/echo/v4"
	"html/template"
	"io"
	"loonify/api/v1/welcome"
	v1 "loonify/routes/v1"
	"net/http"
)

func InitRoutes(api *echo.Echo) {
	t := &Template{
		templates: template.Must(template.ParseGlob("api/v1/welcome/*.html")),
	}

	api.Renderer = t
	apiGroup := api.Group("/")

	v1Group(apiGroup)
	registerRedirectToCurrent(api)
	registerDocumentationRoute(api)
}

func v1Group(api *echo.Group) {
	v1Group := api.Group("v1")
	v1Group.GET("/", welcome.Welcome).Name = "api.current"

	v1.UsersGroup(v1Group)
	v1.PostsGroup(v1Group)
	v1.LocationsGroup(v1Group)
	v1.CategoriesGroup(v1Group)
	v1.AuthGroup(v1Group)
	v1.PushGroup(v1Group)
	v1.CodeGroup(v1Group)
}

func registerRedirectToCurrent(api *echo.Echo) {
	api.GET("/", func(c echo.Context) error {
		return c.Redirect(http.StatusSeeOther, api.Reverse("api.current"))
	})
}

func registerDocumentationRoute(api *echo.Echo) {
	api.GET("documentation/", func(c echo.Context) error {
		return c.File("documentation.md")
	})
}

//func RegisterGraphQL(api *echo.Group) {
	//h, err := graphql.NewHandler(db)
	//if err != nil {
	//	panic(err)
	//}

	//api.POST("/graphql", echo.WrapHandler(h))
//}

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}
