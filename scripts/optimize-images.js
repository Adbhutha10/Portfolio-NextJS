const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/sequence');
const outputDir = inputDir; // Same directory

if (!fs.existsSync(inputDir)) {
    console.error(`Input directory not found: ${inputDir}`);
    process.exit(1);
}

// Ensure sharp is working
try {
    require.resolve('sharp');
} catch (e) {
    console.error('Sharp is not installed. Please run "npm install sharp"');
    process.exit(1);
}

const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.png'));

console.log(`Found ${files.length} PNG files. Converting to WebP...`);

async function convertAll() {
    let count = 0;
    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, file.replace('.png', '.webp'));

        try {
            await sharp(inputPath)
                .webp({ quality: 75, responsive: true })
                .toFile(outputPath);

            count++;
            process.stdout.write(`\rConverted: ${count}/${files.length} - ${file}`);
        } catch (error) {
            console.error(`\nError converting ${file}:`, error);
        }
    }
    console.log(`\n\n✅ Done! Converted ${count} images.`);
}

convertAll();
