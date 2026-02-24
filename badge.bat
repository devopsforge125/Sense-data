@echo off
REM Mark a GitHub Achievement badge as earned in README.md
REM Usage: badge "Pull Shark"   or   badge   (interactive menu)
cd /d "%~dp0"
python scripts\badge.py %*
