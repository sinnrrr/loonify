package server

import (
	"fmt"
	sentryecho "github.com/getsentry/sentry-go/echo"
	"github.com/labstack/echo-contrib/prometheus"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"html/template"
	"io"
	"io/ioutil"
	"loonify/middlewares/skippers"
	"os"
)

func Init() {
	e := InitRouter()

	OutputLogo()
	InitRoutes(e)
	RunRouter(e)
}

func OutputLogo() {
	loonifile, err := ioutil.ReadFile("loonify.txt")
	if err != nil {
		panic(err)
	}

	fmt.Println(string(loonifile))
}

func InitRouter() *echo.Echo {
	e := echo.New()
	e.HideBanner = true

	applyRenderer(e)
	applyMiddlewares(e)

	RegisterSentry(e)
	RegisterPrometheus(e)

	return e
}

func applyRenderer(e *echo.Echo) {
	t := &Template{
		templates: template.Must(template.ParseGlob("public/html/*.html")),
	}

	e.Renderer = t
}

func applyMiddlewares(e *echo.Echo) {
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.Secure())
	e.Use(middleware.CORS())

	e.Pre(middleware.AddTrailingSlashWithConfig(
		middleware.TrailingSlashConfig{
			Skipper: skippers.UrlForAdding,
		},
	))

	e.Pre(middleware.RemoveTrailingSlashWithConfig(
		middleware.TrailingSlashConfig{
			Skipper: skippers.UrlForRemoving,
		},
	))
}

func RegisterSentry(e *echo.Echo) {
	e.Use(sentryecho.New(sentryecho.Options{
		Repanic: true,
	}))
}

func RegisterPrometheus(e *echo.Echo) {
	p := prometheus.NewPrometheus("echo", nil)
	p.Use(e)
}

func RunRouter(e *echo.Echo) {
	e.Logger.Fatal(e.Start(":" + os.Getenv("PORT")))
}

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}
