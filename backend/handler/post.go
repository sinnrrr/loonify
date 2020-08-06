package handler

import (
	"github.com/jinzhu/gorm"
	"github.com/labstack/echo"

	"net/http"

	"gitlab.com/loonify/web/model"
)

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