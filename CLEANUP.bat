@echo off
echo ============================================
echo CLEANUP SCRIPT - Pondimeditour Project
echo ============================================
echo.
echo This will DELETE old files and keep only:
echo   1. DATABASE_DOCUMENTATION.md
echo   2. MASTER_SCHEMA.sql
echo.
pause

echo.
echo [1/3] Cleaning migrations folder...
cd /d "d:\pondimeditour\backend\migrations"
del "005_page_configurations.sql" 2>nul
del "006_add_mobile_and_2fa.sql" 2>nul
del "007_recreate_doctors_table.sql" 2>nul
del "008_admin_dashboard_tables.sql" 2>nul
del "009_page_builder_tables.sql" 2>nul
echo Done! Only MASTER_SCHEMA.sql remains.

echo.
echo [2/3] Deleting test file...
cd /d "d:\pondimeditour\backend"
if exist "test-node.js" (
    del "test-node.js"
    echo Deleted test-node.js
) else (
    echo test-node.js not found (already deleted)
)

echo.
echo [3/3] Cleaning documentation folder...
cd /d "C:\Users\pgsin\.gemini\antigravity\brain\2b3ffe83-0333-4ef8-8213-753b42b1aa02"
for %%f in (*) do (
    if not "%%f"=="DATABASE_DOCUMENTATION.md" (
        if not "%%f"=="DATABASE_DOCUMENTATION.md.metadata.json" (
            if not "%%f"=="DATABASE_DOCUMENTATION.md.resolved" (
                if not "%%f"=="DATABASE_DOCUMENTATION.md.resolved.0" (
                    del "%%f" 2>nul
                )
            )
        )
    )
)
echo Done! Only DATABASE_DOCUMENTATION.md files remain.

echo.
echo ============================================
echo CLEANUP COMPLETE!
echo ============================================
echo.
echo Remaining files:
echo   - DATABASE_DOCUMENTATION.md (documentation folder)
echo   - MASTER_SCHEMA.sql (migrations folder)
echo.
pause
