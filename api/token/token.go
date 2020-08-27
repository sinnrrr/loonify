package token

import (
	"context"
	"github.com/google/uuid"
	"loonify/db/redis"
)

var rdb = redis.Connect()

func Create(id string) error {
	return rdb.Set(context.Background(), Generate(), id, 0).Err()
}

func Read(token string) (string, error) {
	return rdb.Get(context.Background(), token).Result()
}

func Update(token string) error {
	return rdb.Rename(context.Background(), token, Generate()).Err()
}

func Delete(token string) error {
	return rdb.Del(context.Background(), token).Err()
}

func Generate() string {
	return uuid.New().String()
}

func Verify(key string) (bool, error) {
	condition, err := rdb.Exists(context.Background(), key).Result()

	return condition == 1, err
}