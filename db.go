package main

import (
	"fmt"
	"github.com/go-bongo/bongo"
	"os"
)

func NewDB() *bongo.Connection {
	config := &bongo.Config{
		ConnectionString: os.Getenv("MONGODB_DATABASE_URL"),
		Database:         os.Getenv("DATABASE_NAME"),
	}

	client, err := bongo.Connect(config)
	logFatal(err)

	fmt.Printf("%s Connection to MongoDB established successfully\n", PREFIX)
	return client
}
