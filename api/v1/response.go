package v1

type Response struct {
	Status  string      `json:"status"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

func BadResponse(err error, mode string) Response {
	return Response{
		Status:  mode,
		Message: err.Error(),
	}
}