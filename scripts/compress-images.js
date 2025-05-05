import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join } from 'path';

async function compressImages() {
  try {
    const assetsDir = join(process.cwd(), 'src', 'assets');
    const outputDir = join(assetsDir, 'compressed');

    // Create output directory if it doesn't exist
    await mkdir(outputDir, { recursive: true });

    // Read all PNG files from assets directory
    const files = await readdir(assetsDir);
    const pngFiles = files.filter(file => file.toLowerCase().endsWith('.png'));

    for (const file of pngFiles) {
      const inputPath = join(assetsDir, file);
      const outputPath = join(outputDir, file);

      await sharp(inputPath)
        .png({ quality: 80, compressionLevel: 9 })
        .toFile(outputPath);

      console.log(`Compressed ${file}`);
    }

    console.log('Image compression complete!');
  } catch (error) {
    console.error('Error compressing images:', error);
    process.exit(1);
  }
}

compressImages();