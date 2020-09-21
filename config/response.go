package config

import (
	"github.com/go-playground/validator/v10"
	"strings"
)

type DefaultResponse struct {
	Status  string `json:"status"`
	Message string `json:"message,omitempty"`
}

type ResponseWithData struct {
	Status  string      `json:"status"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
	Errors  interface{} `json:"errors,omitempty"`
}

type CodeResponse struct {
	Code string `json:"code"`
}

func GoodResponse(message string) DefaultResponse {
	return DefaultResponse{
		Status:  "success",
		Message: message,
	}
}

func GoodResponseWithData(data interface{}, message string) ResponseWithData {
	return ResponseWithData{
		Status:  "success",
		Message: message,
		Data:    data,
	}
}

func ErrorResponse(message string) DefaultResponse {
	return DefaultResponse{
		Status:  "error",
		Message: message,
	}
}

func FailResponse(message string) DefaultResponse {
	return DefaultResponse{
		Status:  "fail",
		Message: message,
	}
}

func ValidationResponse(errors map[string]map[string]string) ResponseWithData {
	return ResponseWithData{
		Status:  "fail",
		Message: "Validation error",
		Errors:    errors,
	}
}

func ProceedValidation(err error) map[string]map[string]string {
	validationErrors := make(map[string]map[string]string)

	for _, err := range err.(validator.ValidationErrors) {
		validationErrors[strings.ToLower(err.Field())] = map[string]string{
			"rule": err.ActualTag(),
		}
	}

	return validationErrors
}