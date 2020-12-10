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

func Read(
	destination interface{},
	id int,
) (err error) {
	if err = PostgresClient.
		First(destination, id).
		Error; err != nil {
		common.Log.Error(err)
	}

	return
}

func Save(destination interface{}) (err error) {
	if err = PostgresClient.
		Save(destination).
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
