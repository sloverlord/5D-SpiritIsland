@echo off
pushd %~dp0
cscript createTimelines.vbs

git checkout -b me
git add *
git commit -m "les go"
git push
git checkout main
git merge me