https://loonify.herokuapp.com/v1/

POST      /auth/login (email, password)
POST      /auth/signup (name, email, password)

POST      /code/verify (email, code)
POST      /code/resend (email)

GET       /posts
GET       /posts/id
POST      /posts
DELETE    /posts/id
PUT       /posts/id

GET       /categories
GET       /categories/id
POST      /categories
DELETE    /categories/id
PUT       /categories/id

GET       /locations
GET       /locations/id
POST      /locations
DELETE    /locations/id
PUT       /locations/id

GET       /users
GET       /users/id
POST      /users
DELETE    /users/id
PUT       /users/id

GET       /me
GET       /metrics