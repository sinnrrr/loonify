package databases

import (
	"loonify/common"
)

// Query operation preset
func Query(
	destination interface{},
	page int,
	pageSize int,
) (err error) {
	if err = PostgresClient.
		Scopes(
			Paginate(
				page,
				pageSize,
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

// Find Model with specified conditions preset
func FindWithCondition(
	condition interface{},
	destination interface{},
) (err error) {
	if err = PostgresClient.
		Scopes(
			Paginate(
				1,
				10,
			),
		).
		Where(condition).
		First(destination).
		Error; err != nil {
		common.Log.Error(err)
	}

	return
}
