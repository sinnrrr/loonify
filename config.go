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
		os.Getenv("DATABASE_NAME"),
		options.Client().ApplyURI(
			os.Getenv("MONGODB_DATABASE_URL"),
		),
	)
	if err != nil {
		panic(err)
	}
}
