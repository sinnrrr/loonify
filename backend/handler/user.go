package handler

import (
	"github.com/jinzhu/gorm"
	"github.com/labstack/echo"
	
	"net/http"

	"github.com/sinnrrr/loonify/model"
)

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