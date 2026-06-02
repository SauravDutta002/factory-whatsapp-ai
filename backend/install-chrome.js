const { execSync } = require('child_process');
const path = require('path');

// Force Puppeteer to install Chrome to the local project folder
process.env.PUPPETEER_CACHE_DIR = path.join(__dirname, '.cache', 'puppeteer');

console.log('==================================================');
console.log('  Installing Puppeteer Chrome Browser Locally...');
console.log('  Target path:', process.env.PUPPETEER_CACHE_DIR);
console.log('==================================================');

try {
  execSync('npx puppeteer browsers install chrome', { stdio: 'inherit' });
  console.log('Chrome installed successfully!');
} catch (err) {
  console.error('Error installing Chrome:', err.message);
  process.exit(1);
}
