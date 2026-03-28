import fs from 'fs';
import path from 'path';

const projectRoot = '/Users/macbookpro/barber';

const replacements = [
  // Primary Orange to Base Blue
  { regex: /#FF6600/gi, replace: '#0055FF' },
  
  // Dark Brown/Blacks to Whites
  { regex: /#1F0B05/gi, replace: '#FFFFFF' },
  { regex: /#1A0500/gi, replace: '#FFFFFF' },
  { regex: /#111111/gi, replace: '#F8F9FA' },
  { regex: /#111(\b|[^0-9A-Fa-f])/gi, replace: '#F8F9FA$1' },
  { regex: /#000000/gi, replace: '#F0F0F0' },
  { regex: /#000(\b|[^0-9A-Fa-f])/gi, replace: '#F0F0F0$1' },

  // Off-Whites (which were text/accents on dark background) to Dark color (for light background)
  { regex: /#F5F5F5/gi, replace: '#111111' },
  
  // Specific Tailwind background strings that might not use hex
  { regex: /bg-black/g, replace: 'bg-white' },
];

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'dist' || file.startsWith('.')) continue;
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      filelist = walkSync(filepath, filelist);
    } else {
      if (filepath.endsWith('.tsx') || filepath.endsWith('.ts') || filepath.endsWith('.css')) {
        filelist.push(filepath);
      }
    }
  }
  return filelist;
};

const files = walkSync(projectRoot);

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  
  for (const r of replacements) {
    newContent = newContent.replace(r.regex, r.replace);
  }
  
  if (content !== newContent) {
    console.log(`Updated ${file}`);
    fs.writeFileSync(file, newContent, 'utf8');
  }
}
console.log('Done!');
