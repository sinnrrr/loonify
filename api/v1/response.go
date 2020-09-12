package v1

type DefaultResponse struct {
	Status  string `json:"status"`
	Message string `json:"message,omitempty"`
}

type ResponseWithData struct {
	Status  string      `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
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
