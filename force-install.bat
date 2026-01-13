@echo off
echo ====================================
echo PLAN B: Force Install Script
echo ====================================
echo.
echo This will:
echo 1. Clean npm cache
echo 2. Delete node_modules and .next
echo 3. Force install all packages
echo 4. Start dev server
echo.
pause

echo.
echo [1/4] Cleaning npm cache...
call npm cache clean --force

echo.
echo [2/4] Deleting node_modules and .next folders...
if exist node_modules rmdir /s /q node_modules
if exist .next rmdir /s /q .next
if exist package-lock.json del package-lock.json

echo.
echo [3/4] Force installing packages (this may take 3-5 minutes)...
echo Please be patient, warnings are OK, only errors matter!
call npm install --force

echo.
echo ====================================
if %ERRORLEVEL% EQU 0 (
    echo SUCCESS! All packages installed.
    echo.
    echo [4/4] Starting development server...
    echo.
    echo Press Ctrl+C to stop the server when needed.
    echo.
    call npm run dev
) else (
    echo.
    echo ERROR: Installation failed!
    echo Check the error messages above.
    echo.
    pause
)
