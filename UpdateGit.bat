@echo off
pushd %~dp0
cscript createTimelines.vbs

git checkout -b me
git add *
git commit -a -m "les go"
git push
git checkout master
git merge me