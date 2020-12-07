package models

import (
	"github.com/google/uuid"
	bcrypt "golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"loonify/common"
	"time"
)

type User struct {
	ID        uint       `json:"id" gorm:"primary_key"`
	Token     uuid.UUID  `json:"token" validate:"omitempty,uuid4" gorm:"default:null"`
	ExpiresAt *time.Time `json:"expires_at"`
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
	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(*user.Password),
		bcrypt.DefaultCost,
	)
	if err != nil {
		common.Log.Error(err)
		return
	}

	stringHashedPassword := string(hashedPassword)
	user.Password = &stringHashedPassword

	return
}

func (user *User) BeforeCreate(tx *gorm.DB) (err error) {
	user.Token = uuid.New()

	if err = common.SendMail(
		[]string{*user.Email},
		[]byte("Hey there! Thanks for registration!"),
	); err != nil {
		common.Log.Error(err)
		return
	}

	return user.hashPassword()
}

func (user *User) BeforeSave(tx *gorm.DB) (err error) {
	if _, err = bcrypt.Cost(
		[]byte(*user.Password),
	); err != nil {
		return nil
	}

	if err = common.SendMail(
		[]string{*user.Email},
		[]byte("Your credentials were updated!"),
	); err != nil {
		common.Log.Error(err)
		return
	}

	return user.hashPassword()
}
