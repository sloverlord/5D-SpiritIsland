@echo off
pushd %~dp0
cscript createTimelines.vbs

git checkout -b img
git add *
git commit -a -m "les go"
git push
git checkout master
git merge img
rem git branch -d hotfix