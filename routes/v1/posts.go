package v1

import (
	"github.com/labstack/echo/v4"
	"loonify/api/token"
	"loonify/api/v1/posts"
)

func PostsGroup(v1Group *echo.Group) {
	postsGroup := v1Group.Group("/posts")

	postsGroup.GET("/", posts.Query)
	postsGroup.POST("/", posts.Create, token.InitMiddleware("post", "create"))
	postsGroup.GET("/:id/", posts.Read)
	postsGroup.PUT("/:id/", posts.Update, token.InitMiddleware("post", "update"))
	postsGroup.DELETE("/:id/", posts.Delete, token.InitMiddleware("post", "delete"))
}
