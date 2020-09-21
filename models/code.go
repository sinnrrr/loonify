package models

import (
	"loonify/config"
)

type Code struct {
	Email string `bson:"email" json:"email" validate:"email"`
	Code  string `bson:"code" json:"code" validate:"numeric,len=6"`
}

type CodeResponse struct {
	config.DefaultResponse
	Data Code
}
