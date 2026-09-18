import os

BASE_DIR = 'D:/Task Mangement Website/src'

def write_file(rel_path, content):
    full_path = os.path.join(BASE_DIR, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content.strip() + '\n')
    print('Wrote:', rel_path)

if __name__ == '__main__':
    print('Ready to write frontend files.')
