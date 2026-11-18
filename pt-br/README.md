# Framework de Desenvolvimento de Produto com IA

<!-- TOC -->

- [Por que isso existe](#por-que-isso-existe)
- [O ciclo de vida](#o-ciclo-de-vida)
- [Como usar](#como-usar)
- [Usando outros agentes](#usando-outros-agentes)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Princípios](#princípios)
- [Licença](#licença)
<!-- /TOC -->

Um framework repetível para levar um produto de uma ideia bruta até um
lançamento — com um agente de IA como colaborador em cada etapa.

Isso não é uma ferramenta nem uma biblioteca. É um **processo**, mais um
conjunto de **templates de artefatos** e **skills** (os prompts de cada fase,
empacotados para o seu agente rodar). Foi feito para o Claude Code e funciona
com qualquer agente de código capaz.

## Por que isso existe

Agentes de IA são excelentes em produzir código, mas são tão bons quanto o
contexto que recebem. Ir direto para _"constrói um app pra mim"_ produz trabalho
descartável: o agente adivinha o escopo, inventa requisitos e escolhe uma stack
que você nunca aprovou.

E agora que agentes trabalham de forma autônoma por longos períodos, um
segundo problema importa tanto quanto: **como o agente sabe que terminou?** Um
agente que só tem texto para ler para quando _acha_ que terminou. Um agente
com uma verificação executável continua até a verificação passar.

Este framework antecipa o pensamento — escopo, requisitos, MVP, stack, plano
— em documentos duráveis que o agente lê _antes_ de escrever código,
transforma a definição de pronto de cada tarefa numa verificação que o agente
consegue rodar, e mantém os documentos sincronizados durante o build, a
verificação e o deploy.

## O ciclo de vida

Três estágios, onze fases. Cada fase tem um objetivo, uma skill e um artefato.

### Planejar

1. **Definir o escopo** — o que estamos construindo e por quê? _(só você)_
2. **Clarificar os requisitos** — o que exatamente deve fazer?
3. **Definir o MVP** — qual a menor versão que vale lançar, e como saberemos que funcionou?
4. **Spikes nas incertezas** — responder as perguntas mais arriscadas com código descartável. _(opcional)_
5. **Escolher a stack** — com o que construímos, incluindo como verificamos?
6. **Planejar o build** — tarefas com verificações de aceite, grupos paralelos e níveis de revisão.

### Construir

7. **Configurar o projeto** — esqueleto, gates automatizados no CI e o contexto de trabalho do agente.
8. **Construir (o loop)** — o agente constrói cada tarefa com a verificação primeiro até todos os gates passarem; você revisa na proporção do risco.

### Lançar

9. **Verificar e reforçar** — fluxos de ponta a ponta, uso real e uma revisão adversarial.
10. **Deploy** — um release repetível e automatizado, com health checks executáveis.
11. **Iterar** — priorizar o feedback e alimentá-lo de volta no plano.

Leia o [FRAMEWORK.md](FRAMEWORK.md) para o passo a passo completo de cada
fase, e o [EXAMPLE.md](EXAMPLE.md) para um exemplo completo.

## Como usar

Clone este repositório e instale o comando `pdev-init` uma vez (requer
Node.js 16+):

```
bash install.sh
```

Depois, de dentro de qualquer diretório de projeto:

```
pdev-init
```

Ele pergunta o idioma, o diretório alvo e o nome da pasta de documentos (ou
passe `--lang`, `--dir`, `--docs`, `--yes`), e então:

- copia os templates de artefatos para `docs/`, e o `AGENTS.md` + `CLAUDE.md`
  para a raiz do projeto;
- instala as skills das fases em `.claude/skills/`;
- instala um pequeno hook do Claude Code que lembra o agente de atualizar o
  plano e o log de decisões quando o código mudou mas nenhum artefato mudou
  (pule skills e hook com `--no-claude`).

Ele nunca sobrescreve um artefato que já existe, então rodá-lo de novo num
projeto existente é a forma de atualizar para as skills mais recentes.

Depois:

1. Preencha o `docs/project-scope.md` você mesmo — informal está ótimo.
2. Abra o projeto no Claude Code e rode **`/pdev`**. Ele lê seus artefatos,
   diz em qual fase você está e te dá o próximo comando (`/pdev-clarify`,
   `/pdev-plan`, `/pdev-build A.2`, …).
3. Commite os artefatos. Eles são **documentos vivos** — o agente os lê para
   recuperar contexto em cada tarefa e os atualiza conforme o produto evolui.

## Usando outros agentes

As skills são arquivos markdown simples (`SKILL.md`). Agentes que suportam o
formato de skills conseguem carregá-las da sua própria pasta de skills. Com
qualquer outro agente, cole o corpo da skill da fase como prompt — por
exemplo, o conteúdo de `.claude/skills/pdev-plan/SKILL.md` para a fase 6. O
`AGENTS.md` é lido nativamente pela maioria dos agentes de código; o
`CLAUDE.md` só o importa.

## Estrutura do repositório

```
README.md                      você está aqui
FRAMEWORK.md                   a metodologia, fase a fase
EXAMPLE.md                     um exemplo completo e detalhado
templates/
  project-scope.md             fases 1–2
  mvp.md                       fase 3
  spikes.md                    fase 4 (opcional)
  tech-stack.md                fase 5
  implementation-plan.md       fase 6, atualizado durante o build
  test-plan.md                 fase 6, estendido na fase 9
  AGENTS.md                    fase 7 — contexto de trabalho do agente
  CLAUDE.md                    importa o AGENTS.md para o Claude Code
  deployment.md                fase 10
  decisions.md                 log contínuo, atualizado em todas as fases
skills/
  pdev/                        o guia: onde estou, o que vem agora?
  pdev-clarify/ … pdev-iterate/  uma skill por fase (2–11)
```

O instalador em si (`bin/`, `hooks/`, `install.sh`, `setup.sh`) fica na raiz
do repositório.

## Princípios

- **Contexto antes de código.** O agente lê os artefatos antes de construir.
- **Verificações antes de código.** O "pronto" de toda tarefa é algo que o
  agente consegue executar.
- **Você decide, o agente rascunha.** O agente propõe; você é dono de cada decisão.
- **Revise na proporção do risco.** Gates em toda mudança; sua atenção
  cuidadosa no plano e no que é difícil de reverter.
- **Documentos vivos.** Artefatos são atualizados conforme a realidade muda,
  não escritos uma vez só.

## Licença

MIT — veja [LICENSE](../LICENSE).
