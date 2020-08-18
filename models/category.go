package models

import "github.com/Kamva/mgm/v3"

type Category struct {
	mgm.DefaultModel `bson:",inline"`
	ParentID         uint   `bson:"parent_id" json:"parent_id,omitempty" validate:"numeric"`
	Name             string `bson:"name" json:"name" validate:"required"`
}

func NewCategory(
	parentID uint,
	name string,
) *Category {
	return &Category{
		ParentID: parentID,
		Name:     name,
	}
}
