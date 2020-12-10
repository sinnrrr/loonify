package models

import (
	"fmt"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"loonify/common"
	"time"
)

type User struct {
	ID        uint       `json:"id" gorm:"primary_key"`
	Token     *string    `json:"token" validate:"omitempty,uuid4" gorm:"default:null"`
	ExpiresAt *time.Time `json:"expires_at"`
	Name      *string    `json:"name"`
	Email     *string    `json:"email" gorm:"unique" validate:"omitempty,email"`
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

	// Hashing user password
	return user.hashPassword()
}

// After create hook
func (user *User) AfterCreate(_ *gorm.DB) (err error) {
	// Sending email
	if err = common.SendMail(
		[]string{*user.Email},
		[]byte("Hey there! Thanks for registration!"),
	); err != nil {
		common.Log.Error(err)
	}

	return
}

// Before save hook
func (user *User) BeforeUpdate(_ *gorm.DB) (err error) {
	// Checking if password is already hashed
	_, err = bcrypt.Cost([]byte(*user.Password))
	if err != nil {
		// Password has been changed
		err = user.hashPassword()
	}

	fmt.Println(user.Token)

	return
}

// After save hook
func (user *User) AfterUpdate(tx *gorm.DB) (err error) {
	// Sending email
	return common.SendMail(
		[]string{*user.Email},
		[]byte("Your credentials were updated!"),
	)
}
