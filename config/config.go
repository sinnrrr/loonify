package config

import (
	"fmt"
	"github.com/Kamva/mgm/v3"
	"github.com/getsentry/sentry-go"
	"github.com/go-playground/validator/v10"
	"github.com/go-redis/redis/v8"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/mongo/options"
	"net/http"
	"os"
	"time"
)

const PREFIX = "---> "

var IsHeroku = os.Getenv("HOST") == "loonify.herokuapp.com"

var MongoUri = fmt.Sprintf(
	"mongodb+srv://%s:%s@%s/%s?retryWrites=true&w=majority",
	os.Getenv("MONGODB_USER"),
	os.Getenv("MONGODB_PASSWORD"),
	os.Getenv("MONGODB_HOST"),
	os.Getenv("MONGODB_DATABASE"),
)

var RedisOptions = &redis.Options{
	Addr:     os.Getenv("REDIS_HOST") + ":" + os.Getenv("REDIS_PORT"),
	Password: os.Getenv("REDIS_PASSWORD"),
	DB:       0,
}

type (
	Host struct {
		Echo *echo.Echo
	}
)

type CustomValidator struct {
	Validator *validator.Validate
}

func (cv *CustomValidator) Validate(i interface{}) error {
	return cv.Validator.Struct(i)
}

func init() {
	err := sentry.Init(sentry.ClientOptions{
		Dsn: "https://8b564c636da0410db16686768a002d8d@o436209.ingest.sentry.io/5396821",
		BeforeSend: func(event *sentry.Event, hint *sentry.EventHint) *sentry.Event {
			if hint.Context != nil {
				if req, ok := hint.Context.Value(sentry.RequestContextKey).(*http.Request); ok {
					fmt.Println(req)
				}
			}
			fmt.Println(event)
			return event
		},
		Debug:            true,
		AttachStacktrace: true,
	})
	if err != nil {
		panic(err)
	}

	sentry.ConfigureScope(func(scope *sentry.Scope) {
		scope.SetUser(sentry.User{Email: "dimasoltusyuk@gmail.com"})
	})

	err = mgm.SetDefaultConfig(
		&mgm.Config{CtxTimeout: 12 * time.Second},
		os.Getenv("MONGODB_DATABASE"),
		options.Client().ApplyURI(MongoUri),
	)
	if err != nil {
		panic(err)
	}
}
