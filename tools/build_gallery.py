#!/usr/bin/env python3
"""
Rebuilds js/images.js from the photos inside the images/ folders.

You never need to run this by hand: the GitHub Action in
.github/workflows/update-gallery.yml runs it every time a photo is
added to or removed from images/.

To run it yourself:   python tools/build_gallery.py

Rules
- The FOLDER decides the category (see CATEGORIES below).
- Photos are listed in file-name order (gate-01, gate-02, ...).
- Descriptions ("alt") already written in js/images.js are kept.
  New photos get a simple default description that you can edit later.
"""

import re
from pathlib import Path
from urllib.parse import quote

try:
    from PIL import Image          # only used to read each photo's size
except ImportError:
    Image = None

ROOT = Path(__file__).resolve().parent.parent
IMAGES_DIR = ROOT / 'images'
OUTPUT = ROOT / 'js' / 'images.js'
EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp'}

# key used by the website, folder name, names in English and Amharic
CATEGORIES = [
    ('gates',     'gates',        'Gate doors',        'የግቢ በሮች',        'Gate door',        'የግቢ በር'),
    ('doors',     'door-windows', 'Doors and windows', 'በሮች እና መስኮቶች',  'Door and window',  'በር እና መስኮት'),
    ('handrails', 'handrails',    'Handrails',         'የደረጃ እጀታዎች',   'Handrail',         'የደረጃ እጀታ'),
    ('custom',    'customs',      'Tables and beds',   'ጠረጴዛ እና አልጋ',   'Custom furniture', 'ልዩ የብረት ስራ'),
]


def natural_key(path):
    """gate-2 comes before gate-10"""
    return [int(part) if part.isdigit() else part.lower()
            for part in re.split(r'(\d+)', path.name)]


def js_string(text):
    return "'" + text.replace('\\', '\\\\').replace("'", "\\'") + "'"


def read_old_descriptions():
    """Remember the alt text already written for each file."""
    if not OUTPUT.exists():
        return {}
    old = OUTPUT.read_text(encoding='utf-8')
    found = {}
    for line in old.splitlines():
        file_match = re.search(r"file:\s*'([^']+)'", line)
        alt_match = re.search(r"alt:\s*'((?:[^'\\]|\\.)*)'", line)
        if file_match and alt_match:
            found[file_match.group(1)] = alt_match.group(1).replace("\\'", "'").replace('\\\\', '\\')
    return found


def photo_size(path):
    if Image is None:
        return None
    try:
        with Image.open(path) as img:
            return img.size
    except Exception:
        return None


def main():
    old_alts = read_old_descriptions()
    lines = []
    total = 0

    for key, folder, name_en, name_am, single_en, single_am in CATEGORIES:
        folder_path = IMAGES_DIR / folder
        files = []
        if folder_path.is_dir():
            files = sorted((f for f in folder_path.iterdir()
                            if f.suffix.lower() in EXTENSIONS), key=natural_key)
        lines.append(f'  // ---- {name_en}  (folder: images/{folder}) ----')

        for number, photo in enumerate(files, start=1):
            web_path = quote(f'images/{folder}/{photo.name}', safe='/')
            alt = old_alts.get(web_path, f'{single_en} {number}')
            size = photo_size(photo)
            size_part = f' w: {size[0]}, h: {size[1]},' if size else ''
            lines.append(f"  {{ category: '{key}', file: {js_string(web_path)},{size_part} alt: {js_string(alt)} }},")
            total += 1
        lines.append('')

    category_lines = []
    for key, folder, name_en, name_am, single_en, single_am in CATEGORIES:
        category_lines.append(
            f"  {key}: {{ name: {{ en: {js_string(name_en)}, am: {js_string(name_am)} }}, "
            f"single: {{ en: {js_string(single_en)}, am: {js_string(single_am)} }} }}"
        )

    text = (
        "/*\n"
        "  Photo list for the gallery.\n"
        "\n"
        "  THIS FILE IS MADE AUTOMATICALLY from the photos in the images/ folders\n"
        "  (see tools/build_gallery.py). To add a photo, just put it in the right\n"
        "  folder - you do not need to edit this file.\n"
        "\n"
        "  You can still change the \"alt\" text of a photo here (a short description\n"
        "  for screen readers). It is kept the next time the list is rebuilt.\n"
        "*/\n"
        "\n"
        "const CATEGORIES = {\n"
        + ",\n".join(category_lines) +
        "\n};\n"
        "\n"
        "const PHOTOS = [\n"
        + "\n".join(lines).rstrip() +
        "\n];\n"
    )

    OUTPUT.write_text(text, encoding='utf-8')
    print(f'Wrote {OUTPUT.relative_to(ROOT)} with {total} photos.')


if __name__ == '__main__':
    main()
