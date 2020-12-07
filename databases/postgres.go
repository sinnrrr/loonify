package databases

import (
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"loonify/common"
	"loonify/models"
	"os"
)

var (
	PostgresClient *gorm.DB

	postgresConnectionURI = fmt.Sprintf(
		"host=%s port=%s user=%s dbname=%s password=%s",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PASS"),
	)
)

func makePostgresConnection() {
	var err error

	PostgresClient, err = gorm.Open(postgres.Open(postgresConnectionURI), &gorm.Config{})
	if err != nil {
		common.Log.Panic(err)
	}
	common.Log.Info("Connection to " + common.YellowColor + "Postgres" + common.ResetColor + " established")

	err = PostgresClient.AutoMigrate(models.User{}, models.Post{})
	if err != nil {
		common.Log.Panic(err)
	}
	common.Log.Info("Database migrations completed")
}
