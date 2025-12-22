@echo off
echo ============================================
echo   GIT REPO RESET TOOL (GitLab -^> GitHub)
echo ============================================
echo.
echo This script will:
echo 1. DELETE the current .git folder (removing all GitLab history)
echo 2. Initialize a FRESH git repository
echo 3. Stage and Commit all current files
echo.
echo ⚠️  WARNING: This will wipe your commit history!
echo.
set /p confirm="Are you sure you want to proceed? (y/n): "
if /i not "%confirm%"=="y" goto :eof

echo.
echo [1/4] Removing old git repository...
rmdir /s /q .git
if exist .git (
    echo ❌ Failed to remove .git folder. Please ensure no files are open or locked.
    pause
    goto :eof
) else (
    echo ✅ Old repository removed.
)

echo.
echo [2/4] Initializing new git repository...
git init
git branch -M main

echo.
echo [3/4] Adding files (this may take a moment)...
git add .

echo.
echo [4/4] Committing files...
git commit -m "Initial commit - Migrated to GitHub"

echo.
echo ============================================
echo   ✨ LOCAL SETUP COMPLETE!
echo ============================================
echo.
echo Next steps:
echo 1. Go to https://github.com/new and create an empty repo.
echo 2. Run the following commands manually:
echo.
echo    git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
echo    git push -u origin main
echo.
echo (Replace the URL with your actual GitHub repository URL)
echo.
pause
