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
	"github.com/go-bongo/bongo"
	"github.com/labstack/echo/v4"
	//"gitlab.com/loonify/web/api/graphql"
	"gitlab.com/loonify/web/api/v1"
	"net/http"
)

func Init(api *echo.Group, client *bongo.Connection, echo *echo.Echo) {
	v1Group := api.Group("/v1")
	V1Group(v1Group, client)

	api.GET("/", RedirectToCurrent(echo.Reverse("api.current")))

	//h, err := graphql.NewHandler(db)
	//if err != nil {
	//	log.Fatal(err)
	//}
	//
	//e.POST("/graphql", h.WrapHandler(h))
}

func V1Group(v1 *echo.Group, client *bongo.Connection) {
	v1.GET("/", v1.Welcome()).Name = "api.current"

	users := v1.Group("/users")
	UsersV1Group(users, client)

	posts := v1.Group("/posts")
	PostsV1Group(posts, client)
}

func UsersV1Group(users *echo.Group, client *bongo.Connection) {
	usersCollection := client.Collection("users")

	users.GET("/", v1.GetUsers(usersCollection))
	users.POST("/", v1.CreateUser(usersCollection))
	users.GET("/users/:id", v1.ReadUser(usersCollection))
	users.PUT("/users/:id", v1.UpdateUser(usersCollection))
	users.DELETE("/users/:id", v1.DeleteUser(usersCollection))
}

func PostsV1Group(posts *echo.Group, client *bongo.Connection) {
	postsCollection := client.Collection("posts")

	posts.GET("/", v1.GetPosts(postsCollection))
}

func RedirectToCurrent(current string) echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.Redirect(http.StatusSeeOther, current)
	}
}
