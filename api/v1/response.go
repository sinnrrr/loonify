package v1

type Response struct {
	Status  string      `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

func GoodResponse(data interface{}, message string) Response {
	return Response{
		Status: "success",
		Message: message,
		Data: data,
	}
}

func ErrorResponse(err error) Response {
	return Response{
		Status:  "error",
		Message: err.Error(),
	}
}

func FailResponse(err error) Response {
	return Response{
		Status: "fail",
		Message: err.Error(),
	}
}