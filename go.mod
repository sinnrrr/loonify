module loonify

go 1.14

// +heroku goVersion go1.14

require (
	github.com/Kamva/mgm/v3 v3.0.1
	github.com/getsentry/sentry-go v0.7.0
	github.com/go-playground/validator/v10 v10.3.0
	github.com/graphql-go/graphql v0.7.9
	github.com/graphql-go/handler v0.2.3
	github.com/jinzhu/gorm v1.9.14
	github.com/joho/godotenv v1.3.0
	github.com/labstack/echo-contrib v0.9.0
	github.com/labstack/echo/v4 v4.1.16
	github.com/mattn/go-colorable v0.1.7 // indirect
	github.com/stretchr/testify v1.5.1 // indirect
	github.com/valyala/fasttemplate v1.2.1 // indirect
	go.mongodb.org/mongo-driver v1.4.0
	golang.org/x/crypto v0.0.0-20200728195943-123391ffb6de // indirect
	golang.org/x/net v0.0.0-20200813134508-3edf25e44fcc // indirect
	golang.org/x/sys v0.0.0-20200819171115-d785dc25833f // indirect
	gopkg.in/yaml.v2 v2.3.0 // indirect
)

replace github.com/swaggo/echo-swagger v1.0.0 => github.com/sinnrrr/echo-swagger v1.0.0
