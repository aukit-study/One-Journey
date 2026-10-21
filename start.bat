@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed or is not on PATH.
  echo Install Node.js, then run install.bat.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo npm is not installed or is not on PATH.
  pause
  exit /b 1
)

if not exist node_modules\vite\bin\vite.js (
  echo Dependencies are not installed. Run install.bat first.
  pause
  exit /b 1
)

echo Starting One Journey at http://127.0.0.1:5173/
call npm run dev -- --host 127.0.0.1 --port 5173 --strictPort --open

if errorlevel 1 (
  echo.
  echo The website stopped with an error. Check the output above.
  pause
  exit /b 1
)

endlocal
