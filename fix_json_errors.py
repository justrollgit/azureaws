#!/usr/bin/env python3
"""
JSON Syntax Error Fixer for AWS Certification Platform
Systematically fixes common JSON syntax errors in lab files.
"""

import json
import re
import os
from pathlib import Path

def fix_json_file(file_path):
    """Fix common JSON syntax errors in a file."""
    print(f"Processing: {file_path}")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Test if already valid
        try:
            json.loads(content)
            print(f"✅ {file_path}: Already valid JSON")
            return True
        except json.JSONDecodeError:
            pass
        
        # Common fixes
        original_content = content
        
        # Fix 1: Fix unescaped newlines in JSON strings
        # Look for patterns like: "code": "content\n with newlines"
        content = re.sub(r'(\\"code\\":\s*\\"[^"]*?)\\n([^"]*?)(\\")', r'\1\\\\n\2\3', content)
        
        # Fix 2: Fix unescaped quotes in JSON strings
        # Look for patterns where quotes are not properly escaped within strings
        lines = content.split('\n')
        fixed_lines = []
        
        for i, line in enumerate(lines):
            # Check for common patterns that cause issues
            if '"language": "bash",' in line and '\\n' in line:
                # This line has embedded newlines that need proper escaping
                # Split at the problematic part and fix
                if '"title"' in line and '"code"' in line:
                    # This is a malformed line that should be split
                    parts = line.split('"title"')
                    if len(parts) == 2:
                        fixed_lines.append(parts[0].rstrip(','))
                        fixed_lines.append('          "title"' + parts[1])
                        continue
            
            # Fix missing commas in code_examples blocks
            if line.strip() == '}' and i < len(lines) - 1:
                next_line = lines[i + 1].strip()
                if next_line == ']' and i + 2 < len(lines):
                    next_next_line = lines[i + 2].strip()
                    if next_next_line.startswith('},'):
                        # This should be } not ]
                        fixed_lines.append(line)
                        fixed_lines.append(lines[i + 1].replace(']', '}'))
                        continue
            
            fixed_lines.append(line)
        
        content = '\n'.join(fixed_lines)
        
        # Fix 3: Fix array/object mismatches in code_examples
        content = re.sub(r'(\s+})\s*\]\s*(\s+},)', r'\1\n\2', content)
        
        # Fix 4: Ensure proper closing of code_examples objects
        content = re.sub(r'(\s+})\s*\]\s*(\s+}),(\s+{)', r'\1\n      }\n    },\3', content)
        
        # Try to parse again
        try:
            json.loads(content)
            print(f"✅ {file_path}: Fixed successfully")
            
            # Backup original and save fixed version
            backup_path = file_path + '.backup'
            with open(backup_path, 'w', encoding='utf-8') as f:
                f.write(original_content)
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            return True
            
        except json.JSONDecodeError as e:
            print(f"❌ {file_path}: Still has errors after attempted fix - {e}")
            return False
            
    except Exception as e:
        print(f"❌ {file_path}: Error processing file - {e}")
        return False

def main():
    """Main function to fix all problematic JSON files."""
    
    # Files identified as having JSON syntax errors
    problematic_files = [
        'enterprise-governance-lab.json',
        'identity-access-lab.json', 
        'advanced-networking-patterns-lab.json',
        'hub-spoke-architecture-lab.json',
        'well-architected-framework-lab.json',
        'monitoring-logging-lab.json',
        'multi-account-governance-lab.json',
        'high-performance-computing-lab.json',
        'azure-landing-zones-lab.json'
    ]
    
    labs_dir = Path('/home/dz/code/ep/azureaws/content/labs')
    
    fixed_count = 0
    total_count = len(problematic_files)
    
    print("🔧 AWS Certification Platform JSON Fixer")
    print(f"Processing {total_count} files with JSON syntax errors...\n")
    
    for filename in problematic_files:
        file_path = labs_dir / filename
        if file_path.exists():
            if fix_json_file(file_path):
                fixed_count += 1
        else:
            print(f"❌ File not found: {file_path}")
    
    print(f"\n📊 Summary:")
    print(f"  Total files processed: {total_count}")
    print(f"  Successfully fixed: {fixed_count}")
    print(f"  Still need manual fixes: {total_count - fixed_count}")
    
    if fixed_count == total_count:
        print("\n🎯 All JSON syntax errors have been resolved!")
    else:
        print(f"\n⚠️  {total_count - fixed_count} files still need manual attention")

if __name__ == "__main__":
    main()