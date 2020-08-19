package main

import (
	"fmt"
	"github.com/Kamva/mgm/v3"
	"github.com/go-playground/validator/v10"
	_ "github.com/joho/godotenv/autoload"
	//"github.com/labstack/echo-contrib/prometheus"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"go.mongodb.org/mongo-driver/mongo/options"
	"html/template"
	"io"
	"io/ioutil"
	"loonify/routes"
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

func init() {
	err := mgm.SetDefaultConfig(
		&mgm.Config{CtxTimeout: 12 * time.Second},
		os.Getenv("DATABASE_NAME"),
		options.Client().ApplyURI(
			os.Getenv("MONGODB_DATABASE_URL"),
		),
	)
	if err != nil {
		panic(err)
	}
}

func main() {
	// Hosts
	hosts := map[string]*Host{}

	htmlV1Path, err := filepath.Abs("api/v1/welcome/*.html")
	if err != nil {
		panic(err)
	}

	t := &Template{
		templates: template.Must(template.ParseGlob(htmlV1Path)),
	}

	//-----
	// API
	//-----

	api := echo.New()
	api.Use(middleware.Logger())
	api.Use(middleware.Recover())
	api.Renderer = t
	api.Validator = &CustomValidator{validator: validator.New()}

	hosts["api." + os.Getenv("HOST") + ":" + os.Getenv("PORT")] = &Host{api}

	routes.InitAPI(api)

	//---------
	// Website
	//---------

	site := echo.New()

	site.Use(middleware.Logger())
	site.Use(middleware.Recover())
	site.Pre(middleware.AddTrailingSlash())

	hosts[os.Getenv("HOST") + ":" + os.Getenv("PORT")] = &Host{site}

	//p := prometheus.NewPrometheus("echo", nil)
	//p.Use(site)

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

	site.File("/", sitePath)
	site.Static("/static", myStatic)
	site.Static("/_nuxt", nuxtStatic)

	e := echo.New()
	e.HideBanner = true

	e.Any("/*", func(c echo.Context) (err error) {
		req := c.Request()
		res := c.Response()
		host := hosts[req.Host]

		if host == nil {
			err = echo.ErrNotFound
		} else {
			host.Echo.ServeHTTP(res, req)
		}

		return
	})

	loonifile, err := ioutil.ReadFile("loonify.txt")
	if err != nil {
		panic(err)
	}

	fmt.Println(string(loonifile))

	// starting router
	e.Logger.Fatal(e.Start(":" + os.Getenv("PORT")))
}

type CustomValidator struct {
	validator *validator.Validate
}

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

func (cv *CustomValidator) Validate(i interface{}) error {
	return cv.validator.Struct(i)
}
