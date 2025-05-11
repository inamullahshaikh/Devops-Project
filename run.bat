@echo off
setlocal
set "ports=3003 3002 3001 5500"
for %%p in (%ports%) do (
    echo Killing process on port %%p...
    netstat -ano | findstr :%%p >nul
    if %errorlevel%==0 (
        for /f "tokens=5" %%a in ('netstat -ano ^| findstr :%%p') do (
            taskkill /PID %%a /F >nul 2>&1
            echo Process on port %%p killed.
        )
    ) else (
        echo No process found on port %%p.
    )
)
@REM echo Starting services...
@REM cd /d "%~dp0\comment-service"
@REM start /B node index.js
@REM cd /d "%~dp0\task-service"
@REM start /B node index.js
@REM cd /d "%~dp0\user-service"
@REM start /B node index.js
@REM cd /d "%~dp0\frontend"
@REM start /B python -m http.server 5500
@REM start chrome "http://localhost:5500/login.html"
@REM pause