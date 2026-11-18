#!/usr/bin/env node
'use strict';

// pdev-init — scaffold the Product Development Framework With AI into a project.
//
// Safe to re-run: planning artifacts that already exist are never overwritten,
// while the framework-owned files (skills, hook) are refreshed to the latest
// version. That makes re-running it the way to upgrade an existing project.
//
// Usage: pdev-init [--lang en|pt-br] [--dir <path>] [--docs <name>]
//                  [--no-claude] [--yes]

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const readline = require('node:readline');

const PKG_ROOT = path.join(__dirname, '..');
const HOOK_NAME = 'pdev-artifact-sync.sh';
const HOOK_COMMAND = `"$CLAUDE_PROJECT_DIR"/.claude/hooks/${HOOK_NAME}`;
const ROOT_FILES = new Set(['CLAUDE.md', 'AGENTS.md']);

// ---------------------------------------------------------------- input

function parseArgs(argv) {
  const opts = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const value = () => {
      const v = argv[++i];
      if (v === undefined) throw new Error(`${a} needs a value`);
      return v;
    };
    if (a === '--lang') opts.lang = value();
    else if (a === '--dir') opts.dir = value();
    else if (a === '--docs') opts.docs = value();
    else if (a === '--no-claude') opts.claude = false;
    else if (a === '--yes' || a === '-y') opts.yes = true;
    else if (a === '--help' || a === '-h') opts.help = true;
    else throw new Error(`Unknown option: ${a}`);
  }
  if (opts.lang && !['en', 'pt-br'].includes(opts.lang)) {
    throw new Error(`--lang must be "en" or "pt-br"`);
  }
  return opts;
}

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

async function resolveOptions(opts) {
  if (opts.yes) {
    return {
      lang: opts.lang || 'en',
      target: path.resolve(expandHome(opts.dir || '.')),
      docs: opts.docs || 'docs',
      claude: opts.claude !== false,
    };
  }

  const reader = createLineReader();
  try {
    let lang = opts.lang;
    if (!lang) {
      console.log('Language / Idioma:');
      console.log('  1) English');
      console.log('  2) Português (Brasil)');
      console.log('');
      lang = (await ask(reader, 'Choose / Escolha [1]: ', '1')) === '2' ? 'pt-br' : 'en';
      console.log('');
    }
    const pt = lang === 'pt-br';

    const dir =
      opts.dir || (await ask(reader, pt ? 'Diretório do projeto [.]: ' : 'Target project directory [.]: ', '.'));
    const docs =
      opts.docs || (await ask(reader, pt ? 'Nome da pasta de documentos [docs]: ' : 'Docs folder name [docs]: ', 'docs'));

    let claude = opts.claude;
    if (claude === undefined) {
      const answer = await ask(
        reader,
        pt
          ? 'Instalar as skills e o hook do Claude Code? [S/n]: '
          : 'Install Claude Code skills and hook? [Y/n]: ',
        'y'
      );
      claude = !/^n/i.test(answer);
    }
    return { lang, target: path.resolve(expandHome(dir)), docs, claude };
  } finally {
    reader.close();
  }
}

// ---------------------------------------------------------------- install

function withDocsPath(text, docs) {
  return docs === 'docs' ? text : text.split('docs/').join(`${docs}/`);
}

function rel(target, p) {
  return path.relative(target, p) || '.';
}

// Copy a planning template unless the file already exists.
function installTemplates(templatesDir, target, docs, log) {
  const docsPath = path.join(target, docs);
  fs.mkdirSync(docsPath, { recursive: true });

  const files = fs.readdirSync(templatesDir).filter((f) => f.endsWith('.md')).sort();
  for (const fname of files) {
    const dest = ROOT_FILES.has(fname) ? path.join(target, fname) : path.join(docsPath, fname);
    if (fs.existsSync(dest)) {
      log.skipped.push(rel(target, dest));
      continue;
    }
    const text = fs.readFileSync(path.join(templatesDir, fname), 'utf8');
    fs.writeFileSync(dest, withDocsPath(text, docs));
    log.created.push(rel(target, dest));
  }
}

// Skills are framework-owned: always refresh them.
function installSkills(skillsDir, target, docs, log) {
  for (const name of fs.readdirSync(skillsDir).sort()) {
    const src = path.join(skillsDir, name, 'SKILL.md');
    if (!fs.existsSync(src)) continue;
    const destDir = path.join(target, '.claude', 'skills', name);
    const dest = path.join(destDir, 'SKILL.md');
    const existed = fs.existsSync(dest);
    fs.mkdirSync(destDir, { recursive: true });
    fs.writeFileSync(dest, withDocsPath(fs.readFileSync(src, 'utf8'), docs));
    (existed ? log.updated : log.created).push(rel(target, dest));
  }
}

function installHook(target, docs, lang, log) {
  const src = path.join(PKG_ROOT, 'hooks', HOOK_NAME);
  const hooksDir = path.join(target, '.claude', 'hooks');
  const dest = path.join(hooksDir, HOOK_NAME);
  const existed = fs.existsSync(dest);
  fs.mkdirSync(hooksDir, { recursive: true });
  const text = fs
    .readFileSync(src, 'utf8')
    .replace('__PDEV_DOCS__', docs)
    .replace('__PDEV_LANG__', lang);
  fs.writeFileSync(dest, text, { mode: 0o755 });
  fs.chmodSync(dest, 0o755);
  (existed ? log.updated : log.created).push(rel(target, dest));

  // Register it in .claude/settings.json, preserving everything else there.
  const settingsPath = path.join(target, '.claude', 'settings.json');
  let settings = {};
  if (fs.existsSync(settingsPath)) {
    try {
      settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    } catch {
      log.warnings.push(
        `${rel(target, settingsPath)} is not valid JSON — hook not registered. Add a Stop hook running ${HOOK_COMMAND}`
      );
      return;
    }
  }
  settings.hooks = settings.hooks || {};
  settings.hooks.Stop = settings.hooks.Stop || [];
  const registered = settings.hooks.Stop.some((entry) =>
    (entry.hooks || []).some((h) => typeof h.command === 'string' && h.command.includes(HOOK_NAME))
  );
  if (registered) return;
  settings.hooks.Stop.push({ hooks: [{ type: 'command', command: HOOK_COMMAND }] });
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2) + '\n');
  log.updated.push(`${rel(target, settingsPath)} (Stop hook registered)`);
}

// Projects set up with an older version have a long "guide mode" CLAUDE.md.
function checkLegacyClaudeMd(target, lang, log) {
  const p = path.join(target, 'CLAUDE.md');
  if (!fs.existsSync(p)) return;
  const text = fs.readFileSync(p, 'utf8');
  if (/Framework Guide Mode|Modo Guia do Framework|## The 11 phases|## As 11 fases/.test(text)) {
    log.warnings.push(
      lang === 'pt-br'
        ? 'CLAUDE.md ainda é a versão antiga do "modo guiado". Substitua o conteúdo por "@AGENTS.md" — o guia agora é a skill /pdev.'
        : 'CLAUDE.md is still the old "guide mode" version. Replace its contents with "@AGENTS.md" — the guide is now the /pdev skill.'
    );
  }
}

// ---------------------------------------------------------------- output

function printSummary(log, pt) {
  const section = (title, items, mark) => {
    if (!items.length) return;
    console.log(title);
    for (const item of items) console.log(`  ${mark} ${item}`);
    console.log('');
  };
  section(pt ? 'Criados:' : 'Created:', log.created, '✓');
  section(pt ? 'Atualizados:' : 'Updated:', log.updated, '↻');
  section(pt ? 'Mantidos (já existiam):' : 'Kept (already existed):', log.skipped, '·');
  section(pt ? 'Atenção:' : 'Attention:', log.warnings, '⚠');
}

function printNextSteps(lang, docs, claude) {
  if (lang === 'pt-br') {
    console.log('Próximos passos:');
    console.log('');
    console.log(`  1. Preencha ${docs}/project-scope.md com sua ideia inicial (só você, sem agente)`);
    if (claude) {
      console.log('  2. Abra o projeto no Claude Code e rode /pdev — ele diz qual é a próxima fase');
    } else {
      console.log('  2. Siga as fases em FRAMEWORK.md; cole o corpo de cada skill como prompt');
    }
  } else {
    console.log('Next steps:');
    console.log('');
    console.log(`  1. Fill in ${docs}/project-scope.md with your initial idea (just you, no agent)`);
    if (claude) {
      console.log('  2. Open the project in Claude Code and run /pdev — it tells you the next phase');
    } else {
      console.log("  2. Follow the phases in FRAMEWORK.md; paste each skill's body as your prompt");
    }
  }
  console.log('');
}

function printHelp() {
  console.log(`Usage: pdev-init [options]

Scaffolds the Product Development Framework With AI into a project.
Safe to re-run: existing artifacts are kept; skills and the hook are refreshed.

Options:
  --lang <en|pt-br>   Language of the templates and skills
  --dir <path>        Target project directory (default: .)
  --docs <name>       Folder for planning artifacts (default: docs)
  --no-claude         Skip the Claude Code skills and hook
  -y, --yes           Don't prompt; use the defaults for anything not given
  -h, --help          Show this help
`);
}

// ---------------------------------------------------------------- main

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) return printHelp();

  console.log('');
  console.log('Product Development Framework With AI — Setup');
  console.log('==============================================');
  console.log('');

  const { lang, target, docs, claude } = await resolveOptions(args);
  const pt = lang === 'pt-br';

  if (!fs.existsSync(target) || !fs.statSync(target).isDirectory()) {
    throw new Error(pt ? `Diretório não encontrado: ${target}` : `Directory not found: ${target}`);
  }
  if (path.isAbsolute(docs) || docs.split(/[\\/]/).includes('..')) {
    throw new Error(pt ? 'A pasta de documentos deve ficar dentro do projeto.' : 'The docs folder must be inside the project.');
  }

  const templatesDir = path.join(PKG_ROOT, lang, 'templates');
  const skillsDir = path.join(PKG_ROOT, lang, 'skills');
  for (const dir of [templatesDir, skillsDir]) {
    if (!fs.existsSync(dir)) throw new Error(`Not found: ${dir} — the framework files may be incomplete.`);
  }

  console.log('');
  console.log(pt ? `Configurando em ${target} ...` : `Setting up in ${target} ...`);
  console.log('');

  const log = { created: [], updated: [], skipped: [], warnings: [] };
  checkLegacyClaudeMd(target, lang, log);
  installTemplates(templatesDir, target, docs, log);
  if (claude) {
    installSkills(skillsDir, target, docs, log);
    installHook(target, docs, lang, log);
  }

  printSummary(log, pt);
  printNextSteps(lang, docs, claude);
}

main().catch((err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});
