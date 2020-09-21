package models

import (
	"github.com/Kamva/mgm/v3"
	"loonify/config"
)

type Category struct {
	mgm.DefaultModel `bson:",inline"`
	ParentID         uint   `bson:"parent_id" json:"parent_id,omitempty" validate:"omitempty,numeric"`
	Name             string `bson:"name" json:"name" validate:"required"`
}

type CategoryResponse struct {
	config.DefaultResponse
	Data Category
}