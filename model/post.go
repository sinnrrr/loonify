package model

/*Post struct*/
type Post struct {
	ID        uint       `gorm:"primary_key" json:"id"`
	UserID      uint   `json:"user_id"`
	AddressID uint       `gorm:"default:null" json:"post_id"`
	CategoryID  string `json:"category_id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Latitude    int64  `json:"lat"`
	Longitude   int64  `json:"lng"`
	Status      string `json:"status"`
	Reward      string `json:"reward"`
}

/*TableName function*/
func (Post) TableName() string { return "posts" }
