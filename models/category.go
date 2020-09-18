package models

import (
	"github.com/Kamva/mgm/v3"
	v1 "loonify/api/v1"
)

type Category struct {
	mgm.DefaultModel `bson:",inline"`
	ParentID         uint   `bson:"parent_id" json:"parent_id,omitempty" validate:"omitempty,numeric"`
	Name             string `bson:"name" json:"name" validate:"required"`
}

type CategoryResponse struct {
	v1.DefaultResponse
	Data Category
}