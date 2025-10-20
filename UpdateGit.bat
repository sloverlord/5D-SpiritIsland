@echo off
pushd %~dp0

cscript createTimelines.vbs

git branch -d img
git checkout -b img main
git add *
git commit -m "addedd new turns"
git push