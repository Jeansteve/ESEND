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
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        const isWebp = ext === '.webp';
        const tempPath = fullPath + '.tmp';
        const outputPath = isWebp ? fullPath : fullPath.replace(ext, '.webp');
        
        // Skip if it's already a webp and we've already processed it (avoid infinite loop)
        // But for this run, we WANT to process existing webp to resize them.
        
        process.stdout.write(`Optimizing ${file}... `);
        
        try {
          const image = sharp(fullPath);
          const metadata = await image.metadata();
          
          await image
            .resize({ width: 2560, withoutEnlargement: true })
            .webp({ quality: 75, effort: 6 })
            .toFile(tempPath);
          
          const statsInput = fs.statSync(fullPath);
          const statsOutput = fs.statSync(tempPath);
          
          fs.renameSync(tempPath, outputPath);
          if (!isWebp) fs.unlinkSync(fullPath);
          
          console.log(`✓ ${(statsInput.size / 1024).toFixed(0)}KB -> ${(statsOutput.size / 1024).toFixed(0)}KB`);
        } catch (err) {
          if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
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
