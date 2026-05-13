import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  bold: "\x1b[1m"
};

console.log(`${colors.bold}${colors.cyan}--- ESEND INTEGRITY CHECK v1.0 ---${colors.reset}\n`);

// 1. Check Build
console.log(`${colors.bold}Step 1: Running Build...${colors.reset}`);
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log(`\n${colors.green}✓ Build Success!${colors.reset}\n`);
} catch (err) {
  console.error(`\n${colors.red}✗ Build Failed! Please fix compilation errors before pushing.${colors.reset}\n`);
  process.exit(1);
}

// 2. Check for missing imports (Basic Check)
console.log(`${colors.bold}Step 2: Scanning for suspicious patterns...${colors.reset}`);
const srcDir = './src';
let errors = 0;

function walk(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Check for useSettings usage without import
      if (content.includes('useSettings()') && !content.includes("import { useSettings }")) {
        console.log(`${colors.red}✗ Error in ${fullPath}: useSettings used but not imported!${colors.reset}`);
        errors++;
      }

      // Check for .png/.jpg/jpeg in code (deprecated)
      const matches = content.match(/\/images\/.*?\.(png|jpg|jpeg)/g);
      if (matches) {
        matches.forEach(match => {
          console.log(`${colors.yellow}⚠ Warning in ${fullPath}: Deprecated image format detected (${match}). Use .webp instead.${colors.reset}`);
        });
      }
    }
  });
}

walk(srcDir);

if (errors > 0) {
  console.log(`\n${colors.red}✗ Integrity check failed with ${errors} error(s).${colors.reset}\n`);
  process.exit(1);
} else {
  console.log(`\n${colors.green}✓ Integrity check passed!${colors.reset}\n`);
}
