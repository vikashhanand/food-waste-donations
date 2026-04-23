import os
import re

def remove_types(content):
    # Remove generic parameters from React.forwardRef
    content = re.sub(r'React\.forwardRef<[^>]+>', 'React.forwardRef', content)
    # Remove interface definitions
    content = re.sub(r'export interface [A-Za-z0-9]+ .*?{.*?}', '', content, flags=re.DOTALL)
    content = re.sub(r'interface [A-Za-z0-9]+ .*?{.*?}', '', content, flags=re.DOTALL)
    # Remove type definitions
    content = re.sub(r'export type [A-Za-z0-9]+ = .*?;', '', content, flags=re.DOTALL)
    content = re.sub(r'type [A-Za-z0-9]+ = .*?;', '', content, flags=re.DOTALL)
    # Remove 'as const'
    content = re.sub(r' as const', '', content)
    # Remove generic parameters from React hooks
    content = re.sub(r'useState<[^>]+>', 'useState', content)
    content = re.sub(r'useRef<[^>]+>', 'useRef', content)
    # Remove type annotations in parameter lists like (props: Props)
    content = re.sub(r':\s*[A-Z][a-zA-Z0-9]*\b(?=[,)\]\s=])', '', content)
    # Remove 'type VariantProps' from imports
    content = re.sub(r',\s*type\s+VariantProps', '', content)
    content = re.sub(r'type\s+VariantProps,?\s*', '', content)
    # Remove leading colons in destructuring and param lists
    content = re.sub(r':\s*([A-Za-z0-9{}|& \n]+)(?=[,)])', '', content)
    return content

src_dirs = ['src/components/ui', 'src/components', 'src/hooks', 'src/lib']
for src_dir in src_dirs:
    if not os.path.exists(src_dir): continue
    for filename in os.listdir(src_dir):
        if filename.endswith('.tsx') or filename.endswith('.ts'):
            filepath = os.path.join(src_dir, filename)
            with open(filepath, 'r') as f:
                content = f.read()
            
            # Simple manual removals for Shadcn patterns
            content = re.sub(r'implements [A-Z][a-zA-Z0-9]*', '', content)
            content = re.sub(r'extends [A-Za-z0-9<>]*', '', content)
            
            # Remove common TS patterns
            new_content = remove_types(content)
            
            new_filename = filename.replace('.tsx', '.jsx').replace('.ts', '.js')
            new_filepath = os.path.join(src_dir, new_filename)
            
            with open(new_filepath, 'w') as f:
                f.write(new_content)
            
            os.remove(filepath)
            print(f"Converted {filename} to {new_filename}")
