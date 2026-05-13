import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, '../public');

async function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await walk(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const outputName = file.replace(ext, '.webp');
        const outputPath = path.join(dir, outputName);
        
        process.stdout.write(`Converting ${fullPath}... `);
        
        try {
          await sharp(fullPath)
            .webp({ quality: 80 })
            .toFile(outputPath);
          
          const statsInput = fs.statSync(fullPath);
          const statsOutput = fs.statSync(outputPath);
          
          fs.unlinkSync(fullPath);
          console.log(`✓ ${(statsInput.size / 1024).toFixed(0)}KB -> ${(statsOutput.size / 1024).toFixed(0)}KB`);
        } catch (err) {
          console.log(`✗ Error: ${err.message}`);
        }
      }
    }
  }
}

async function start() {
  console.log(`--- Starting Recursive WebP Optimization in ${publicDir} ---`);
  await walk(publicDir);
  console.log('--- Optimization Complete ---');
}

start();
