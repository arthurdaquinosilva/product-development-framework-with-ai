# Framework de Desenvolvimento de Produto com IA

<!-- TOC -->

- [Por que isso existe](#por-que-isso-existe)
- [O ciclo de vida](#o-ciclo-de-vida)
- [Como usar](#como-usar)
- [Modo guiado](#modo-guiado)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Princípios](#princípios)
- [Licença](#licença)
<!-- /TOC -->

Um framework repetível e agnóstico de agente para levar um produto de uma ideia
bruta até um lançamento — com um agente de IA como colaborador em cada etapa.

Isso não é uma ferramenta nem uma biblioteca. É um **processo**, mais um
conjunto de **templates de artefatos** e **prompts**. Use com qualquer agente
de IA capaz (Claude Code, Cursor, ou similar).

## Por que isso existe

Agentes de IA são excelentes em produzir código, mas são tão bons quanto o
contexto que recebem. Ir direto para _"constrói um app pra mim"_ produz trabalho
descartável: o agente adivinha o escopo, inventa requisitos e escolhe uma stack
que você nunca aprovou.

Este framework antecipa o pensamento — escopo, requisitos, MVP, stack, plano
— em documentos duráveis que o agente lê _antes_ de escrever uma linha de
código. Depois mantém esses documentos sincronizados ao longo do build, teste
e deploy, para o agente nunca perder o fio.

## O ciclo de vida

Três estágios, onze fases. Cada fase tem um objetivo, um prompt e um artefato.

### Planejar

1. **Definir o escopo** — o que estamos construindo e por quê?
2. **Clarificar os requisitos** — o que exatamente deve fazer?
3. **Definir o MVP** — qual é a menor versão que ainda resolve o problema?
4. **Escolher a stack** — com o que vamos construir?
5. **Criar o plano de implementação** — o que é construído primeiro, segundo, terceiro?

### Construir

6. **Configurar o projeto** — estruturar o repositório e o contexto do agente.
7. **Implementar (o loop de build)** — uma tarefa por vez, revisada e commitada.
8. **Testar e verificar** — provar que cada parte funciona.

### Lançar

9. **Revisar e fortalecer** — segurança, casos extremos, tratamento de erros, docs.
10. **Fazer deploy** — colocar no ar onde os usuários podem acessar.
11. **Iterar** — coletar feedback e alimentar de volta no plano.

Leia [FRAMEWORK.md](FRAMEWORK.md) para o guia completo fase a fase.

## Como usar

1. Clone este repositório.
2. Instale o comando `pdev-init` (uma vez, a partir da raiz do repositório):
   ```
   bash install.sh
   ```
3. De dentro de qualquer diretório de projeto, gere os arquivos do framework:
   ```
   pdev-init
   ```
   (Sem instalar? Rode `bash setup.sh` a partir da raiz do repositório — ele
   vai perguntar o diretório do projeto de destino.)
4. Abra o [FRAMEWORK.md](FRAMEWORK.md) e percorra as fases em ordem.
5. Em cada fase: preencha o que você já sabe, depois passe o artefato pro agente
   com o prompt da fase para refinarem juntos.
6. Commite os artefatos. Eles são **documentos vivos** — o agente os lê para
   recuperar contexto em cada tarefa e os atualiza conforme o produto evolui.

Veja [EXAMPLE.md](EXAMPLE.md) para um exemplo completo de ponta a ponta.

## Modo guiado

Prefere ser guiado pelo framework em vez de lê-lo você mesmo? Duas opções:

- **Claude Code (automático):** copie `templates/CLAUDE.md` para a raiz do seu
  projeto. O Claude Code lê automaticamente e age como seu guia do framework
  desde a primeira sessão.
- **Qualquer outro agente:** abra [GUIDE.md](GUIDE.md), cole o conteúdo na sua
  sessão de IA e o agente te guiará fase a fase.

## Estrutura do repositório

```
README.md                      você está aqui
FRAMEWORK.md                   a metodologia, fase a fase
EXAMPLE.md                     um exemplo completo e detalhado
GUIDE.md                       cole no seu agente para ativar o modo guiado
templates/
  project-scope.md             saída das fases 1–2
  mvp.md                       saída da fase 3
  tech-stack.md                saída da fase 4
  implementation-plan.md       saída da fase 5, atualizado durante o build
  AGENTS.md                    saída da fase 6 — contexto de trabalho do agente
  CLAUDE.md                    saída da fase 6 — versão nativa para Claude Code
  test-plan.md                 saída da fase 8
  deployment.md                saída da fase 10
  decisions.md                 log contínuo, atualizado em todas as fases
LICENSE
```

## Princípios

- **Contexto antes de código.** O agente lê os artefatos antes de construir.
- **Passos pequenos.** Uma tarefa por vez, cada uma revisável em um único diff.
- **Documentos vivos.** Artefatos são atualizados conforme a realidade muda.
- **Você decide, o agente rascunha.** O agente propõe; você é dono de cada decisão.
- **Revise cada diff.** O agente é rápido, não infalível.

## Licença

MIT — veja [LICENSE](../LICENSE).
