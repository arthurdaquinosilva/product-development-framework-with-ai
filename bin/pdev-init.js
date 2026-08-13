#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const readline = require('node:readline');

const PKG_ROOT = path.join(__dirname, '..');

// Buffer every input line so none are lost between sequential prompts
// (plain readline.question drops piped lines asked for after they arrive).
function createLineReader() {
  const rl = readline.createInterface({ input: process.stdin });
  const queue = [];
  const waiters = [];
  let closed = false;

  rl.on('line', (line) => {
    const waiter = waiters.shift();
    if (waiter) waiter(line);
    else queue.push(line);
  });
  rl.on('close', () => {
    closed = true;
    let waiter;
    while ((waiter = waiters.shift())) waiter(null);
  });

  return {
    next() {
      if (queue.length) return Promise.resolve(queue.shift());
      if (closed) return Promise.resolve(null);
      return new Promise((resolve) => waiters.push(resolve));
    },
    close() {
      rl.close();
    },
  };
}

async function ask(reader, query, fallback) {
  process.stdout.write(query);
  const line = await reader.next();
  if (line === null) {
    process.stdout.write('\n');
    return fallback;
  }
  const trimmed = line.trim();
  return trimmed === '' ? fallback : trimmed;
}

function expandHome(p) {
  if (p === '~') return os.homedir();
  if (p.startsWith('~/')) return path.join(os.homedir(), p.slice(2));
  return p;
}

async function main() {
  const reader = createLineReader();

  console.log('');
  console.log('Product Development Framework With AI — Setup');
  console.log('==============================================');
  console.log('');
  console.log('Language / Idioma:');
  console.log('  1) English');
  console.log('  2) Português (Brasil)');
  console.log('');

  const langChoice = await ask(reader, 'Choose / Escolha [1]: ', '1');
  const lang = langChoice === '2' ? 'pt-br' : 'en';

  console.log('');

  const targetInput = await ask(reader, 'Target project directory / Diretório do projeto [.]: ', '.');
  const target = path.resolve(expandHome(targetInput));

  const docsPrompt = lang === 'pt-br' ? 'Nome da pasta de documentos [docs]: ' : 'Docs folder name [docs]: ';
  const docs = await ask(reader, docsPrompt, 'docs');

  console.log('');

  const docsPath = path.join(target, docs);
  if (fs.existsSync(docsPath)) {
    const confirm = await ask(reader, `⚠  ${docsPath} already exists. Continue? [y/N]: `, 'N');
    if (confirm.toLowerCase() !== 'y') {
      console.log('Aborted.');
      reader.close();
      return;
    }
  }

  reader.close();

  const templatesDir = path.join(PKG_ROOT, lang, 'templates');
  if (!fs.existsSync(templatesDir)) {
    throw new Error(`Templates not found at ${templatesDir} — the package may be incomplete.`);
  }

  console.log(`Setting up in ${target} ...`);
  console.log('');

  fs.mkdirSync(docsPath, { recursive: true });

  // Copy templates — CLAUDE.md and AGENTS.md go to project root, rest to docs/
  const files = fs.readdirSync(templatesDir).filter((f) => f.endsWith('.md')).sort();
  for (const fname of files) {
    const src = path.join(templatesDir, fname);
    if (fname === 'CLAUDE.md' || fname === 'AGENTS.md') {
      fs.copyFileSync(src, path.join(target, fname));
      console.log(`  ✓ ${fname} → (project root)`);
    } else {
      fs.copyFileSync(src, path.join(docsPath, fname));
      console.log(`  ✓ ${fname} → ${docs}/`);
    }
  }

  // Fix artifact paths in AGENTS.md and CLAUDE.md if docs folder isn't "docs"
  if (docs !== 'docs') {
    for (const fname of ['AGENTS.md', 'CLAUDE.md']) {
      const p = path.join(target, fname);
      if (fs.existsSync(p)) {
        fs.writeFileSync(p, fs.readFileSync(p, 'utf8').split('docs/').join(`${docs}/`));
      }
    }
  }

  console.log('');
  printNextSteps(lang, docs);
}

function printNextSteps(lang, docs) {
  const guideUrl =
    'https://github.com/arthurdaquinosilva/product-development-framework-with-ai/blob/main/' +
    lang +
    '/GUIDE.md';
  if (lang === 'pt-br') {
    console.log('Pronto! Próximos passos:');
    console.log('');
    console.log(`  1. Preencha ${docs}/project-scope.md com sua ideia inicial`);
    console.log('  2. Inicie o modo guiado:');
    console.log('       Claude Code → o CLAUDE.md já está na raiz, abra o projeto');
    console.log(`       Outro agente → cole o conteúdo de ${guideUrl}`);
    console.log('  3. Siga as 11 fases do framework');
  } else {
    console.log('Done! Next steps:');
    console.log('');
    console.log(`  1. Fill in ${docs}/project-scope.md with your initial idea`);
    console.log('  2. Start guided mode:');
    console.log('       Claude Code  → CLAUDE.md is already at the root, open the project');
    console.log(`       Other agents → paste the contents of ${guideUrl}`);
    console.log('  3. Follow the 11 phases of the framework');
  }
  console.log('');
}

main().catch((err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});
