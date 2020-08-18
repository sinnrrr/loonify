package v1

import (
	"github.com/Kamva/mgm/v3"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"loonify/models"
	"net/http"
)

/*GetPosts handler*/
func QueryPosts() echo.HandlerFunc {
	return func(c echo.Context) error {
		var post []models.Post

		err := mgm.Coll(&models.Post{}).SimpleFind(&post, bson.D{})
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}

		return c.JSON(http.StatusOK, post)
	}
}

/*CreatePost handler*/
func CreatePost() echo.HandlerFunc {
	return func(c echo.Context) error {
		post := new(models.Post)

		if err := c.Bind(post); err != nil {
			return c.JSON(http.StatusUnprocessableEntity, err)
		}

		err := mgm.Coll(post).Create(post)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}

		return c.JSON(http.StatusOK, post)
	}
}

func ReadPost() echo.HandlerFunc {
	return func(c echo.Context) error {
		post := &models.Post{}
		coll := mgm.Coll(post)

		_ = coll.FindByID(c.Param("id"), post)

		return c.JSON(http.StatusOK, post)
	}
}

func UpdatePost() echo.HandlerFunc {
	return func(c echo.Context) error {
		post := &models.Post{}
		coll := mgm.Coll(post)

		_ = coll.FindByID(c.Param("id"), post)

		if err := c.Bind(post); err != nil {
			return c.JSON(http.StatusUnprocessableEntity, err)
		}

		err := mgm.Coll(post).Update(post)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}

		return c.JSON(http.StatusOK, post)
	}
}

func DeletePost() echo.HandlerFunc {
	return func(c echo.Context) error {
		post := &models.Post{}
		coll := mgm.Coll(post)

		_ = coll.FindByID(c.Param("id"), post)

		err := mgm.Coll(post).Delete(post)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}

		return c.JSON(http.StatusOK, post)
	}
}
