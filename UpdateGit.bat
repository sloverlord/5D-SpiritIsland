@echo off
pushd %~dp0
cscript createTimelines.vbs

git add *
git commit -m "les go"
git push
git merge