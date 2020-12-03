package common

import (
	"github.com/sirupsen/logrus"
	"gopkg.in/go-extras/elogrus.v7"
	"os"
)

var Log = logrus.New()

func InitLogger() {
	elasticHook, err := elogrus.NewAsyncElasticHook(
		ElasticClient,
		os.Getenv("ELASTIC_HOST"),
		logrus.DebugLevel,
		"log",
	)
	if err != nil {
		Log.Panic(err)
	}

	Log.Hooks.Add(elasticHook)
}
