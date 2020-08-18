package main

import (
	"github.com/labstack/echo/v4"
	"gitlab.com/loonify/web/api"
	"html/template"
	"io"
	"path/filepath"
)

func InitRoutes(e *echo.Echo) {
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

	api.Init(e)
}

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}
