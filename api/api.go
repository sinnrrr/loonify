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
	"go.mongodb.org/mongo-driver/mongo"

	//"gitlab.com/loonify/web/api/graphql"
	"gitlab.com/loonify/web/api/v1"
	"net/http"
)

func Init(api *echo.Group, db *mongo.Database, echo *echo.Echo) {
	v1Group := api.Group("/v1")
	V1Group(v1Group, db)

	api.GET("/", RedirectToCurrent(echo.Reverse("api.current")))

	//h, err := graphql.NewHandler(db)
	//if err != nil {
	//	log.Fatal(err)
	//}
	//
	//e.POST("/graphql", h.WrapHandler(h))
}

func V1Group(v1Group *echo.Group, db *mongo.Database) {
	v1Group.GET("/", v1.Welcome()).Name = "api.current"

	users := v1Group.Group("/users")
	UsersV1Group(users, db)

	posts := v1Group.Group("/posts")
	PostsV1Group(posts, db)
}

func UsersV1Group(users *echo.Group, db *mongo.Database) {
	usersCollection := db.Collection("users")

	users.GET("/", v1.QueryUsers(usersCollection))
	users.POST("/", v1.CreateUser(usersCollection))
	users.GET("/users/:id", v1.ReadUser(usersCollection))
	users.PUT("/users/:id", v1.UpdateUser(usersCollection))
	users.DELETE("/users/:id", v1.DeleteUser(usersCollection))
}

func PostsV1Group(posts *echo.Group, db *mongo.Database) {
	postsCollection := db.Collection("posts")

	posts.GET("/", v1.QueryPosts(postsCollection))
}

func RedirectToCurrent(current string) echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.Redirect(http.StatusSeeOther, current)
	}
}
