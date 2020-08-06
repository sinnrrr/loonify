package model

import (
	"database/sql/driver"
	"time"
)

type MyString string

/*User struct*/
type User struct {
	ID        uint       `gorm:"primary_key" json:"id"`
	AddressID uint       `gorm:"default:null" json:"post_id"`
	Email     MyString   `gorm:"unique;not null" json:"email"`
	Password  MyString   `gorm:"not null" json:"password"`
	Phone     MyString   `gorm:"default:null;type:varchar(32)" json:"phone"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
	DeletedAt *time.Time `json:"deleted_at"`
}

func (s MyString) Value() (driver.Value, error) {
	if s == "" {
		return nil, nil
	}
	return string(s), nil
}

/*TableName function*/
func (User) TableName() string { return "users" }
