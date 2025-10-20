@echo off
pushd %~dp0
rem cscript createTimelines.vbs

git add *
git commit -m "les go"
git push