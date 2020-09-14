package users

import (
	"github.com/Kamva/mgm/v3"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	token2 "loonify/api/token"
	v1 "loonify/api/v1"
	"loonify/config"
	"loonify/models"
	"net/http"
)

/*GetUsers handler*/
func Query(c echo.Context) error {
	var users []models.User

	err := mgm.Coll(&models.User{}).SimpleFind(&users, bson.D{})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusOK, v1.GoodResponseWithData(users, "Users were successfully retrieved"))
}

///*CreateUser handler*/
//func Create(c echo.Context) error {
//		user := new(models.User)
//
//		if err := c.Bind(user); err != nil {
//			return c.JSON(http.StatusUnprocessableEntity, v1.FailResponse(err.Error()))
//		}
//
//		//if err := c.Validate(user); err != nil {
//		//	return c.JSON(http.StatusUnprocessableEntity, err)
//		//}
//
//		err := mgm.Coll(user).Create(user)
//		if err != nil {
//			return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err.Error()))
//		}
//
//		return c.JSON(http.StatusCreated, v1.GoodResponseWithData(user, "User was successfully created"))
//}

func Read(c echo.Context) error {
	user := &models.User{}
	coll := mgm.Coll(user)

	_ = coll.FindByID(c.Param("id"), user)

	return c.JSON(http.StatusOK, v1.GoodResponseWithData(user, "User was successfully retrieved"))
}

func Update(c echo.Context) error {
	user := &models.User{}
	coll := mgm.Coll(user)

	_ = coll.FindByID(c.Param("id"), user)

	if err := c.Bind(user); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, v1.FailResponse(err.Error()))
	}

	if err := config.Validator.Struct(user); err != nil {
		return c.JSON(http.StatusUnprocessableEntity, v1.ValidationResponse(v1.ProceedValidation(err)))
	}

	err := mgm.Coll(user).Update(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusCreated, v1.GoodResponseWithData(user, "User was successfully updated"))
}

func Delete(c echo.Context) error {
	user := &models.User{}
	coll := mgm.Coll(user)

	_ = coll.FindByID(c.Param("id"), user)

	err := mgm.Coll(user).Delete(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, v1.ErrorResponse(err.Error()))
	}

	return c.JSON(http.StatusOK, v1.GoodResponseWithData(user, "User was successfully retrieved"))
}

func Me(c echo.Context) error {
	var (
		result models.User
		token  = token2.Extract(c.Request().Header.Get(echo.HeaderAuthorization))
	)

	result, err := FindByField("token", token)
	if err != nil {
		return c.JSON(http.StatusNotFound, v1.FailResponse(err.Error()))
	}

	return c.JSON(http.StatusOK, v1.GoodResponseWithData(result, "User was successfully retrieved"))
}

func FindByField(key string, value string) (models.User, error) {
	var result []models.User

	err := mgm.Coll(&models.User{}).SimpleFind(&result, bson.M{key: value})

	return result[0], err
}
