package api

import (
	"github.com/labstack/echo/v4"
	"html/template"
	"io"
	"loonify/api/v1"
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
	v1Group.GET("/", v1.Welcome()).Name = "api.current"

	UsersV1Group(v1Group)
	PostsV1Group(v1Group)
	LocationsV1Group(v1Group)
	CategoriesV1Group(v1Group)
}

func UsersV1Group(v1Group *echo.Group) {
	users := v1Group.Group("/users")
	users.GET("/", v1.QueryUsers())
	users.POST("/", v1.CreateUser())
	users.GET("/:id/", v1.ReadUser())
	users.PUT("/:id/", v1.UpdateUser())
	users.DELETE("/:id/", v1.DeleteUser())
}

func PostsV1Group(v1Group *echo.Group) {
	posts := v1Group.Group("/posts")
	posts.GET("/", v1.QueryPosts())
	posts.POST("/", v1.CreatePost())
	posts.GET("/:id/", v1.ReadPost())
	posts.PUT("/:id/", v1.UpdatePost())
	posts.DELETE("/:id/", v1.DeletePost())
}

func LocationsV1Group(v1Group *echo.Group) {
	locations := v1Group.Group("/locations")
	locations.GET("/", v1.QueryLocations())
	locations.POST("/", v1.CreateLocation())
	locations.GET("/:id/", v1.ReadLocation())
	locations.PUT("/:id/", v1.UpdateLocation())
	locations.DELETE("/:id/", v1.DeleteLocation())
}

func CategoriesV1Group(v1Group *echo.Group) {
	categories := v1Group.Group("/categories")
	categories.GET("/", v1.QueryLocations())
	categories.POST("/", v1.CreateLocation())
	categories.GET("/:id/", v1.ReadLocation())
	categories.PUT("/:id/", v1.UpdateLocation())
	categories.DELETE("/:id/", v1.DeleteLocation())
}

func RegisterRedirectToCurrent(api *echo.Echo, url string) {
	api.GET(url, func(c echo.Context) error {
		return c.Redirect(http.StatusSeeOther, api.Reverse("api.current"))
	})
}

func RegisterGraphQL(api *echo.Group)  {
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
