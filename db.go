package main

import (
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

/*NewDB method*/
func NewDB() (*gorm.DB, error) {
	return gorm.Open("mysql", os.Getenv("CLEARDB_DATABASE_URL"))
}