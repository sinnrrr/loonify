package databases

import (
	_ "github.com/lib/pq"
	"github.com/sirupsen/logrus"
	"gopkg.in/go-extras/elogrus.v7"
	"gorm.io/gorm"
	"loonify/common"
	"os"
)

func Init() {
	makeElasticConnection()
	makePostgresConnection()

	configureLogger()
}

func configureLogger() {
	elasticHook, err := elogrus.NewAsyncElasticHook(
		ElasticClient,
		os.Getenv("ELASTIC_HOST"),
		logrus.DebugLevel,
		"log",
	)
	if err != nil {
		common.Log.Panic(err)
	}
	common.Log.Hooks.Add(elasticHook)
}

func Paginate(
	page int,
	size int,
) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if page == 0 {
			page = 1
		}

		if size <= 0 {
			size = 10
		} else if size > 100 {
			size = 100
		}

		offset := (page - 1) * size
		return PostgresClient.
			Offset(offset).
			Limit(size)
	}
}
