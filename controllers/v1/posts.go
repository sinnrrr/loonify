package v1

import (
	"github.com/Kamva/mgm/v3"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"loonify/config"
	"loonify/models"
	"net/http"
)

type PostsController struct{}

// Query godoc
// @Summary List posts from database
// @Tags Posts
// @Accept  json
// @Produce  json
// @Success 200 {object} models.PostResponse
// @Failure 500 {object} config.DefaultResponse
// @Router /posts [get]
func (PostsController) Query(c echo.Context) error {
	var posts []models.Post

	err := mgm.Coll(&models.Post{}).SimpleFind(&posts, bson.D{})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, config.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusOK, config.GoodResponseWithData(posts, "Posts were successfully retrieved"))
}

// Create godoc
// @Summary Create post
// @Description Create post using provided information
// @Tags Posts
// @Accept  json
// @Produce  json
// @Success 200 {object} models.PostResponse
// @Failure 400 {object} config.DefaultResponse
// @Failure 500 {object} config.DefaultResponse
// @Router /posts [post]
func (PostsController) Create(c echo.Context) error {
	post := new(models.Post)

	if err := c.Bind(post); err != nil {
		return c.JSON(http.StatusBadRequest, config.FailResponse(err.Error()))
	}

	if err := config.Validator.Struct(post); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, config.ValidationResponse(config.ProceedValidation(err)))
	}

	err := mgm.Coll(post).Create(post)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, config.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusCreated, config.GoodResponseWithData(post, "Post was successfully created"))
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
func (PostsController) Read(c echo.Context) error {
	post := &models.Post{}
	coll := mgm.Coll(post)

	_ = coll.FindByID(c.Param("id"), post)

	return c.JSON(http.StatusOK, config.GoodResponseWithData(post, "Post was successfully retrieved"))
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
// @Failure 400 {object} config.DefaultResponse
// @Failure 422 {object} config.ResponseWithData
// @Failure 500 {object} config.DefaultResponse
// @Router /posts/{id} [post]
func (PostsController) Update(c echo.Context) error {
	post := &models.Post{}
	coll := mgm.Coll(post)

	_ = coll.FindByID(c.Param("id"), post)

	if err := c.Bind(post); err != nil {
		return c.JSON(http.StatusBadRequest, config.FailResponse(err.Error()))
	}

	if err := config.Validator.Struct(post); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, config.ValidationResponse(config.ProceedValidation(err)))
	}

	err := mgm.Coll(post).Update(post)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, config.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusOK, config.GoodResponseWithData(post, "Post was successfully updated"))
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
// @Failure 422 {object} config.ResponseWithData
// @Failure 500 {object} config.DefaultResponse
// @Router /posts/{id} [delete]
func (PostsController) Delete(c echo.Context) error {
	post := &models.Post{}
	coll := mgm.Coll(post)

	_ = coll.FindByID(c.Param("id"), post)

	err := mgm.Coll(post).Delete(post)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, config.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusOK, config.GoodResponse("Post was successfully deleted"))
}
