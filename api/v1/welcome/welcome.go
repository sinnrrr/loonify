package welcome

import (
	"github.com/labstack/echo/v4"
	"io/ioutil"
	"math/rand"
	"net/http"
)

/*Welcome handler*/
func Welcome(c echo.Context) error {
	banner, err := ioutil.ReadFile("api/v1/welcome/main.txt")
	if err != nil {
		return c.String(http.StatusOK, "Welcome!")
	}

	return c.Render(http.StatusOK, "index.html", map[string]interface{}{
		"title":   Titles[rand.Intn(KEYS)],
		"welcome": string(banner),
	})
}
