package models

import (
	"github.com/Kamva/mgm/v3"
	"go/types"
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

func NewLocation(
	mapsID uint,
	placeID uint,
	url string,
	name string,
	formattedAddress string,
	addressComponents types.Array,
	geometry types.Array,
) *Location {
	return &Location{
		MapsID:            mapsID,
		PlaceID:           placeID,
		URL:               url,
		Name:              name,
		FormattedAddress:  formattedAddress,
		AddressComponents: addressComponents,
		Geometry:          geometry,
	}
}
