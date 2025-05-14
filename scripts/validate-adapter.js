// JavaScript source code

const fs = require('fs');
const path = require('path');

const adapterName = process.argv[2];

if (!adapterName) {
    console.error("❌ No adapter name provided. Usage: node scripts/validate-adapter.js <adapter-name>");
    process.exit(1);
}

const adapterDir = path.resolve(__dirname, '../src/adapters', adapterName);
const entryFileTs = path.join(adapterDir, 'index.ts');
const entryFileJs = path.join(adapterDir, 'index.js');

if (!fs.existsSync(adapterDir)) {
    console.error(`❌ Adapter directory not found: ${adapterDir}`);
    process.exit(1);
}

if (!fs.existsSync(entryFileTs) && !fs.existsSync(entryFileJs)) {
    console.error(`❌ No entry file (index.ts or index.js) found for adapter: ${adapterName}`);
    process.exit(1);
}

// Opcional: validar contenido mínimo
const entryFile = fs.existsSync(entryFileTs) ? entryFileTs : entryFileJs;
const content = fs.readFileSync(entryFile, 'utf-8');

if (!content.includes('export')) {
    console.warn(`⚠️ Entry file does not contain an export statement: ${entryFile}`);
}

console.log(`✅ Adapter "${adapterName}" passed basic validation.`);
