package models

import (
	bcrypt "golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"loonify/common"
	"time"
)

type User struct {
	ID        uint       `json:"id" gorm:"primary_key"`
	Name      *string    `json:"name" validate:"required"`
	Email     *string    `json:"email" gorm:"unique" validate:"required,email"`
	Password  *string    `json:"password"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
	DeletedAt *time.Time `json:"deleted_at" sql:"index"`
	Posts     []Post     `json:"posts,omitempty" gorm:"foreignKey:OwnerID"`
}

//type APIUser struct {
//	ID        uint       `json:"id" gorm:"primary_key"`
//	Name      *string    `json:"name" validate:"required"`
//	CreatedAt time.Time  `json:"created_at"`
//	UpdatedAt time.Time  `json:"updated_at"`
//	DeletedAt *time.Time `json:"deleted_at" sql:"index"`
//	Posts     []Post     `json:"posts,omitempty" gorm:"foreignKey:OwnerID"`
//}

func (user *User) hashPassword() (err error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(*user.Password), bcrypt.DefaultCost)
	if err != nil {
		common.Log.Panic(err)
		return
	}

	stringHashedPassword := string(hashedPassword)
	user.Password = &stringHashedPassword

	return
}

func (user *User) BeforeCreate(tx *gorm.DB) (err error) {
	err = common.SendMail([]string{"dimasoltusyuk@gmail.com"}, []byte("Hey"))
	if err != nil {
		common.Log.Panic(err)
		return
	}

	return user.hashPassword()
}

func (user *User) BeforeSave(tx *gorm.DB) (err error) {
	_, err = bcrypt.Cost([]byte(*user.Password))
	if err != nil {
		return nil
	}

	return user.hashPassword()
}