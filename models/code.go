package models

type Code struct {
	Email            string `bson:"email" json:"email" validate:"email"`
	Code            string `bson:"code" json:"code" validate:"numeric,len=6"`
}