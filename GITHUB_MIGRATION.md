# 🐙 Migrate to GitHub Guide

This guide will help you move your project from GitLab to GitHub by resetting your local git repository.

## 1️⃣ Create New Repo on GitHub
1. Go to **[GitHub.com/new](https://github.com/new)**.
2. Enter Repository Name: `pondimeditour` (or whatever you prefer).
3. **Important**: Do NOT check "Add a README", "Add .gitignore", or "Choose a license". Create an empty repository.
4. Click **Create repository**.
5. Copy the HTTPS URL (e.g., `https://github.com/YOUR_USERNAME/pondimeditour.git`).

## 2️⃣ Run Migration Script
I have created a script `RESET_GIT.bat` in your project folder.
1. Determine your new GitHub URL.
2. Double click `d:\pondimeditour\RESET_GIT.bat`.
3. Follow the prompts.

## Manual Steps (If you prefer)
If you don't want to use the script, run these commands in your terminal:

```bash
cd d:\pondimeditour

# 1. Remove old git history
rmdir /s /q .git

# 2. Initialize new git
git init
git add .
git commit -m "Initial commit for GitHub"

# 3. Link to GitHub (Replace URL!)
git remote add origin https://github.com/YOUR_USERNAME/pondimeditour.git

# 4. Push code
git branch -M main
git push -u origin main
```
