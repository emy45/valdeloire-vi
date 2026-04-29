#!/usr/bin/env python3
import os
import re

# Mapping des couleurs rouges vers la nouvelle couleur bleue
color_mapping = {
    'red-50': '#e6eaf0',      # light background
    'red-100': '#ccd5e0',     # lighter background
    'red-200': '#99abd1',     # border light
    'red-600': '#002a5c',     # slightly lighter
    'red-700': '#001e40',     # brand blue
    'red-800': '#001429',     # brand blue dark
}

def replace_tailwind_colors(content):
    """Remplace les classes Tailwind red- par les couleurs hexadécimales"""
    # Remplacer bg-red-X par bg-[#color]
    for old_color, new_color in color_mapping.items():
        content = content.replace(f'bg-{old_color}', f'bg-[{new_color}]')
        content = content.replace(f'text-{old_color}', f'text-[{new_color}]')
        content = content.replace(f'border-{old_color}', f'border-[{new_color}]')
        content = content.replace(f'hover:bg-{old_color}', f'hover:bg-[{new_color}]')
        content = content.replace(f'hover:text-{old_color}', f'hover:text-[{new_color}]')
        content = content.replace(f'hover:border-{old_color}', f'hover:border-[{new_color}]')
        content = content.replace(f'focus:ring-{old_color}', f'focus:ring-[{new_color}]')
        content = content.replace(f'from-{old_color}', f'from-[{new_color}]')
        content = content.replace(f'to-{old_color}', f'to-[{new_color}]')
    return content

# Fichiers à traiter
files_to_process = [
    'src/app/pages/Contact.tsx',
    'src/app/pages/Blog.tsx',
    'src/app/pages/BlogArticle1.tsx',
    'src/app/pages/BlogArticle2.tsx',
    'src/app/pages/BlogDynamic.tsx',
    'src/app/pages/BlogArticleDynamic.tsx',
    'src/app/pages/AdminLogin.tsx',
    'src/app/pages/AdminSignup.tsx',
    'src/app/pages/AdminDashboard.tsx',
    'src/app/pages/AdminArticleEditor.tsx',
]

for file_path in files_to_process:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = replace_tailwind_colors(content)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f'✓ {file_path} - Converti')
    except Exception as e:
        print(f'✗ {file_path} - Erreur: {e}')

print('\nConversion terminée!')
