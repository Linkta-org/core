const { execSync } = require('child_process');
const path = require('path');
const rimraf = require('rimraf');

const directories = ['.', 'client', 'server'];

directories.forEach((dir) => {
  const fullPath = path.resolve(__dirname, '..', dir);
  console.log(`┏━━━ ☢️ 🧨 ☢️ 🧨 NUKE NODE MODULES IN ${fullPath} ━━━━━━━━━━━━━━`);
  try {
    rimraf.sync(path.join(fullPath, 'node_modules'));
    execSync('npm install', { cwd: fullPath, stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to nuke and install in ${fullPath}`, error);
  }
});

console.log('🎉 All node_modules nuked and fresh packages installed!');
