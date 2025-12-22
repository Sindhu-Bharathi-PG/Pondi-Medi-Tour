@echo off
echo ============================================
echo   GITLAB UPLOAD TOOL
echo ============================================
echo.
echo Target: https://gitlab.com/KOORUMAHEY/pondimeditour.git
echo.

if not exist .git (
    echo [1/4] Initializing git...
    git init
    git branch -M main
)

echo [2/4] Adding all files...
git add .

echo [3/4] Committing changes...
git commit -m "Update project files"

echo [4/4] Setting remote and pushing...
git remote remove origin 2>nul
git remote add origin https://gitlab.com/KOORUMAHEY/pondimeditour.git

echo.
echo Pushing to GitLab... (This may ask for credentials)
git push -uf origin main

echo.
echo ============================================
echo   DONE!
echo ============================================
pause
