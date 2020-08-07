package handler

import (
	"path/filepath"
	"net/http"
	"io/ioutil"
	"fmt"


	"github.com/labstack/echo"
)

/*Welcome handler*/
func Welcome() echo.HandlerFunc {
	return func(c echo.Context) error {
		path, err := filepath.Abs("handler/welcome.txt")
		if err != nil {
			return c.String(http.StatusOK, "Welcome!")
		}

		data, err := ioutil.ReadFile(path)
		if err != nil {
			return c.String(http.StatusOK, "Welcome!")
		}

		return c.HTML(
			http.StatusOK,
			fmt.Sprintf(
				"<pre>%s</pre>" +
				"<style>pre{font-size:0.8vmin;display:flex;justify-content:center;align-items:center;height:100vh}*{margin: 0}</style>",
				 string(data),
			),
		)
	}
}