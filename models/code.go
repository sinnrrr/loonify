package models

import v1 "loonify/api/v1"

type Code struct {
	Email string `bson:"email" json:"email" validate:"email"`
	Code  string `bson:"code" json:"code" validate:"numeric,len=6"`
}

type CodeResponse struct {
	v1.DefaultResponse
	Data Code
}