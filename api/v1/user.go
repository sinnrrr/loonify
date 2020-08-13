package v1

import (
	"github.com/jinzhu/gorm"
	"github.com/labstack/echo/v4"
	
	"net/http"

	"gitlab.com/loonify/web/models"
)

// swagger:route GET /users
//
// Gets all users from table
//
//     Produces:
//     - application/json
//
//     Responses:
//       default: genericError
//       200: someResponse
//       422: validationError
func GetUsers(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		var u []*models.User

		if err := db.Find(&u).Error; gorm.IsRecordNotFoundError(err) {
			return echo.NewHTTPError(http.StatusNotFound, err)
		}

		return c.JSON(http.StatusOK, u)
	}
}


/*CreateUser handler*/
func CreateUser(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		u := new(models.User)

		if err := c.Bind(u); err != nil {
			return echo.NewHTTPError(http.StatusUnprocessableEntity, err)
		}

		if err := db.Create(u).Error; err != nil {
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