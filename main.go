package main

import (
	"fmt"
	_ "github.com/joho/godotenv/autoload"
	"loonify/routes"

	//"github.com/labstack/echo-contrib/prometheus"
	"github.com/getsentry/sentry-go/echo"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"html/template"
	"io"
	"io/ioutil"
	"os"
	"path/filepath"
)

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
	api.Pre(middleware.AddTrailingSlash())

	api.Use(sentryecho.New(sentryecho.Options{
		Repanic: true,
	}))

	api.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(ctx echo.Context) error {
			if hub := sentryecho.GetHubFromContext(ctx); hub != nil {
				hub.Scope().SetTag("someRandomTag", "maybeYouNeedIt")
			}
			return next(ctx)
		}
	})

	api.Renderer = t
	api.Validator = &CustomValidator{validator: validator.New()}

	var hostString string

	if os.Getenv("HOST") == "loonify.herokuapp.com" {
		hostString = os.Getenv("HOST") + "/api"
	} else {
		hostString = "api." + os.Getenv("HOST") + ":" + os.Getenv("PORT")
	}

	hosts[hostString] = &Host{api}
	routes.InitAPI(api)

	//---------
	// Website
	//---------

	site := echo.New()

	hosts[os.Getenv("HOST")+":"+os.Getenv("PORT")] = &Host{site}

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

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Pre(middleware.AddTrailingSlash())

	e.Use(sentryecho.New(sentryecho.Options{
		Repanic: true,
	}))

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

	//p := prometheus.NewPrometheus("echo", nil)
	//p.Use(e)

	loonifile, err := ioutil.ReadFile("loonify.txt")
	if err != nil {
		panic(err)
	}

	fmt.Println(string(loonifile))
	fmt.Println(os.Getenv("HOST"))

	// starting router
	e.Logger.Fatal(e.Start(":" + os.Getenv("PORT")))
}

const PREFIX = "---> "

type (
	Host struct {
		Echo *echo.Echo
	}
)

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
