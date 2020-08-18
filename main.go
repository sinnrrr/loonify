package main

import (
	"github.com/labstack/echo-contrib/prometheus"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"html/template"
	"os"
	"path/filepath"
)

const PREFIX = "---> "

func main() {
	// router configuration
	e := echo.New()

	// router middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Pre(middleware.AddTrailingSlash())

	p := prometheus.NewPrometheus("echo", nil)
	p.Use(e)

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

	InitRoutes(e)

	// starting router
	e.Logger.Fatal(e.Start(":" + os.Getenv("PORT")))
}

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}
