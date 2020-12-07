package common

import (
	"github.com/sirupsen/logrus"
)

var (
	Log = logrus.New()

	GreenColor = "\033[32m"
	YellowColor = "\033[33m"
	PurpleColor = "\033[35m"
	CyanColor = "\033[36m"
	WhiteColor = "\033[37m"

	ResetColor = "\033[0m"
)
