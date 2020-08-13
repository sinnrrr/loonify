package models

import (
	"github.com/go-bongo/bongo"
	"go.mongodb.org/mongo-driver/bson"
	"gopkg.in/mgo.v2"
)

type Category struct {
	bongo.DocumentBase `bson:",inline"`
	ParentID           uint
	Name               MyString
	diffTracker        *bongo.DiffTracker
}

type CascadeConfig struct {
	Collection  *mgo.Collection
	RelType     int
	ThroughProp string
	Query       bson.M
	OldQuery    bson.M
	Properties  []string
	Data        interface{}
}

func (m *Category) GetDiffTracker() *bongo.DiffTracker {
	if m.diffTracker == nil {
		m.diffTracker = bongo.NewDiffTracker(m)
	}

	return m.diffTracker
}

var category = &Category{}
