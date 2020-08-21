git add .
git commit -am "commit by script"
git push
git push heroku develop:master
if [ $# -eq 0 ]
  then
    heroku logs --tail
fi
