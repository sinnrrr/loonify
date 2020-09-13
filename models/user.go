package models

import (
	"github.com/Kamva/mgm/v3"
)

/*User struct*/
type User struct {
	mgm.DefaultModel `bson:",inline"`
	AddressID        uint   `bson:"address_id" json:"address_id,omitempty" validate:"numeric"`
	Name             string `bson:"name" json:"name" validate:"required"`
	Email            string `bson:"email" json:"email,omitempty" validate:"email"`
	Phone            string `bson:"phone" json:"phone,omitempty" validate:"number"`
	Password         string `bson:"password" json:"password" validate:"required"`
	Token            string `bson:"token" json:"token,omitempty" validate:"uuid4_rfc4122"`
}
