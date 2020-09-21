package v1

import (
	"github.com/labstack/echo/v4"
	"io/ioutil"
	"math/rand"
	"net/http"
)

type WelcomeController struct{}

/*Welcome handler*/
func (WelcomeController) Welcome(c echo.Context) error {
	banner, err := ioutil.ReadFile("loonify.txt")
	if err != nil {
		return c.String(http.StatusOK, "Welcome!")
	}

	return c.Render(http.StatusOK, "welcome.html", map[string]interface{}{
		"title":   Titles[rand.Intn(len(Titles))],
		"welcome": string(banner),
	})
}

var Titles = []string{
	"My Awesome API",
	"Author of this API gone walking",
	"Piggy wiggy API",
	"Smooth sound of API",
	"HAHA API",
	"Loonify API",
	"Tea party API",
	"Incredible API",
}
