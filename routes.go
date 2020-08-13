package main

import (
	"github.com/go-bongo/bongo"
	"github.com/labstack/echo/v4"
	"gitlab.com/loonify/web/api"
	"go.mongodb.org/mongo-driver/mongo"
	"html/template"
	"io"
	"path/filepath"
)

func InitRoutes(e *echo.Echo, client *bongo.Connection) {
	nuxtStatic, err := filepath.Abs("frontend/dist/_nuxt")
	logFatal(err)

	myStatic, err := filepath.Abs("frontend/static")
	logFatal(err)

	sitePath, err := filepath.Abs("frontend/dist/index.html")
	logFatal(err)

	htmlV1Path, err := filepath.Abs("api/v1/welcome/*.html")
	logFatal(err)

	t := &Template{
		templates: template.Must(template.ParseGlob(htmlV1Path)),
	}

	e.Renderer = t
	e.File("/", sitePath)
	e.Static("/static", myStatic)
	e.Static("/_nuxt", nuxtStatic)

	// routes
	apiGroup := e.Group("/api")
	api.Init(apiGroup, client, e)
}

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}
