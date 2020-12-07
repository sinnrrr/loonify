package models

import (
	"gorm.io/gorm"
)

type Post struct {
	gorm.Model
	Title       *string `gorm:"type:string"`
	Description *string
	OwnerID     int
	Owner       User
}
