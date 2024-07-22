@echo off
REM Change directory to the location of your virtual environment
cd /d "D:\KuberApp\Kai\env\Scripts"

REM Check if the directory change was successful
if %errorlevel% neq 0 (
    echo Error: Could not change directory to D:\KuberApp\Packof_\kuber\env\Scripts
    pause
    exit /b 1
)

REM Check if the activate script exists
if not exist "activate.bat" (
    echo Error: activate.bat not found in D:\KuberApp\Packof_\kuber\env\Scripts
    pause
    exit /b 1
)

REM Activate the virtual environment
call activate

REM Print a message to confirm activation
echo Virtual environment activated.
pause
