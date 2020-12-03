package common

import (
	"context"
	"fmt"
	"github.com/elastic/go-elasticsearch/v7"
	_ "github.com/lib/pq"
	"loonify/ent"
	"os"
)

var (
	ElasticClient *elasticsearch.Client
	PostgresClient *ent.Client

	elasticConnectionConfiguration = elasticsearch.Config{
		Username: os.Getenv("ELASTIC_USERNAME"),
		Password: os.Getenv("ELASTIC_PASSWORD"),
		Addresses: []string{
			"https://" + os.Getenv("ELASTIC_HOST") + ":" + os.Getenv("ELASTIC_PORT"),
		},
	}

	postgresConnectionURI = fmt.Sprintf(
		"host=%s port=%s user=%s dbname=%s password=%s",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PASS"),
	)
)

func InitDatabases() {
	makeElasticConnection()
	makePostgresConnection()
}

func makeElasticConnection() {
	var err error

	ElasticClient, err = elasticsearch.NewClient(elasticConnectionConfiguration)
	if err != nil {
		Log.Panic(err)
	}

	Log.Info("Connection to ElasticSearch established")
}

func makePostgresConnection() {
	var err error

	PostgresClient, err = ent.Open("postgres", postgresConnectionURI)
	if err != nil {
		panic(err)
	}
	Log.Info("Connection to Postgres established")

	//defer PostgresClient.Close()
	//Log.Info("Connection to Postgres closed")

	err = PostgresClient.Schema.Create(context.Background())
	if err != nil {
		Log.Panic(err)
	}

	Log.Info("Database migrations completed")
}
