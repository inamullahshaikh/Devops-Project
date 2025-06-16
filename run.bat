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
echo Starting services...
cd /d "%~dp0\comment-service"
start /B node index.js
cd /d "%~dp0\task-service"
start /B node index.js
cd /d "%~dp0\user-service"
start /B node index.js
cd /d "%~dp0\frontend"
start /B python -m http.server 80
start chrome "http://inam.project.com/login.html"
@REM pause