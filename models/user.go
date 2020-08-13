package models

import (
	"github.com/go-bongo/bongo"
)

/*User struct*/
type User struct {
	bongo.DocumentBase `bson:",inline"`
	AddressID          uint `json:"address_id"`
	Name               MyString `json:"name" validate:"required,uppercase"`
	Email              MyString `json:"email" validate:"email"`
	Phone              MyString `json:"phone" validate:"startswith=+,number"`
	Password           MyString `json:"password"`
	diffTracker        *bongo.DiffTracker
}

func (m *User) GetDiffTracker() *bongo.DiffTracker {
	if m.diffTracker == nil {
		m.diffTracker = bongo.NewDiffTracker(m)
	}

	return m.diffTracker
}

var user = &User{}
