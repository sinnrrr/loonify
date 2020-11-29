package schema

import (
	"github.com/facebook/ent"
	"github.com/facebook/ent/schema/field"
)

type User struct {
	ent.Schema
}

func (User) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").
			NotEmpty(),
		field.String("email").
			Unique().
			NotEmpty(),
		field.String("password").
			Sensitive(),
	}
}

func (User) Edges() []ent.Edge {
	return nil
}
