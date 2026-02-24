#!/usr/bin/env python3
"""
Mark a GitHub Achievement badge as earned in README.md.
Usage:
  python scripts/badge.py "Pull Shark"
  python scripts/badge.py pull-shark
  python scripts/badge.py          # interactive menu
"""

import sys
from pathlib import Path
from typing import Optional

README = Path(__file__).resolve().parent.parent / "README.md"

BADGES = [
    ("Pull Shark", "🦈"),
    ("Pair Extraordinaire", "🤝"),
    ("Quickdraw", "⚡"),
    ("Starstruck", "🌟"),
    ("Galaxy Brain", "🧠"),
    ("YOLO", "🎲"),
    ("Open Sourcerer", "🎖️"),
    ("Public Sponsor", "💜"),
]

# Allow short names for CLI
ALIASES = {
    "pull": "Pull Shark",
    "pull-shark": "Pull Shark",
    "pair": "Pair Extraordinaire",
    "pair-extraordinaire": "Pair Extraordinaire",
    "quick": "Quickdraw",
    "quickdraw": "Quickdraw",
    "star": "Starstruck",
    "starstruck": "Starstruck",
    "galaxy": "Galaxy Brain",
    "galaxy-brain": "Galaxy Brain",
    "yolo": "YOLO",
    "open": "Open Sourcerer",
    "open-sourcerer": "Open Sourcerer",
    "sponsor": "Public Sponsor",
    "public-sponsor": "Public Sponsor",
}


def find_badge_name(input_str: str) -> Optional[str]:
    if not input_str or not input_str.strip():
        return None
    raw = input_str.strip()
    if raw in ALIASES:
        return ALIASES[raw]
    for name, _ in BADGES:
        if raw.lower() == name.lower():
            return name
    return None


def mark_badge_in_readme(badge_name: str) -> bool:
    if not README.exists():
        print(f"README not found: {README}")
        return False
    lines = README.read_text(encoding="utf-8").splitlines()
    found = False
    for i, line in enumerate(lines):
        if badge_name in line and "| ⬜ |" in line:
            lines[i] = line.replace("| ⬜ |", "| ✅ |", 1)
            found = True
            break
    if not found:
        print(f"Badge row not found or already marked: {badge_name}")
        return False
    README.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Marked '{badge_name}' as earned [OK]")
    return True


def main():
    if len(sys.argv) >= 2:
        name = find_badge_name(sys.argv[1])
        if name:
            mark_badge_in_readme(name)
        else:
            print(f"Unknown badge: {sys.argv[1]}")
            print("Known: " + ", ".join(b[0] for b in BADGES))
        return

    # Interactive menu
    print("Which badge did you earn? (enter number or name)\n")
    for i, (name, emoji) in enumerate(BADGES, 1):
        print(f"  {i}. {emoji} {name}")
    print("  0. Cancel")
    try:
        choice = input("\nChoice: ").strip()
    except EOFError:
        choice = "0"
    if choice == "0":
        return
    if choice.isdigit():
        idx = int(choice)
        if 1 <= idx <= len(BADGES):
            mark_badge_in_readme(BADGES[idx - 1][0])
            return
    name = find_badge_name(choice)
    if name:
        mark_badge_in_readme(name)
    else:
        print("Unknown badge. Use a number 1–8 or the badge name.")


if __name__ == "__main__":
    main()
