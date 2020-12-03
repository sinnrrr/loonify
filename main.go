// @title Loonify API
// @version 1.0
package main

import (
	_ "github.com/joho/godotenv/autoload"
	"loonify/common"
)

func main() {
	//common.InitLogger()
	common.InitDatabases()
	common.InitRouter()
}