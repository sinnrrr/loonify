// @title Swagger Example API
// @version 1.0
// @description This is a sample server Petstore server.
// @termsOfService http://swagger.io/terms/

// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host petstore.swagger.io
// @BasePath /v2
package main

import (
	"github.com/jinzhu/gorm"
	"github.com/labstack/echo/v4"
	"github.com/swaggo/echo-swagger"
	"gitlab.com/loonify/web/api"
	_ "gitlab.com/loonify/web/docs"
	"html/template"
	"io"
	//"mime"
	"path/filepath"
)

func InitRoutes(e *echo.Echo, db *gorm.DB) {
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
	api.Init(apiGroup, db, e)

	e.GET("/swagger/*", echoSwagger.WrapHandler)

	//mediatype, params, err := mime.ParseMediaType(".css")
	//logFatal(err)
	//
	//params["type"] = "text/css"
	//
	//mime.FormatMediaType(mediatype, params)
	//logFatal(err)
}

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}
