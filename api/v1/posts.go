package v1

import (
	"context"
	"github.com/labstack/echo/v4"
	"gitlab.com/loonify/web/db"
	"gitlab.com/loonify/web/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"net/http"
)

/*GetPosts handler*/
func QueryPosts() echo.HandlerFunc {
	return func(c echo.Context) error {
		var result []*models.Post

		postsCollection, closeConnection := db.ConnectWithCollection("users")

		cur, err := postsCollection.Find(context.TODO(), bson.D{}, options.Find())
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}

		for cur.Next(context.TODO()) {
			var single models.Post

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