package handler

import (
	"io/ioutil"
	"net/http"
	"path/filepath"

	"github.com/labstack/echo"
)

/*Welcome handler*/
func Welcome() echo.HandlerFunc {
	return func(c echo.Context) error {
		path, err := filepath.Abs("handler/welcome/main.txt")
		if err != nil {
			return c.String(http.StatusOK, "Welcome!")
		}

		welcome, err := ioutil.ReadFile(path)
		if err != nil {
			return c.String(http.StatusOK, "Welcome!")
		}

		return c.Render(http.StatusOK, "index.html", map[string]interface{}{
			"title":   "Awesome as FUCK API",
			"welcome": string(welcome),
		})
	}
}
