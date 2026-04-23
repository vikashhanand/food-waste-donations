import os
import re

def clean_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # 1. Remove generic parameters from React.forwardRef<..., ...>
    content = re.sub(r'React\.forwardRef<[^>]+>', 'React.forwardRef', content)
    
    # 2. Remove type annotations like ": React.ComponentProps<...>"
    content = re.sub(r':\s*React\.ComponentProps(?:WithoutRef)?<[^>]+>', '', content)
    
    # 3. Remove other common type annotations in parameters
    content = re.sub(r':\s*[A-Z][a-zA-Z0-9]*<[^>]+>', '', content)
    content = re.sub(r':\s*[A-Z][a-zA-Z0-9]*\. [A-Z][a-zA-Z0-9]*<[^>]+>', '', content)
    
    # 4. Remove simple type annotations like ": string" or ": boolean"
    # Matches : followed by word, but NOT followed by { or ( to avoid breaking ternary
    content = re.sub(r':\s*(?:string|boolean|number|any|void|object)\b', '', content)

    # 5. Remove interface/type definitions that might be left
    content = re.sub(r'export interface [A-Za-z0-9]+ .*?\{.*?\}', '', content, flags=re.DOTALL)
    content = re.sub(r'interface [A-Za-z0-9]+ .*?\{.*?\}', '', content, flags=re.DOTALL)
    content = re.sub(r'export type [A-Za-z0-9]+ = .*?;', '', content, flags=re.DOTALL)
    content = re.sub(r'type [A-Za-z0-9]+ = .*?;', '', content, flags=re.DOTALL)
    
    # 6. Remove "VariantProps<...>" unions
    content = re.sub(r'&\s*VariantProps<[^>]+>', '', content)
    content = re.sub(r'VariantProps<[^>]+>\s*&', '', content)
    content = re.sub(r'&\s*[A-Z][a-zA-Z0-9]*', '', content) # e.g. & Props
    
    # 7. Remove leading/dangling colons in parameter lists
    # e.g. (props: Props) -> (props)
    content = re.sub(r':\s*[A-Z][a-zA-Z0-9]*\b(?=[,)\]\s=])', '', content)

    # 8. Fix broken forwardRef pattern if the above left a comma or something
    # (Matches what happened to Label earlier)
    content = re.sub(r'React\.forwardRef,\s*[^>]+>', 'React.forwardRef', content)
    content = re.sub(r'React\.forwardRef\s*>\s*\(', 'React.forwardRef(', content)

    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Cleaned {filepath}")

ui_dir = 'src/components/ui'
for filename in os.listdir(ui_dir):
    if filename.endswith('.jsx') or filename.endswith('.js'):
        clean_file(os.path.join(ui_dir, filename))
