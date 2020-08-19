package v1

import (
	"github.com/labstack/echo/v4"
	"io/ioutil"
	"math/rand"
	"net/http"
	"path/filepath"
)

const KEYS = 7

/*Welcome handler*/
func Welcome() echo.HandlerFunc {
	return func(c echo.Context) error {
		titles := [KEYS]string{
			"My Awesome API",
			"Author of this API gone walking",
			"Piggy wiggy API",
			"Smooth sound of API",
			"HAHA API",
			"API Loonify",
			"Tea party API",
		}

		main, err := filepath.Abs("api/v1/welcome/main.txt")
		if err != nil {
			return c.String(http.StatusOK, "Welcome!")
		}

		welcome, err := ioutil.ReadFile(main)
		if err != nil {
			return c.String(http.StatusOK, "Welcome!")
		}

		return c.Render(http.StatusOK, "index.html", map[string]interface{}{
			"title":   titles[rand.Intn(KEYS)],
			"welcome": string(welcome),
		})
	}
}