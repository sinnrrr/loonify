package databases

import (
	"github.com/elastic/go-elasticsearch/v7"
	"loonify/common"
	"loonify/config"
)

var ElasticClient *elasticsearch.Client

// Initialise Elasticsearch connection
func makeElasticConnection() {
	var err error

	ElasticClient, err = elasticsearch.NewClient(config.ElasticConnection)
	if err != nil {
		common.Log.Panic(err)
	}

	common.Log.Info("Connection to " + config.YellowColor + "Elasticsearch" + config.ResetColor + " established")
}
