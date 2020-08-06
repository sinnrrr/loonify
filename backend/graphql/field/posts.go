package field

import (
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"

	"log"

	"gitlab.com/loonify/web/model"
)

var post = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Post",
		Description: "Posts data",
		Fields: graphql.Fields{
			"id": &graphql.Field{Type: graphql.ID},
			"owner_id": &graphql.Field{Type: graphql.ID},
			"category": &graphql.Field{Type: graphql.String},
			"title": &graphql.Field{Type: graphql.String},
			"description": &graphql.Field{Type: graphql.String},
			"lat": &graphql.Field{Type: graphql.Float},
			"lng": &graphql.Field{Type: graphql.Float},
			"status": &graphql.Field{Type: graphql.String},
			"reward": &graphql.Field{Type: graphql.String},
			"createdAt": &graphql.Field{Type: graphql.DateTime},
			"updatedAt": &graphql.Field{Type: graphql.DateTime},
			"deletedAt": &graphql.Field{Type: graphql.DateTime},
		},
	},
)

/*NewPosts function*/
func NewPosts(db *gorm.DB) *graphql.Field {
	return &graphql.Field{
		Description: "post",
		Type: graphql.NewList(post),
		Resolve: func(p graphql.ResolveParams) (i interface{}, e error) {
			var u[]*model.Post
			if err := db.Find(&u).Error; err != nil {
				log.Fatal(err)
			}

			return u, nil
		},
	}
}