package models

import (
	"github.com/go-bongo/bongo"
)

/*Post struct*/
type Post struct {
	bongo.DocumentBase `bson:",inline"`
	UserID             uint
	AddressID          uint
	CategoryID         uint
	LocationID         uint
	Title              MyString
	Description        MyString
	Status             MyString
	Reward             MyString
	diffTracker        *bongo.DiffTracker
}

func (m *Post) GetDiffTracker() *bongo.DiffTracker {
	if m.diffTracker == nil {
		m.diffTracker = bongo.NewDiffTracker(m)
	}

	return m.diffTracker
}

var post = &Post{}