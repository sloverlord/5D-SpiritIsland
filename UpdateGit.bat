@echo off
pushd %~dp0
cscript createTimelines.vbs

<<<<<<< HEAD
git checkout -b img main
git add *
git commit -m "les go"

git checkout main
git merge img
git branch -d img
=======
git add *
git commit -a -m "les go"
git push
>>>>>>> img
