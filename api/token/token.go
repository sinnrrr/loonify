package token

import (
	"context"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"loonify/api/v1"
	"loonify/db/redis"
	"net/http"
	"strconv"
)

func Create(id string, accessLevel int) (string, error) {
	key := Generate()
	return key, redis.Client.HSet(context.Background(), key, "id", id, "access", accessLevel).Err()
}

func Read(token string) (string, error) {
	return redis.Client.Get(context.Background(), token).Result()
}

func ReadAllHash(token string) (map[string]string, error) {
	return redis.Client.HGetAll(context.Background(), token).Result()
}

func ReadSpecifiedField(token string, key string) (string, error) {
	return redis.Client.HGet(context.Background(), token, key).Result()
}

func Update(token string) error {
	return redis.Client.Rename(context.Background(), token, Generate()).Err()
}

func Delete(token string) error {
	return redis.Client.Del(context.Background(), token).Err()
}

func Generate() string {
	return uuid.New().String()
}

func Exists(token string) (bool, error) {
	condition, err := redis.Client.Exists(context.Background(), token).Result()
	return condition == 1, err
}

func CheckAccess(c echo.Context, key string, entity string, operation string) (bool, error)  {
	accessLevelString, err := ReadSpecifiedField(key, "access")
	if err != nil {
		return false, c.JSON(http.StatusUnauthorized, v1.FailResponse(err.Error()))
	}

	accessLevel, err := strconv.Atoi(accessLevelString)
	if err != nil {
		return false, c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err.Error()))
	}

	if !AccessRights[accessLevel][entity][operation] {
		return false, c.JSON(http.StatusForbidden, v1.FailResponse("You do not have rights to do this operation"))
	}

	return true, nil
}

func Verify(c echo.Context, token string, entity string, operation string) (bool, error) {
	exists, err := Exists(token)

	if err != nil {
		return false, c.JSON(http.StatusUnauthorized, v1.FailResponse(err.Error()))
	} else if exists {
		hasAccess, err := CheckAccess(c, token, entity, operation)

		if err != nil {
			return false, c.JSON(http.StatusForbidden, v1.FailResponse(err.Error()))
		} else if !hasAccess {
			return false, c.JSON(http.StatusUnauthorized, v1.FailResponse(err.Error()))
		}
	}

	return true, nil
}

func Extract(header string) string {
	return header[7:]
}