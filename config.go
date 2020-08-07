package main

import (
	"github.com/joho/godotenv"
	"os"
)

func init() {
	if err := godotenv.Load(); err != nil { logFatal(err) }

	if os.Getenv("PORT") == "" {
		err := os.Setenv("PORT", "80")
		logFatal(err)
	}

	if os.Getenv("CLEARDB_DATABASE_URL") == "" {
		err := os.Setenv(
			"CLEARDB_DATABASE_URL",
			"bcd44dd5523b18:62666710@tcp(eu-cdbr-west-03.cleardb.net:3306)/heroku_4959d34bb773751?parseTime=true",
		)

		logFatal(err)
	}
}
