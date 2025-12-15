import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Country code mapping - you may need to adjust this based on the order of flags in your image
// Common country codes: US, GB, DE, FR, IT, ES, BR, AR, MX, JP, CN, IN, AU, CA, etc.
const COUNTRY_CODES = [
  'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR',
  'AS', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE',
  'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ',
  'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CC', 'CD',
  'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR',
  'CU', 'CV', 'CW', 'CX', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM',
  'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI',
  'FJ', 'FK', 'FM', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF',
  'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS',
  'GT', 'GU', 'GW', 'GY', 'HK', 'HM', 'HN', 'HR', 'HT', 'HU',
  'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IR', 'IS', 'IT',
  'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN',
  'KP', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK',
  'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME',
  'MF', 'MG', 'MH', 'MK', 'ML', 'MM', 'MN', 'MO', 'MP', 'MQ',
  'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA',
  'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU',
  'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM',
  'PN', 'PR', 'PS', 'PT', 'PW', 'PY', 'QA', 'RE', 'RO', 'RS',
  'RU', 'RW', 'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI',
  'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV',
  'SX', 'SY', 'SZ', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK',
  'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA',
  'UG', 'UM', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VI',
  'VN', 'VU', 'WF', 'WS', 'XK', 'YE', 'YT', 'ZA', 'ZM', 'ZW'
];

async function analyzeAndSplitImage() {
  const inputPath = path.join(__dirname, 'src', 'assets', 'images', 'firsttheme', 'image.png');
  const outputDir = path.join(__dirname, 'src', 'assets', 'images', 'firsttheme', 'flags');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log('Image dimensions:', metadata.width, 'x', metadata.height);
    console.log('Image format:', metadata.format);

    // Analyze the image to detect grid pattern
    // This is a simplified approach - you may need to adjust based on your image
    // Common flag sprite dimensions: 16x16, 24x24, 32x32, 48x48, 64x64 pixels per flag
    
    // Try to detect flag size by analyzing the image
    // Common flag sprite dimensions: square (16x16, 24x24, 32x32, etc.) or 2:1 ratio
    
    let flagWidth = null;
    let flagHeight = null;
    let cols = null;
    let rows = null;

    // Check if it's a vertical strip (single column)
    if (metadata.width < 100) {
      // Try square flags first
      const possibleHeights = [16, 20, 22, 24, 30, 32, 33, 40, 44, 48, 50, 60, 64, 66];
      
      for (const height of possibleHeights) {
        if (metadata.height % height === 0) {
          const calculatedRows = metadata.height / height;
          // Check if width matches (square) or is reasonable for 2:1 ratio
          if (metadata.width === height || metadata.width === height * 1.5 || metadata.width === height * 2) {
            flagWidth = metadata.width;
            flagHeight = height;
            cols = 1;
            rows = calculatedRows;
            console.log(`Detected vertical strip: ${rows} flags, each ${flagWidth}x${flagHeight}px`);
            break;
          }
        }
      }
      
      // If still not found, try to find the most likely height
      if (!flagWidth) {
        // Common flag heights that might work
        const testHeights = [22, 24, 30, 32, 33, 40, 44, 48, 50, 60, 66];
        for (const height of testHeights) {
          const remainder = metadata.height % height;
          if (remainder < 5) { // Allow small remainder for imperfect images
            flagWidth = metadata.width;
            flagHeight = height;
            cols = 1;
            rows = Math.floor(metadata.height / height);
            console.log(`Detected vertical strip (approximate): ${rows} flags, each ${flagWidth}x${flagHeight}px`);
            break;
          }
        }
      }
    }

    // Try grid pattern (multiple columns)
    if (!flagWidth) {
      const possibleFlagSizes = [16, 20, 24, 32, 40, 48, 64, 80, 96, 128];
      
      for (const size of possibleFlagSizes) {
        if (metadata.width % size === 0 && metadata.height % size === 0) {
          flagWidth = size;
          flagHeight = size;
          cols = metadata.width / size;
          rows = metadata.height / size;
          console.log(`Detected grid: ${cols}x${rows} flags, each ${flagWidth}x${flagHeight}px`);
          break;
        }
      }
    }

    // If no perfect grid found, try rectangular flags
    if (!flagWidth) {
      const rectSizes = [
        { w: 32, h: 24 }, { w: 40, h: 30 }, { w: 48, h: 36 },
        { w: 64, h: 48 }, { w: 80, h: 60 }, { w: 96, h: 72 }
      ];
      
      for (const size of rectSizes) {
        if (metadata.width % size.w === 0 && metadata.height % size.h === 0) {
          flagWidth = size.w;
          flagHeight = size.h;
          cols = metadata.width / size.w;
          rows = metadata.height / size.h;
          console.log(`Detected rectangular grid: ${cols}x${rows} flags, each ${flagWidth}x${flagHeight}px`);
          break;
        }
      }
    }

    if (!flagWidth || !flagHeight) {
      console.log('Could not auto-detect grid pattern. Please specify manually.');
      console.log('Image dimensions:', metadata.width, 'x', metadata.height);
      console.log('\nPlease provide:');
      console.log('- Flag width (px)');
      console.log('- Flag height (px)');
      console.log('- Number of columns');
      console.log('- Number of rows');
      return;
    }

    const totalFlags = cols * rows;
    console.log(`Total flags to extract: ${totalFlags}`);

    // Extract each flag
    let flagIndex = 0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const left = col * flagWidth;
        const top = row * flagHeight;
        
        // Use country code if available, otherwise use index
        const countryCode = flagIndex < COUNTRY_CODES.length 
          ? COUNTRY_CODES[flagIndex] 
          : `FLAG_${flagIndex.toString().padStart(3, '0')}`;
        
        const outputPath = path.join(outputDir, `${countryCode}.png`);
        
        await sharp(inputPath)
          .extract({
            left,
            top,
            width: flagWidth,
            height: flagHeight
          })
          .png()
          .toFile(outputPath);
        
        console.log(`Extracted: ${countryCode}.png (${flagIndex + 1}/${totalFlags})`);
        flagIndex++;
      }
    }

    console.log(`\n✅ Successfully extracted ${flagIndex} flags to ${outputDir}`);
    console.log(`\nNote: If the country codes don't match, you may need to reorder the COUNTRY_CODES array`);
    console.log(`or manually rename the files based on the actual flag order in your image.`);

  } catch (error) {
    console.error('Error processing image:', error);
  }
}

analyzeAndSplitImage();

