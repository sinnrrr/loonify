package redis

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
	"loonify/config"
	"os"
	"time"
)

func Connect() *redis.Client {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	rdb := redis.NewClient(config.RedisOptions)

	_, err := rdb.Ping(ctx).Result()
	if err != nil {
		panic(err)
	}

	fmt.Println(os.Getenv("PREFIX") + "Connection to Redis established successfully")
	return rdb
}