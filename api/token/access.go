package token

const (
	USER          = 0
	ADMINISTRATOR = 1
)

var AccessRights = [3]map[string]map[string]bool{
	UserAccess,
	AdminAccess,
}

var UserAccess = map[string]map[string]bool{
	"user": {
		"query":  false,
		"create": true,
		"read":   true,
		"update": true,
		"delete": true,
	},
	"post": {
		"query":  true,
		"create": true,
		"read":   true,
		"update": true,
		"delete": true,
	},
	"category": {
		"query":  true,
		"create": true,
		"read":   true,
		"update": true,
		"delete": true,
	},
	"location": {
		"query":  false,
		"create": true,
		"read":   true,
		"update": true,
		"delete": true,
	},
}

var AdminAccess = map[string]map[string]bool{
	"user": {
		"query":  true,
		"create": true,
		"read":   true,
		"update": true,
		"delete": true,
	},
	"post": {
		"query":  true,
		"create": true,
		"read":   true,
		"update": true,
		"delete": true,
	},
	"category": {
		"query":  true,
		"create": true,
		"read":   true,
		"update": true,
		"delete": true,
	},
	"location": {
		"query":  true,
		"create": true,
		"read":   true,
		"update": true,
		"delete": true,
	},
}