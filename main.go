// @title Loonify API
// @version 1.0
// @host loonify.herokuapp.com
// @BasePath /v1
package main

import (
	_ "github.com/joho/godotenv/autoload"
	_ "loonify/docs"
	"loonify/server"
)

func main() {
	server.Init()
}