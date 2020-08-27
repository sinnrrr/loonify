package posts

import (
	"github.com/Kamva/mgm/v3"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	v1 "loonify/api/v1"
	"loonify/models"
	"net/http"
)

/*GetPosts handler*/
func Query() echo.HandlerFunc {
	return func(c echo.Context) error {
		var post []models.Post

		err := mgm.Coll(&models.Post{}).SimpleFind(&post, bson.D{})
		if err != nil {
			return c.JSON(http.StatusInternalServerError, v1.BadResponse(err, "error"))
		}

		return c.JSON(http.StatusOK, v1.Response{
			Data: post,
			Status: "success",
			Message: "Posts were successfully retrieved",
		})
	}
}

/*CreatePost handler*/
func Create() echo.HandlerFunc {
	return func(c echo.Context) error {
		post := new(models.Post)

		if err := c.Bind(post); err != nil {
			return c.JSON(http.StatusUnprocessableEntity, v1.BadResponse(err, "fail"))
		}

		err := mgm.Coll(post).Create(post)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, v1.BadResponse(err, "error"))
		}

		return c.JSON(http.StatusCreated, v1.Response{
			Data: post,
			Status: "success",
			Message: "Post was successfully created",
		})
	}
}

func Read() echo.HandlerFunc {
	return func(c echo.Context) error {
		post := &models.Post{}
		coll := mgm.Coll(post)

		_ = coll.FindByID(c.Param("id"), post)

		return c.JSON(http.StatusOK, v1.Response{
			Data: post,
			Status: "success",
			Message: "Post was successfully retrieved",
		})
	}
}

func Update() echo.HandlerFunc {
	return func(c echo.Context) error {
		post := &models.Post{}
		coll := mgm.Coll(post)

		_ = coll.FindByID(c.Param("id"), post)

		if err := c.Bind(post); err != nil {
			return c.JSON(http.StatusUnprocessableEntity, v1.BadResponse(err, "fail"))
		}

		err := mgm.Coll(post).Update(post)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, v1.BadResponse(err, "error"))
		}

		return c.JSON(http.StatusOK, v1.Response{
			Data: post,
			Status: "success",
			Message: "Post was successfully updated",
		})
	}
}

func Delete() echo.HandlerFunc {
	return func(c echo.Context) error {
		post := &models.Post{}
		coll := mgm.Coll(post)

		_ = coll.FindByID(c.Param("id"), post)

		err := mgm.Coll(post).Delete(post)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, v1.BadResponse(err, "error"))
		}

		return c.JSON(http.StatusOK, v1.Response{
			Data: post,
			Status: "success",
			Message: "Post was successfully deleted",
		})
	}
}
