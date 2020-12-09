package databases

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"loonify/common"
	"loonify/config"
	"loonify/models"
)

var (
	PostgresClient *gorm.DB
)

// Initialise Postgres connection using ORM
func makePostgresConnection() {
	var err error

	PostgresClient, err = gorm.Open(
		postgres.Open(config.PostgresConnectionURI),
		&gorm.Config{},
	)
	if err != nil {
		common.Log.Panic(err)
	}
	common.Log.Info("Connection to " + config.YellowColor + "Postgres" + config.ResetColor + " established")

	err = PostgresClient.AutoMigrate(
		models.User{},
		models.Post{},
	)
	if err != nil {
		common.Log.Panic(err)
	}
	common.Log.Info("Database migrations completed")
}
