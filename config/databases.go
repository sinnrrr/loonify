package config

import (
	"fmt"
	"github.com/elastic/go-elasticsearch/v7"
	"os"
)

const (
	elasticURITemplate  = "https://%s:%s"
	postgresURITemplate = "host=%s port=%s user=%s dbname=%s password=%s"
)

var (
	PostgresConnectionURI = fmt.Sprintf(
		postgresURITemplate,
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PASS"),
	)

	ElasticConnection = elasticsearch.Config{
		Username: os.Getenv("ELASTIC_USERNAME"),
		Password: os.Getenv("ELASTIC_PASSWORD"),
		Addresses: []string{
			fmt.Sprintf(
				elasticURITemplate,
				os.Getenv("ELASTIC_HOST"),
				os.Getenv("ELASTIC_PORT"),
			),
		},
	}
)
