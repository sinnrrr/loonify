package models

import "database/sql/driver"

type MyString string

func (s MyString) Value() (driver.Value, error) {
	if s == "" {
		return nil, nil
	}
	return string(s), nil
}