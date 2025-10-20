@echo off
pushd %~dp0
cscript createTimelines.vbs

git checkout -b img main
git add *
git commit -m "add new turns"
git push

git checkout main
git merge img
git branch -d img