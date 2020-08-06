package handler

import (
	"github.com/jinzhu/gorm"
	"path/filepath"
	"net/http"
	"io/ioutil"
	"fmt"

	"github.com/sinnrrr/loonify/model"

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
				"<style>pre{font-size: 0.8vw; display: flex; justify-content:center; align-items: center; height: 100vh} *{margin: 0}</style>",
				 string(data),
			),
		)
	}
}

/*GetUsers handler*/
func GetUsers(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		var u []*model.User

		if err := db.Find(&u).Error; err != nil {
			return err
		}

		return c.JSON(http.StatusOK, u)
	}
}

/*GetPosts handler*/
func GetPosts(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		var u []*model.Post

		if err := db.Find(&u).Error; err != nil {
			return err
		}

		return c.JSON(http.StatusOK, u)
	}
}

/*CreateUser handler*/
func CreateUser(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		u := new(model.User)

		if err := c.Bind(u); err != nil {
			return c.JSON(http.StatusUnprocessableEntity, err)
		}

		if err := db.Create(u).Error; err != nil {
			return c.JSON(http.StatusUnprocessableEntity, err)
		}

		return c.JSON(http.StatusOK, u)
	}
}

func ReadUser(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		u := new(model.User)

		if err := db.First(&u, c.Param("id")).Error; err != nil {
			return c.JSON(http.StatusNotFound, err)
		}

		return c.JSON(http.StatusOK, u)
	}
}

func UpdateUser(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		i := new(model.User)
		u := new(model.User)

		if err := c.Bind(u); err != nil {
			return c.JSON(http.StatusUnprocessableEntity, err)
		}

		if err := db.First(&i, c.Param("id")).Error; err != nil {
			return c.JSON(http.StatusNotFound, err)
		}

		if err := db.Model(i).Updates(u).Error; err != nil {
			return c.JSON(http.StatusUnprocessableEntity, err)
		}

		return c.JSON(http.StatusOK, u)
	}
}

func DeleteUser(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		u := new(model.User)

		if err := db.Find(&u, c.Param("id")).Error; err != nil {
			return c.JSON(http.StatusNotFound, err)
		}

		if err := db.Delete(&u).Error; err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}

		return c.JSON(http.StatusOK, u)
	}
}