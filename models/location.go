package models

import (
	"github.com/Kamva/mgm/v3"
	"go/types"
	"loonify/config"
)

type Location struct {
	mgm.DefaultModel  `bson:",inline"`
	PlaceID           uint `bson:"place_id" json:"place_id" validate:"required,numeric"`
	AddressComponents types.Array `bson:"address_components" json:"address_components" validate:"required"`
	Geometry          types.Array `bson:"geometry" json:"geometry" validate:"required"`
	URL               string `bson:"url" json:"url" validate:"required"`
	Name              string `bson:"name" json:"name" validate:"required"`
	FormattedAddress  string `bson:"formatted_address" json:"formatted_address" validate:"required"`
}

type LocationResponse struct {
	config.DefaultResponse
	Data Location
}