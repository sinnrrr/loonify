// @title Loonify API
// @version 1.0
package main

import (
	_ "github.com/joho/godotenv/autoload"
	"loonify/databases"
	"loonify/router"
)

func main() {
	router.OutputLogo()
	databases.Init()
	router.RunRouter()
}