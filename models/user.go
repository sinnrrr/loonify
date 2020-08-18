package models

import (
	"github.com/Kamva/mgm/v3"
)

/*User struct*/
type User struct {
	mgm.DefaultModel `bson:",inline"`
	AddressID        uint   `bson:"address_id" json:"address_id"`
	Name             string `bson:"name" json:"name"`
	Email            string `bson:"email" json:"email"`
	Phone            string `bson:"phone" json:"phone"`
	Password         string `bson:"password" json:"password"`
}

func NewUser(
	addressID uint,
	name string,
	email string,
	phone string,
	password string,
) *User {
	return &User{
		AddressID: addressID,
		Name:      name,
		Email:     email,
		Phone:     phone,
		Password:  password,
	}
}
