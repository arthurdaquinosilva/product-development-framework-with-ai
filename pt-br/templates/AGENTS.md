# AGENTS.md

<!--
  O primeiro arquivo que todo agente lê em toda tarefa. O CLAUDE.md o importa,
  então esta é a fonte única de contexto do projeto para todos os agentes.
  Preenchido na Fase 7 (/pdev-setup); mantido curto e atualizado depois disso.
  Veja FRAMEWORK.md → Fase 7.
-->

## Processo

Este projeto segue o **Framework de Desenvolvimento de Produto com IA**. Os
artefatos de planejamento ficam em `docs/` (veja o mapa de artefatos abaixo).
As skills de cada fase ficam em `.claude/skills/` — rode `/pdev` para ver em
qual fase o projeto está e o que fazer em seguida.

## Visão geral do projeto

<!-- Duas ou três frases: o que é este produto e para quem é. Resuma o
     docs/project-scope.md — não duplique. -->

## Rodar

<!-- Os comandos exatos para instalar e rodar o projeto. -->

```
# instalar
# rodar
```

## Definição de pronto

<!-- Os gates que toda mudança precisa passar para contar como pronta. Os
     mesmos comandos que o CI roda. Copie do docs/test-plan.md. -->

```
# testes
# lint / verificação de formatação
# type check
```

Uma tarefa está pronta quando sua verificação de aceite e todos os comandos
acima passam, o diff foi auto-revisado, e o `docs/implementation-plan.md` e o
`docs/decisions.md` estão atualizados.

## Convenções

<!-- Estrutura, nomenclatura, formatação, estilo de mensagem de commit,
     branches. Como o output do agente deve ser para ficar indistinguível do
     seu? -->

-

## Trabalhando de forma autônoma

<!-- O que o agente pode fazer sozinho, e quando deve parar. Ajuste a gosto. -->

Você pode, sem perguntar: ler qualquer coisa no repositório, rodar os gates,
escrever e alterar código e testes dentro do escopo da tarefa atual, e
atualizar os artefatos de planejamento para refletir o que você fez.

Pare e pergunte quando: a especificação for ambígua ou os artefatos se
contradisserem; a tarefa estiver crescendo além do plano; uma mudança esbarrar
num gatilho de revisão humana abaixo; ou a única forma de passar numa
verificação for mudar a verificação.

Commits: <!-- ex.: "espere minha revisão antes de commitar" ou "commite cada
tarefa concluída sozinho; nunca faça push" -->

## Gatilhos de revisão humana

<!-- Mudanças que o desenvolvedor precisa revisar linha a linha, mesmo que
     todos os gates passem. Tarefas que tocam nisso são marcadas com
     `Revisão: humana` no plano. -->

- Formatos de dados, schemas e migrações
- Autenticação, autorização e qualquer coisa que manipule segredos
- Pagamentos ou outros fluxos de dinheiro
- Interfaces públicas (APIs, flags de CLI, formatos de arquivo de que outras
  ferramentas dependem)
- Configuração de deploy e de CI
- Qualquer coisa que apague dados de usuários

## Proteções

<!-- O que o agente nunca deve fazer. -->

- Nunca enfraqueça, pule ou apague um teste ou verificação para fazê-lo passar.
- Nunca commite segredos nem coloque credenciais hard-coded.
- Nunca adicione uma dependência sem perguntar.
- Nunca faça push, deploy ou publicação sem ser pedido.
- Nunca apague arquivos que você não criou nesta tarefa sem perguntar.

## Mapa de artefatos

- Escopo e requisitos — `docs/project-scope.md`
- Definição do MVP — `docs/mvp.md`
- Descobertas dos spikes — `docs/spikes.md`
- Stack tecnológica — `docs/tech-stack.md`
- Plano de implementação — `docs/implementation-plan.md`
- Plano de testes — `docs/test-plan.md`
- Deployment — `docs/deployment.md`
- Log de decisões — `docs/decisions.md`
