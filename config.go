package main

import (
	"github.com/Kamva/mgm/v3"
	_ "github.com/joho/godotenv/autoload"
	"go.mongodb.org/mongo-driver/mongo/options"
	"os"
	"time"
)

func init() {
	if os.Getenv("PORT") == "" {
		err := os.Setenv("PORT", "80")
		logFatal(err)
	}

	if os.Getenv("DATABASE_NAME") == "" {
		err := os.Setenv("DATABASE_NAME", "loonify")
		logFatal(err)
	}

	if os.Getenv("CLEARDB_DATABASE_URL") == "" {
		err := os.Setenv(
			"CLEARDB_DATABASE_URL",
			"bcd44dd5523b18:62666710@tcp(eu-cdbr-west-03.cleardb.net:3306)/heroku_4959d34bb773751?parseTime=true",
		)

		logFatal(err)
	}

	if os.Getenv("MONGODB_DATABASE_URL") == "" {
		err := os.Setenv(
			"MONGODB_DATABASE_URL",
			"mongodb+srv://sinnrrr:1532112351@cluster0.zlo3n.mongodb.net/loonify?retryWrites=true&w=majority",
		)

		logFatal(err)
	}

	err := mgm.SetDefaultConfig(&mgm.Config{CtxTimeout:12 * time.Second}, "loonify", options.Client().ApplyURI(os.Getenv("MONGODB_DATABASE_URL")))
	logFatal(err)
}
