package main

import (
	"fmt"
	"github.com/Kamva/mgm/v3"
	"github.com/getsentry/sentry-go"
	"go.mongodb.org/mongo-driver/mongo/options"
	"net/http"
	"os"
	"time"
)

var URI = fmt.Sprintf(
	"mongodb+srv://%s:%s@%s/%s?retryWrites=true&w=majority",
	os.Getenv("MONGODB_USER"),
	os.Getenv("MONGODB_PASSWORD"),
	os.Getenv("MONGODB_HOST"),
	os.Getenv("MONGODB_DATABASE"),
)

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
		options.Client().ApplyURI(URI),
	)
	if err != nil {
		panic(err)
	}
}
