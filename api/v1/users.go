package v1

import (
	"context"
	"github.com/labstack/echo/v4"
	"gitlab.com/loonify/web/db"
	"gitlab.com/loonify/web/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
	"net/http"
)

/*GetUsers handler*/
func QueryUsers() echo.HandlerFunc {
	return func(c echo.Context) error {
		var result []*models.User

		usersCollection, closeConnection := db.ConnectWithCollection("users")

		cur, err := usersCollection.Find(context.TODO(), bson.D{}, options.Find())
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}

		for cur.Next(context.TODO()) {
			var single models.User

			err := cur.Decode(&single)
			if err != nil {
				return c.JSON(http.StatusInternalServerError, err)
			}

			result = append(result, &single)
		}

		err = cur.Err()
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}

		cur.Close(context.TODO())

		defer closeConnection()
		return c.JSON(http.StatusOK, result)
	}
}

/*CreateUser handler*/
func CreateUser() echo.HandlerFunc {
	return func(c echo.Context) error {
		u := new(models.User)

		usersCollection, closeConnection := db.ConnectWithCollection("users")

		if err := c.Bind(u); err != nil {
			return c.JSON(http.StatusUnprocessableEntity, err)
		}

		result, err := usersCollection.InsertOne(context.TODO(), u)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}


		defer closeConnection()
		return c.JSON(http.StatusOK, result)
	}
}

func ReadUser() echo.HandlerFunc {
	return func(c echo.Context) error {
		var result models.User

		usersCollection, closeConnection := db.ConnectWithCollection("users")

		err := usersCollection.FindOne(
			context.TODO(),
			bson.M{"_id": c.Param("id")},
		).Decode(&result)

		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}

		defer closeConnection()
		return c.JSON(http.StatusOK, result)
	}
}

func UpdateUser() echo.HandlerFunc {
	return func(c echo.Context) error {
		u := new(models.User)

		usersCollection, closeConnection := db.ConnectWithCollection("users")

		if err := c.Bind(u); err != nil {
			return c.JSON(http.StatusUnprocessableEntity, err)
		}

		data, err := bson.Marshal(u)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}

		id, err := primitive.ObjectIDFromHex(c.Param("id"))
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}

		filter := bson.M{
			"_id": bson.M{
				"$eq": id,
			},
		}

		update := bson.D{
			{"$set", data},
		}

		result, err := usersCollection.UpdateOne(
			context.TODO(),
			filter,
			update,
		)

		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}


		defer closeConnection()
		return c.JSON(http.StatusOK, result)
	}
}

func DeleteUser() echo.HandlerFunc {
	return func(c echo.Context) error {
		usersCollection, closeConnection := db.ConnectWithCollection("users")

		id, err := primitive.ObjectIDFromHex(c.Param("id"))
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}

		filter := bson.M{
			"_id": bson.M{
				"$eq": id,
			},
		}

		result, err := usersCollection.DeleteOne(context.TODO(), filter)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}


		defer closeConnection()
		return c.JSON(http.StatusOK, result)
	}
}
