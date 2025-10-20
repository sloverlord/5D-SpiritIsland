@echo off
pushd %~dp0
cscript createTimelines.vbs

git checkout -b img main
git add *
git commit -m "les go"

git checkout main
git merge img
git branch -d img