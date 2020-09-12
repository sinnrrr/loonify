package v1

import (
	"github.com/labstack/echo/v4"
	"loonify/api/v1/code"
)

func CodeGroup(v1Group *echo.Group) {
	codeGroup := v1Group.Group("/code")

	codeGroup.POST("/send/", code.Resend)
	codeGroup.POST("/verify/:code/", code.Verify)
}
