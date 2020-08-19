package main

import (
	"github.com/Kamva/mgm/v3"
	"github.com/go-playground/validator/v10"
	_ "github.com/joho/godotenv/autoload"
	"github.com/labstack/echo-contrib/prometheus"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"go.mongodb.org/mongo-driver/mongo/options"
	"html/template"
	"io"
	"os"
	"path/filepath"
	"time"
)

const PREFIX = "---> "

type (
	Host struct {
		Echo *echo.Echo
	}
)

type CustomValidator struct {
	validator *validator.Validate
}

func (cv *CustomValidator) Validate(i interface{}) error {
	return cv.validator.Struct(i)
}

func main() {
	// Hosts
	hosts := map[string]*Host{}

	//-----
	// API
	//-----

	api := echo.New()
	api.Use(middleware.Logger())
	api.Use(middleware.Recover())

	hosts["api.localhost:1323"] = &Host{api}



	// router configuration
	e := echo.New()
	e.HideBanner = true

	// router middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Pre(middleware.AddTrailingSlash())

	p := prometheus.NewPrometheus("echo", nil)
	p.Use(e)

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

	htmlV1Path, err := filepath.Abs("api/v1/welcome/*.html")
	if err != nil {
		panic(err)
	}

	t := &Template{
		templates: template.Must(template.ParseGlob(htmlV1Path)),
	}

	e.Renderer = t
	e.File("/", sitePath)
	e.Static("/static", myStatic)
	e.Static("/_nuxt", nuxtStatic)
	e.Validator = &CustomValidator{validator: validator.New()}

	err = mgm.SetDefaultConfig(
		&mgm.Config{CtxTimeout: 12 * time.Second},
		os.Getenv("DATABASE_NAME"),
		options.Client().ApplyURI(
			os.Getenv("MONGODB_DATABASE_URL"),
		),
	)
	if err != nil {
		panic(err)
	}

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
