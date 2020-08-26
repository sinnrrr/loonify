package redis

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
	"loonify/config"
	"time"
)

func Connect() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	rdb := redis.NewClient(config.RedisOptions)

	_, err := rdb.Ping(ctx).Result()
	if err != nil {
		panic(err)
	}

	fmt.Println(config.PREFIX + "Connection to Redis established successfully!")
}