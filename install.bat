@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed or is not on PATH.
  echo Install Node.js, then run this file again.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo npm is not installed or is not on PATH.
  echo Reinstall Node.js with npm included, then run this file again.
  pause
  exit /b 1
)

echo Installing One Journey dependencies...
if exist package-lock.json (
  call npm ci
) else (
  call npm install
)

if errorlevel 1 (
  echo.
  echo Installation failed. Check the error above and try again.
  pause
  exit /b 1
)

echo.
echo Installation complete. Run start.bat to launch the website.
pause
