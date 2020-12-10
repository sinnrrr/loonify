// @title Loonify API
// @version 1.0
package main

import (
	_ "github.com/joho/godotenv/autoload"
	"loonify/databases"
	"loonify/router"
)

func main() {
	//pass := "123asd123"
	//str, _ := bcrypt.GenerateFromPassword([]byte("fb5f4b41-a50b-4ec7-b541-2976a8c11dfa"), bcrypt.DefaultCost)
	//fmt.Println(string(str))
	//fmt.Println(bcrypt.CompareHashAndPassword(str, []byte(pass)))
	//fmt.Println(bcrypt.Cost([]byte(pass)))

	router.OutputLogo()
	databases.Init()
	router.RunRouter()
}
