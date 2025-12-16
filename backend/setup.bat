@echo off
echo Creating .env file...
node create-env.js
echo.
echo Running SQL setup...
node run-sql.js
echo.
echo Setup complete!
pause
