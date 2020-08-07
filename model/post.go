package model

/*Post struct*/
type Post struct {
	ID          uint   `gorm:"primary_key" json:"id"`
	UserID      uint   `json:"user_id"`
	AddressID   uint   `json:"post_id"`
	CategoryID  uint   `json:"category_id"`
	Title       MyString `json:"title"`
	Description MyString `json:"description"`
	Latitude    int64  `json:"lat"`
	Longitude   int64  `json:"lng"`
	Status      string `gorm: "type:enum" json:"status"`
	Reward      string `json:"reward"`
}

/*TableName function*/
func (Post) TableName() string { return "posts" }