package db

import (
	"context"
	"fmt"
	"github.com/appleboy/go-fcm"
	"github.com/go-redis/redis/v8"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"loonify/config"
	"os"
	"time"
)

var (
	FCMClient   = FCMConnect()
	RedisClient = RedisConnect()
)

func RedisConnect() *redis.Client {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	rdb := redis.NewClient(config.RedisOptions)

	_, err := rdb.Ping(ctx).Result()
	if err != nil {
		panic(err)
	}

	fmt.Println(config.Prefix + "Connection to Redis established successfully")
	return rdb
}

func FCMConnect() *fcm.Client {
	client, err := fcm.NewClient(os.Getenv("FCM_TOKEN"))
	if err != nil {
		panic(err)
	}

	fmt.Println(config.Prefix + "Connection to FCM established successfully")

	return client
}

func MongoConnect() (*mongo.Client, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client())
	if err != nil {
		return nil, err
	}

	ctx, cancel = context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		return nil, err
	}

	fmt.Println(config.Prefix + "Connection to MongoDB established successfully!")

	return client, nil
}

func MongoDisconnect(client *mongo.Client) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	return client.Disconnect(ctx)
}
