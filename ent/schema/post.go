package schema

import (
	"github.com/facebook/ent"
	"github.com/facebook/ent/schema/field"
)

type Post struct {
	ent.Schema
}

func (Post) Fields() []ent.Field {
	return []ent.Field{
		field.String("title").
			NotEmpty(),
		field.Text("description").
			NotEmpty(),
	}
}

func (Post) Edges() []ent.Edge {
	return nil
}
