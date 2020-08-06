package graphql

import (
	"gitlab.com/loonify/web/graphql/field"

	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

/*NewQuery graphql query handler*/
func NewQuery(db *gorm.DB) *graphql.Object {
	return graphql.NewObject(graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"users": field.NewUsers(db),
			"posts": field.NewPosts(db),
		},
	})
}