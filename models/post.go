package models

import (
	"github.com/Kamva/mgm/v3"
	v1 "loonify/api/v1"
)

/*Post struct*/
type Post struct {
	mgm.DefaultModel `bson:",inline"`
	UserID           uint   `bson:"user_id" json:"user_id" validate:"required,numeric"`
	AddressID        uint   `bson:"address_id" json:"address_id" validate:"required,numeric"`
	CategoryID       uint   `bson:"category_id" json:"category_id" validate:"required,numeric"`
	LocationID       uint   `bson:"location_id" json:"location_id" validate:"required,numeric"`
	Title            string `bson:"title" json:"title" validate:"required"`
	Description      string `bson:"description" json:"description" validate:"required"`
	Status           string `bson:"status" json:"status" validate:"required"`
	Reward           string `bson:"reward" json:"reward,omitempty"`
}

type PostResponse struct {
	v1.DefaultResponse
	Data Post
}