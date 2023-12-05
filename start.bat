@echo off

echo "Universe Assistant"
call node .

if NOT ["%errorlevel%"]==["0"] (
  pause
  exit /b %errorlevel%
)