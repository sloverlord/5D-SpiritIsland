@echo off
pushd %~dp0
cscript createTimelines.vbs

git add *
git commit -a -m "les go"
git push