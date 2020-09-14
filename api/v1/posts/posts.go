package posts

import (
	"github.com/Kamva/mgm/v3"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	v1 "loonify/api/v1"
	"loonify/config"
	"loonify/models"
	"net/http"
)

/*GetPosts handler*/
func Query(c echo.Context) error {
	var posts []models.Post

	err := mgm.Coll(&models.Post{}).SimpleFind(&posts, bson.D{})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusOK, v1.GoodResponseWithData(posts, "Posts were successfully retrieved"))
}

/*CreatePost handler*/
func Create(c echo.Context) error {
	post := new(models.Post)

	if err := c.Bind(post); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, v1.FailResponse(err.Error()))
	}

	if err := config.Validator.Struct(post); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, v1.ValidationResponse(v1.ProceedValidation(err)))
	}

	err := mgm.Coll(post).Create(post)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusCreated, v1.GoodResponseWithData(post, "Post was successfully created"))
}

func Read(c echo.Context) error {
	post := &models.Post{}
	coll := mgm.Coll(post)

	_ = coll.FindByID(c.Param("id"), post)

	return c.JSON(http.StatusOK, v1.GoodResponseWithData(post, "Post was successfully retrieved"))
}

func Update(c echo.Context) error {
	post := &models.Post{}
	coll := mgm.Coll(post)

	_ = coll.FindByID(c.Param("id"), post)

	if err := c.Bind(post); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, v1.FailResponse(err.Error()))
	}

	if err := config.Validator.Struct(post); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, v1.ValidationResponse(v1.ProceedValidation(err)))
	}

	err := mgm.Coll(post).Update(post)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusOK, v1.GoodResponseWithData(post, "Post was successfully updated"))
}

func Delete(c echo.Context) error {
	post := &models.Post{}
	coll := mgm.Coll(post)

	_ = coll.FindByID(c.Param("id"), post)

	err := mgm.Coll(post).Delete(post)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusOK, v1.GoodResponse("Post was successfully deleted"))
}
