@echo off
echo ====================================
echo PACKAGE INSTALLATION STATUS CHECKER
echo ====================================
echo.

echo Checking package installation...
echo.

:: Check for jsPDF
if exist "node_modules\jspdf" (
    echo [OK] jspdf - INSTALLED
) else (
    echo [X] jspdf - NOT FOUND
)

:: Check for xlsx
if exist "node_modules\xlsx" (
    echo [OK] xlsx - INSTALLED
) else (
    echo [X] xlsx - NOT FOUND
)

:: Check for recharts
if exist "node_modules\recharts" (
    echo [OK] recharts - INSTALLED
) else (
    echo [X] recharts - NOT FOUND
)

:: Check for react-big-calendar
if exist "node_modules\react-big-calendar" (
    echo [OK] react-big-calendar - INSTALLED
) else (
    echo [X] react-big-calendar - NOT FOUND
)

:: Check for date-fns
if exist "node_modules\date-fns" (
    echo [OK] date-fns - INSTALLED
) else (
    echo [X] date-fns - NOT FOUND
)

:: Check for react-datepicker
if exist "node_modules\react-datepicker" (
    echo [OK] react-datepicker - INSTALLED
) else (
    echo [X] react-datepicker - NOT FOUND
)

:: Check for react-dropzone
if exist "node_modules\react-dropzone" (
    echo [OK] react-dropzone - INSTALLED
) else (
    echo [X] react-dropzone - NOT FOUND
)

:: Check for zustand
if exist "node_modules\zustand" (
    echo [OK] zustand - INSTALLED
) else (
    echo [X] zustand - NOT FOUND
)

echo.
echo ====================================
echo If any packages show [X], run:
echo npm install --legacy-peer-deps [package-name]
echo ====================================
pause
