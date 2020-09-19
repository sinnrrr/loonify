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

// Query godoc
// @Summary List posts from database
// @Tags Posts
// @Accept  json
// @Produce  json
// @Success 200 {object} models.PostResponse
// @Failure 500 {object} v1.DefaultResponse
// @Router /posts [get]
func Query(c echo.Context) error {
	var posts []models.Post

	err := mgm.Coll(&models.Post{}).SimpleFind(&posts, bson.D{})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusOK, v1.GoodResponseWithData(posts, "Posts were successfully retrieved"))
}

// Create godoc
// @Summary Create post
// @Description Create post using provided information
// @Tags Posts
// @Accept  json
// @Produce  json
// @Success 200 {object} models.PostResponse
// @Failure 400 {object} v1.DefaultResponse
// @Failure 500 {object} v1.DefaultResponse
// @Router /posts [post]
func Create(c echo.Context) error {
	post := new(models.Post)

	if err := c.Bind(post); err != nil {
		return c.JSON(http.StatusBadRequest, v1.FailResponse(err.Error()))
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

// Read godoc
// @Summary Show the post
// @Description Get the post by ID
// @ID get-string-by-int
// @Tags Posts
// @Accept  json
// @Produce  json
// @Param id path int true "Post ID"
// @Success 200 {object} models.PostResponse
// @Router /posts/{id} [get]
func Read(c echo.Context) error {
	post := &models.Post{}
	coll := mgm.Coll(post)

	_ = coll.FindByID(c.Param("id"), post)

	return c.JSON(http.StatusOK, v1.GoodResponseWithData(post, "Post was successfully retrieved"))
}

// Update godoc
// @Summary Update concrete post
// @Description Update post information using ID
// @ID get-string-by-int
// @Tags Posts
// @Accept  json
// @Produce  json
// @Param id path int true "Post ID"
// @Success 200 {object} models.PostResponse
// @Failure 400 {object} v1.DefaultResponse
// @Failure 422 {object} v1.ResponseWithData
// @Failure 500 {object} v1.DefaultResponse
// @Router /posts/{id} [post]
func Update(c echo.Context) error {
	post := &models.Post{}
	coll := mgm.Coll(post)

	_ = coll.FindByID(c.Param("id"), post)

	if err := c.Bind(post); err != nil {
		return c.JSON(http.StatusBadRequest, v1.FailResponse(err.Error()))
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

// Delete godoc
// @Summary Delete concrete post
// @Description Delete post from database using ID
// @ID get-string-by-int
// @Tags Posts
// @Accept  json
// @Produce  json
// @Param id path int true "Post ID"
// @Success 200 {object} models.PostResponse
// @Failure 422 {object} v1.ResponseWithData
// @Failure 500 {object} v1.DefaultResponse
// @Router /posts/{id} [delete]
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
