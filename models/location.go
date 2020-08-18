package models

import (
	"github.com/go-bongo/bongo"
	"go/types"
)

type Location struct {
	bongo.DocumentBase `bson:",inline"`
	MapsID             uint
	PlaceID            uint
	URL                string
	Icon               string
	Name               string
	FormattedAddress   string
	AddressComponents  types.Array
	Geometry           types.Array
	diffTracker        *bongo.DiffTracker
}

func (m *Location) GetDiffTracker() *bongo.DiffTracker {
	if m.diffTracker == nil {
		m.diffTracker = bongo.NewDiffTracker(m)
	}

	return m.diffTracker
}

var location = &Location{}
