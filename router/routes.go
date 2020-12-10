package router

import (
	"github.com/pangpanglabs/echoswagger/v2"
	"loonify/common"
	"loonify/handlers"
	"net/http"
)

// Registering all routes
func registerRoutes(r echoswagger.ApiRoot) {
	usersRoutes(r)
	authRoutes(r)
}

// Registering users routes
func usersRoutes(r echoswagger.ApiRoot) {
	usersGroup := initGroup(
		r,
		"Users",
		"/users",
		true,
	)

	common.DescribeHandler(
		usersGroup.GET("", handlers.QueryUsers),
		http.StatusOK,
		http.StatusInternalServerError,
	)

	common.DescribeHandler(
		usersGroup.GET("/:id", handlers.ReadUser),
		http.StatusOK,
		http.StatusBadRequest,
	)

	common.DescribeHandler(
		usersGroup.PUT("/:id", handlers.UpdateUser),
		http.StatusOK,
		http.StatusUnprocessableEntity,
	)
}

// Registering auth routes
func authRoutes(r echoswagger.ApiRoot) {
	authGroup := initGroup(
		r,
		"Auth",
		"/auth",
		false,
	)

	common.DescribeHandler(
		authGroup.POST("/signup", handlers.Signup),
		http.StatusCreated,
		http.StatusUnprocessableEntity,
	)

	common.DescribeHandler(
		authGroup.POST("/login", handlers.Login),
		http.StatusOK,
		http.StatusUnprocessableEntity,
	)
}
