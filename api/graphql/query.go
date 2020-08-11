package graphql

import (
	"gitlab.com/sinnrrr/loonify/api/graphql/fields"

	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

/*NewQuery graphql query handler*/
func NewQuery(db *gorm.DB) *graphql.Object {
	return graphql.NewObject(graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"users": fields.NewUsers(db),
			"posts": fields.NewPosts(db),
		},
	})
}