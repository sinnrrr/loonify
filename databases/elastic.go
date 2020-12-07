package databases

import (
	"github.com/elastic/go-elasticsearch/v7"
	"loonify/common"
	"os"
)

var (
	ElasticClient *elasticsearch.Client

	elasticConnectionConfiguration = elasticsearch.Config{
		Username: os.Getenv("ELASTIC_USERNAME"),
		Password: os.Getenv("ELASTIC_PASSWORD"),
		Addresses: []string{
			"https://" + os.Getenv("ELASTIC_HOST") + ":" + os.Getenv("ELASTIC_PORT"),
		},
	}
)

func makeElasticConnection() {
	var err error

	ElasticClient, err = elasticsearch.NewClient(elasticConnectionConfiguration)
	if err != nil {
		common.Log.Panic(err)
	}

	common.Log.Info("Connection to " + common.YellowColor + "Elasticsearch" + common.ResetColor + " established")
}