git add .
git commit -am "commit by script"
git push heroku develop:master
heroku logs --tail