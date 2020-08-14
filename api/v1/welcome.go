package v1

import (
	"github.com/labstack/echo/v4"
	"io/ioutil"
	"log"
	"net/http"
	"path/filepath"
)

/*Welcome handler*/
func Welcome() echo.HandlerFunc {
	return func(c echo.Context) error {
		main, err := filepath.Abs("api/v1/welcome/main.txt")
		if err != nil {
			return c.String(http.StatusOK, "Welcome!")
		}

		welcome, err := ioutil.ReadFile(main)
		if err != nil {
			return c.String(http.StatusOK, "Welcome!")
		}

		return c.Render(http.StatusOK, "index.html", map[string]interface{}{
			"title":   "Awesome as FUCK API",
			"welcome": string(welcome),
		})
	}
}

func logFatal(err error) {
	if err != nil {
		log.Fatal(err)
	}
}