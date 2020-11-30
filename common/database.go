package common

import (
	"context"
	"fmt"
	_ "github.com/lib/pq"
	"loonify/ent"
	"os"
)

const connectionURIPattern = "host=%s port=%s user=%s dbname=%s password=%s"

func InitDatabase() {
	connectionURI := fmt.Sprintf(
		connectionURIPattern,
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PASS"),
	)

	client, err := ent.Open("postgres", connectionURI)
	if err != nil {
		panic(err)
	}
	defer client.Close()

	if err := client.Schema.Create(context.Background()); err != nil {
		panic(err)
	}
}
