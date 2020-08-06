package field

import (
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"

	"log"

	"github.com/sinnrrr/loonify/model"
)

var user = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "User",
		Description: "Users data",
		Fields: graphql.Fields{
			"id":        &graphql.Field{Type: graphql.ID},
			"email":     &graphql.Field{Type: graphql.String},
			"password":  &graphql.Field{Type: graphql.String},
			"phone":     &graphql.Field{Type: graphql.String},
			"address":   &graphql.Field{Type: graphql.String},
			"createdAt": &graphql.Field{Type: graphql.DateTime},
			"updatedAt": &graphql.Field{Type: graphql.DateTime},
			"deletedAt": &graphql.Field{Type: graphql.DateTime},
		},
	},
)

/*NewUsers function*/
func NewUsers(db *gorm.DB) *graphql.Field {
	return &graphql.Field{
		Description: "user",
		Type: graphql.NewList(user),
		Resolve: func(p graphql.ResolveParams) (i interface{}, e error) {
			var u []*model.User
			if err := db.Find(&u).Error; err != nil {
				log.Fatal(err)
			}

			return u, nil
		},
	}
}
