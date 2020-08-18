// Package classification loonify.
//
// Documentation of our awesome API.
//
//     Schemes: http
//     Version: 0.1
//
//     Consumes:
//     - application/json
//
//     Produces:
//     - application/json
//
// swagger:meta

package api

import (
	"github.com/labstack/echo/v4"

	//"gitlab.com/loonify/web/api/graphql"
	"gitlab.com/loonify/web/api/v1"
	"net/http"
)

func Init(e *echo.Echo) {
	api := e.Group("/api")
	V1Group(api)

	api.GET("/", RedirectToCurrent(e.Reverse("api.current")))

	//h, err := graphql.NewHandler(db)
	//if err != nil {
	//	log.Fatal(err)
	//}
	//
	//e.POST("/graphql", h.WrapHandler(h))
}

func V1Group(api *echo.Group) {
	v1Group := api.Group("/v1")
	v1Group.GET("/", v1.Welcome()).Name = "api.current"

	UsersV1Group(v1Group)
	PostsV1Group(v1Group)
}

func UsersV1Group(v1Group *echo.Group) {
	users := v1Group.Group("/users")
	users.GET("/", v1.QueryUsers())
	users.POST("/", v1.CreateUser())
	users.GET("/users/:id", v1.ReadUser())
	users.PUT("/users/:id", v1.UpdateUser())
	users.DELETE("/users/:id", v1.DeleteUser())
}

func PostsV1Group(v1Group *echo.Group) {
	posts := v1Group.Group("/posts")
	posts.GET("/", v1.QueryPosts())
}

func RedirectToCurrent(current string) echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.Redirect(http.StatusSeeOther, current)
	}
}
