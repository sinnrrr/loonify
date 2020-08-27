package site

import (
	"github.com/labstack/echo/v4"
	"html/template"
	"io"
	"path/filepath"
)

func Init(e *echo.Echo) {
	htmlV1Path, err := filepath.Abs("api/v1/welcome/*.html")
	if err != nil {
		panic(err)
	}

	t := &Template{
		templates: template.Must(template.ParseGlob(htmlV1Path)),
	}

	nuxtStatic, err := filepath.Abs("frontend/dist/_nuxt")
	if err != nil {
		panic(err)
	}

	myStatic, err := filepath.Abs("frontend/static")
	if err != nil {
		panic(err)
	}

	sitePath, err := filepath.Abs("frontend/dist/index.html")
	if err != nil {
		panic(err)
	}

	e.Renderer = t
	e.File("/", sitePath)
	e.Static("/static", myStatic)
	e.Static("/_nuxt", nuxtStatic)
}

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}
