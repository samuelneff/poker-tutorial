const path = require('path');
const fs = require('fs');

const root = path.join(__dirname, '../src/images/cards');

const fileNames = fs.readdirSync(root);

fileNames.forEach(uniquifySvgIds);

function uniquifySvgIds(filename) {

  if (!/^[QJK]/.test(filename)) {
    return;
  }
  const filepath = path.join(root, filename);
  let svg = fs.readFileSync(filepath, 'utf8');
  const exp = /\s*<!ENTITY (\w+) "([^"]+)">\s*/g;
  const replacements = [];
  svg = svg.replace(exp, (ignore, entity, style) => {
    replacements.push({ entity, style });
    return '';
  });

  if (replacements.length === 0) {
    return;
  }

  replacements.forEach(replacement => {
    svg = svg.replace(
      new RegExp(`&${replacement.entity};`, 'g'),
      replacement.style);
  });

  svg = svg.replace(/<!DOCTYPE.*\[/, '');
  svg = svg.replace(/\]>/, '');
  svg = svg.trim();

  console.log(`-- ${filename}`);

  fs.writeFileSync(filepath, svg);
}
