package v1

import (
	"github.com/jinzhu/gorm"
	"github.com/labstack/echo/v4"
	"gitlab.com/loonify/web/models"
	"net/http"
)

/*GetPosts handler*/
func GetPosts(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		var u []*models.Post

		if err := db.Find(&u).Error; err != nil {
			return err
		}

		return c.JSON(http.StatusOK, u)
	}
}