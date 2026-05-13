import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = '/Users/steve/Documents/PROJET/PROJET-ESEND/ESEND/public/images';
const outputDir = '/Users/steve/Documents/PROJET/PROJET-ESEND/ESEND/public/images';

async function convertToWebP() {
  const files = fs.readdirSync(inputDir);
  
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const inputPath = path.join(inputDir, file);
      const outputName = file.replace(ext, '.webp');
      const outputPath = path.join(outputDir, outputName);
      
      console.log(`Converting ${file} to ${outputName}...`);
      
      try {
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        
        const statsInput = fs.statSync(inputPath);
        const statsOutput = fs.statSync(outputPath);
        
        console.log(`✓ Done: ${(statsInput.size / 1024 / 1024).toFixed(2)}MB -> ${(statsOutput.size / 1024 / 1024).toFixed(2)}MB`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    }
  }
}

convertToWebP();
