@echo off
pushd %~dp0
cscript createTimelines.vbs

git checkout -b img main
git add *
git commit -m "addedd new turns"
git checkout main
git push
git merge img
git branch -d img