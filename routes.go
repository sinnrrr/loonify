package main

import (
	"github.com/jinzhu/gorm"
	"github.com/labstack/echo"
	"gitlab.com/loonify/web/graphql"
	"gitlab.com/loonify/web/handler"
	"html/template"
	"io"
	"path/filepath"
)

func InitRoutes(e *echo.Echo, db *gorm.DB) {
	nuxtStatic, err := filepath.Abs("frontend/dist/_nuxt")
	logFatal(err)

	myStatic, err := filepath.Abs("frontend/static")
	logFatal(err)

	htmlPath, err := filepath.Abs("handler/welcome/*.html")
	logFatal(err)

	sitePath, err := filepath.Abs("frontend/dist/index.html")
	logFatal(err)

	t := &Template{
		templates: template.Must(template.ParseGlob(htmlPath)),
	}

	e.Renderer = t
	e.File("/", sitePath)
	e.Static("/static", myStatic)
	e.Static("/_nuxt", nuxtStatic)

	// creating new instance of graphql handler
	h, err := graphql.NewHandler(db)
	logFatal(err)

	// routes
	api := e.Group("/api")

	api.GET("/", handler.Welcome())
	api.POST("/graphql", echo.WrapHandler(h))

	users := api.Group("/users")
	users.GET("/", handler.GetUsers(db))
	users.POST("/", handler.CreateUser(db))
	users.GET("/users/:id", handler.ReadUser(db))
	users.PUT("/users/:id", handler.UpdateUser(db))
	users.DELETE("/users/:id", handler.DeleteUser(db))

	posts := api.Group("/posts")
	posts.GET("/", handler.GetPosts(db))
}

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}
