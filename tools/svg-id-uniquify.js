const path = require('path');
const fs = require('fs');

const root = path.join(__dirname, '../src/images/cards');

const fileNames = fs.readdirSync(root);

fileNames.forEach(uniquifySvgIds);

function uniquifySvgIds(filename) {
  console.log(`Fixing: ${filename}`);
  const filepath = path.join(root, filename);
  const cardName = filename.substr(0, 2);
  const original = fs.readFileSync(filepath, 'utf8');

  const replaced = original
    .replace(/href="#/g, `href="#${cardName}-`)
    .replace(/id="/g, `id="${cardName}-`);

  fs.writeFileSync(filepath, replaced);
}
