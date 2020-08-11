package main

import (
	_ "github.com/joho/godotenv/autoload"
	"log"
	"os"
)

func init() {
	if os.Getenv("PORT") == "" {
		err := os.Setenv("PORT", "80")
		log.Fatal(err)
	}

	if os.Getenv("CLEARDB_DATABASE_URL") == "" {
		err := os.Setenv(
			"CLEARDB_DATABASE_URL",
			"bcd44dd5523b18:62666710@tcp(eu-cdbr-west-03.cleardb.net:3306)/heroku_4959d34bb773751?parseTime=true",
		)

		logFatal(err)
	}
}
