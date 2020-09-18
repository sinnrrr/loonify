package models

import (
	"github.com/Kamva/mgm/v3"
	v1 "loonify/api/v1"
)

/*User struct*/
type User struct {
	mgm.DefaultModel `bson:",inline"`
	AddressID        uint   `bson:"address_id" json:"address_id,omitempty" validate:"numeric"`
	Name             string `bson:"name" json:"name" validate:"required"`
	Email            string `bson:"email" json:"email,omitempty" validate:"omitempty,email"`
	Phone            string `bson:"phone" json:"phone,omitempty" validate:"omitempty,number"`
	Password         string `bson:"password" json:"password" validate:"required"`
	Token            string `bson:"token" json:"token,omitempty" validate:"omitempty,uuid4_rfc4122"`
}

type UserResponse struct {
	v1.DefaultResponse
	Data User
}
