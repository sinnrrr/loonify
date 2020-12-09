package common

import (
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"github.com/pangpanglabs/echoswagger/v2"
	"net/http"
	"reflect"
)

// TODO: readme update
// TODO: posts

// Response template
type DefaultResponse struct {
	Ok      bool        `json:"ok"`
	Message interface{} `json:"message"`
	Data    interface{} `json:"data,omitempty" swagger:"allowEmpty"`
	Meta    interface{} `json:"meta,omitempty" swagger:"allowEmpty"`
}

// Constructor for good response
func GoodResponse(
	c echo.Context,
	data interface{},
	options ...interface{},
) error {
	var (
		code    int
		message string
	)

	if options != nil {
		if options[0] != nil {
			// checking type to decide whether
			// it is response code or message
			switch reflect.TypeOf(options[0]).Kind() {
			case reflect.Int:
				code = options[0].(int)
				break
			case reflect.String:
				message = options[0].(string)
				break
			}
		}

		// if options have 2 attributes
		if len(options) > 1 {
			message = options[1].(string)
		}
	}

	if code == 0 {
		code = http.StatusOK
	}

	if message == "" {
		message = http.StatusText(code)
	}

	return c.JSON(
		code,
		DefaultResponse{
			Ok:      true,
			Message: message,
			Data:    data,
		},
	)
}

// Custom HTTP error handler, that implements DefaultResponse and logger
func CustomErrorHandler(
	err error,
	c echo.Context,
) {
	he, ok := err.(*echo.HTTPError)
	if ok {
		if he.Internal != nil {
			if herr, ok := he.Internal.(*echo.HTTPError); ok {
				// Router error
				he = herr
			}
		}
	} else {
		he = &echo.HTTPError{
			Code:    http.StatusInternalServerError,
			Message: http.StatusText(http.StatusInternalServerError),
		}

		Log.Error(he)
	}

	ve, ok := he.Message.(validator.ValidationErrors)
	if ok {
		// Validation error
		var validationErrors []string

		// Custom message response
		for _, err := range ve {
			validationErrors = append(validationErrors, err.Error())
		}

		he.Message = validationErrors
	}

	// Run only when response emitted by user
	if !c.Response().Committed {
		if err = c.JSON(he.Code, DefaultResponse{
			Ok:      false,
			Message: he.Message,
		}); err != nil {
			// Failed sending response
			Log.Error(err)
		}
	}
}

func DescribeHandler(route echoswagger.Api, codes ...int) {
	for _, code := range codes {
		route.AddResponse(
			code,
			http.StatusText(code),
			DefaultResponse{},
			nil,
		)
	}
}
