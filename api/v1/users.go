package v1

import (
	"github.com/go-bongo/bongo"
	"github.com/jinzhu/gorm"
	"github.com/labstack/echo/v4"
	"gopkg.in/mgo.v2/bson"

	"net/http"

	"gitlab.com/loonify/web/models"
)

/*GetUsers handler*/
func GetUsers(usersCollection *bongo.Collection) echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.JSON(http.StatusOK, usersCollection.Find(bson.M{}))
	}
}


/*CreateUser handler*/
func CreateUser(usersCollection *bongo.Collection) echo.HandlerFunc {
	return func(c echo.Context) error {
		u := new(models.User)

		if err := c.Bind(u); err != nil {
			return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
		}


		return c.JSON(http.StatusOK, u)
	}
}

func ReadUser(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		u := new(models.User)

		if err := db.First(&u, c.Param("id")).Error; gorm.IsRecordNotFoundError(err) {
			return echo.NewHTTPError(http.StatusNotFound, err)
		}

		return c.JSON(http.StatusOK, u)
	}
}
func UpdateUser(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		i := new(models.User)
		u := new(models.User)

		if err := c.Bind(u); err != nil {
			return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
		}

		if err := db.First(&i, c.Param("id")).Error; gorm.IsRecordNotFoundError(err) {
			return echo.NewHTTPError(http.StatusNotFound, err)
		}

		if err := db.Model(i).Updates(u).Error; gorm.IsRecordNotFoundError(err) {
			return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
		}

		return c.JSON(http.StatusOK, u)
	}
}

func DeleteUser(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		u := new(models.User)

		if err := db.Find(&u, c.Param("id")).Error; gorm.IsRecordNotFoundError(err) {
			return echo.NewHTTPError(http.StatusNotFound, err)
		}

		if err := db.Delete(&u).Error; err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err)
		}

		return c.JSON(http.StatusOK, u)
	}
}