/**
 * Script de build pour l'application Tauri
 * Copie les fichiers HTML et assets dans le dossier app-dist
 */

import { cpSync, mkdirSync, rmSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'app-dist');

// Nettoyer le dossier de destination
if (existsSync(distDir)) {
  rmSync(distDir, { recursive: true });
}
mkdirSync(distDir, { recursive: true });

// Fichiers HTML à copier
const htmlFiles = [
  'index.html',
  'builder.html',
  'builderIA.html',
  'playground.html',
  'favoris.html',
  'sources.html'
];

// Dossiers à copier
const directories = [
  'demo',
  'dist'  // Les fichiers JS compilés
];

// Copier les fichiers HTML
console.log('Copying HTML files...');
for (const file of htmlFiles) {
  const src = join(rootDir, file);
  const dest = join(distDir, file);
  if (existsSync(src)) {
    cpSync(src, dest);
    console.log(`  ✓ ${file}`);
  } else {
    console.log(`  ✗ ${file} (not found)`);
  }
}

// Copier les dossiers
console.log('\nCopying directories...');
for (const dir of directories) {
  const src = join(rootDir, dir);
  const dest = join(distDir, dir);
  if (existsSync(src)) {
    cpSync(src, dest, { recursive: true });
    console.log(`  ✓ ${dir}/`);
  } else {
    console.log(`  ✗ ${dir}/ (not found)`);
  }
}

console.log('\n✓ Build completed: app-dist/');
