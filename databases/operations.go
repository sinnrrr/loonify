package databases

import (
	"loonify/common"
)

func Query(
	destination interface{},
	page string,
	pageSize string,
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

func Create(destination interface{}) (err error) {
	if err = PostgresClient.
		Create(destination).
		Error; err != nil {
		common.Log.Error(err)
	}

	return
}

func FindWithCondition(
	condition interface{},
	destination interface{},
) (err error) {
	if err = PostgresClient.
		Scopes(
			Paginate(
				"1",
				"10",
			), // TODO: string to int in pagination method
		).
		Where(condition).
		First(destination).
		Error; err != nil {
		common.Log.Error(err)
	}

	return
}
