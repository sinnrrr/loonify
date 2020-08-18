package routes

import (
	"github.com/labstack/echo/v4"
	//"loonify/api/graphql"
	"loonify/api/v1"
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
	LocationsV1Group(v1Group)
	CategoriesV1Group(v1Group)
}

func UsersV1Group(v1Group *echo.Group) {
	users := v1Group.Group("/users")
	users.GET("/", v1.QueryUsers())
	users.POST("/", v1.CreateUser())
	users.GET("/:id/", v1.ReadUser())
	users.PUT("/:id/", v1.UpdateUser())
	users.DELETE("/:id/", v1.DeleteUser())
}

func PostsV1Group(v1Group *echo.Group) {
	posts := v1Group.Group("/posts")
	posts.GET("/", v1.QueryPosts())
	posts.POST("/", v1.CreatePost())
	posts.GET("/:id/", v1.ReadPost())
	posts.PUT("/:id/", v1.UpdatePost())
	posts.DELETE("/:id/", v1.DeletePost())
}

func LocationsV1Group(v1Group *echo.Group) {
	locations := v1Group.Group("/locations")
	locations.GET("/", v1.QueryLocations())
	locations.POST("/", v1.CreateLocation())
	locations.GET("/:id/", v1.ReadLocation())
	locations.PUT("/:id/", v1.UpdateLocation())
	locations.DELETE("/:id/", v1.DeleteLocation())
}

func CategoriesV1Group(v1Group *echo.Group) {
	categories := v1Group.Group("/categories")
	categories.GET("/", v1.QueryLocations())
	categories.POST("/", v1.CreateLocation())
	categories.GET("/:id/", v1.ReadLocation())
	categories.PUT("/:id/", v1.UpdateLocation())
	categories.DELETE("/:id/", v1.DeleteLocation())
}

func RedirectToCurrent(current string) echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.Redirect(http.StatusSeeOther, current)
	}
}
