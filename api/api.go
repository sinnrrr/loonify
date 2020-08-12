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
	"github.com/jinzhu/gorm"
	"github.com/labstack/echo/v4"
	"gitlab.com/loonify/web/api/v1"
	"net/http"
)

func Init(e *echo.Group, db *gorm.DB, echo *echo.Echo) {
	v1Group := e.Group("/v1")
	V1Group(v1Group, db)

	e.GET("/", RedirectToCurrent(echo.Reverse("api.current")))

	//h, err := graphql.NewHandler(db)
	//if err != nil {
	//	log.Fatal(err)
	//}
	//
	//e.POST("/graphql", e.WrapHandler(h))
}

func V1Group(e *echo.Group, db *gorm.DB) {
	e.GET("/", v1.Welcome()).Name = "api.current"

	users := e.Group("/users")
	UsersV1Group(users, db)

	posts := e.Group("/posts")
	PostsV1Group(posts, db)
}

func UsersV1Group(e *echo.Group, db *gorm.DB) {
	e.GET("/", v1.GetUsers(db))
	e.POST("/", v1.CreateUser(db))
	e.GET("/users/:id", v1.ReadUser(db))
	e.PUT("/users/:id", v1.UpdateUser(db))
	e.DELETE("/users/:id", v1.DeleteUser(db))
}

func PostsV1Group(e *echo.Group, db *gorm.DB) {
	e.GET("/", v1.GetPosts(db))
}

func RedirectToCurrent(current string) echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.Redirect(http.StatusSeeOther, current)
	}
}
