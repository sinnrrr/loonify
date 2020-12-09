package databases

import (
	"loonify/common"
)

// Query operation preset
func Query(
	destination interface{},
	page int,
	size int,
) (err error) {
	if err = PostgresClient.
		Scopes(
			Paginate(
				page,
				size,
			),
		).
		Find(destination).
		Error; err != nil {
		common.Log.Error(err)
	}

	return
}

// Create operation preset
func Create(
	destination interface{},
) (err error) {
	if err = PostgresClient.
		Create(destination).
		Error; err != nil {
		common.Log.Error(err)
	}

	return
}

// Find many entities with specified conditions preset
func FindWithConditions(
	page int,
	size int,
	condition interface{},
	destination interface{},
) (err error) {
	if err = PostgresClient.
		Scopes(
			Paginate(
				page,
				size,
			),
		).
		Where(condition).
		First(destination).
		Error; err != nil {
		common.Log.Error(err)
	}

	return
}

// Find one entity with specified conditions preset
func FindOneWithCondition(
	condition interface{},
	destination interface{},
) (err error) {
	if err = PostgresClient.
		Where(condition).
		First(destination).
		Error; err != nil {
		common.Log.Error(err)
	}

	return
}
