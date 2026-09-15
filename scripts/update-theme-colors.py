import os
import re

MAPPING = [
    # Dark Navy -> Deep Espresso Brown
    ('#192538', '#2A1810'),
    ('#0F172A', '#1F120A'),
    ('#141E2E', '#23140D'),
    ('#121B29', '#1F120A'),
    ('#2C3E5A', '#3D2314'),
    ('#3E5274', '#4E2F1D'),
    ('#24334D', '#362013'),
    ('#1E293B', '#2A1810'),
    
    # Bronze Gold Accent -> Rich Saddle Brown
    ('#8C6527', '#8B5A2B'),
    ('#74511D', '#70441E'),
    ('#5C3F14', '#553215'),
    
    # Cream / Beige Backgrounds & Borders
    ('#FAF7F0', '#FAF6F0'),
    ('#FDFCF8', '#FDFBF7'),
    ('#F7F3E9', '#F6EFE6'),
    ('#F3ECE0', '#F5EFEB'),
    ('#ECE4D4', '#EFE6DD'),
    ('#E2D7C3', '#E5D8CA'),
    ('#E8DFC8', '#E5D8CA'),
    ('#EFE8DD', '#EFE6DD'),
    ('#E5DCCB', '#E5D8CA'),
    ('#E8DEC8', '#E8DCCF'),
    ('#D4C5AD', '#D8C5B2'),
    ('#D9CDB7', '#D8C5B2'),
    ('#C1AF93', '#C4AE96'),
    ('#C4B496', '#C4AE96'),
    ('#A89577', '#A68A70'),
    ('#6B6357', '#6B584C'),
]

def update_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content
    count = 0
    for old_color, new_color in MAPPING:
        # replace exact uppercase
        pattern_upper = re.escape(old_color.upper())
        matches_upper = len(re.findall(pattern_upper, new_content))
        new_content = re.sub(pattern_upper, new_color, new_content)

        # replace lowercase
        pattern_lower = re.escape(old_color.lower())
        matches_lower = len(re.findall(pattern_lower, new_content))
        new_content = re.sub(pattern_lower, new_color.lower(), new_content)

        count += matches_upper + matches_lower

    if new_content != content:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return count
    return 0

total_changes = 0
changed_files = 0

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.css')):
            fp = os.path.join(root, file)
            c = update_file(fp)
            if c > 0:
                print(f"Updated {fp}: {c} replacements")
                total_changes += c
                changed_files += 1

print(f"\nTotal replacements: {total_changes} across {changed_files} files.")
