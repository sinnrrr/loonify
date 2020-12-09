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
	Token     *string    `json:"token" validate:"omitempty,uuid4" gorm:"default:null"`
	ExpiresAt *time.Time `json:"expires_at"`
	Name      *string    `json:"name" validate:"required"`
	Email     *string    `json:"email" gorm:"unique" validate:"required,email"`
	Password  *string    `json:"password" validate:"required"`
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

// Hash user password with bcrypt method
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

// Before create hook
func (user *User) BeforeCreate(_ *gorm.DB) (err error) {
	// Generating API token
	stringToken := uuid.New().String()
	user.Token = &stringToken

	// Sending email
	if err = common.SendMail(
		[]string{*user.Email},
		[]byte("Hey there! Thanks for registration!"),
	); err != nil {
		common.Log.Error(err)
		return
	}

	// Hashing user password
	return user.hashPassword()
}

// Before save hook
func (user *User) BeforeSave(_ *gorm.DB) (err error) {
	// Checking if password is already hashed
	_, err = bcrypt.Cost(
		[]byte(*user.Password),
	)
	if err != nil {
		// Password has been changed
		err = user.hashPassword()
	}

	// Sending email
	_ = common.SendMail(
		[]string{*user.Email},
		[]byte("Your credentials were updated!"),
	)

	return
}
