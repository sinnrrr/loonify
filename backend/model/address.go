package model

type Address struct {
	ID       uint    `gorm:"primary_key" json:"id"`
	ParentID uint    `gorm:"default:null" json:"parent_id"`
	Name     *string  `json:"address"`
	Lat      float32 `json:"lat"`
	Lng      float32 `json:"lng"`
}

func (Address) TableName() string { return "addresses" }