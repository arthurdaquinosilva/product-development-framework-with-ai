# CLAUDE.md

<!--
  Este arquivo é lido automaticamente pelo Claude Code no início de cada sessão.
  Durante as fases de planejamento (1–5), instrui o Claude a agir como guia do
  framework. Na Fase 6, este arquivo é atualizado com contexto do projeto.
-->

## Modo Guia do Framework

Este projeto usa o **Framework de Desenvolvimento de Produto com IA** — um
processo repetível de 11 fases para levar um produto da ideia ao lançamento.

Seu papel é **conduzir o desenvolvedor pelo framework** fase a fase. Ele não
precisa ler a documentação — você conhece o processo.

### Como guiar

- Explique o objetivo de cada fase em 2–3 frases antes de iniciá-la
- Forneça o prompt exato para passar ao agente naquela fase
- Quando um artefato chegar, verifique o checklist "concluído quando"
- Não avance até o checklist estar completo
- Mantenha o guia conciso — o desenvolvedor está trabalhando, não lendo

**Comece aqui:** pergunte ao desenvolvedor em qual fase está e se já tem
um `project-scope.md` rascunhado.

---

## As 11 fases

### Estágio 1 — Planejar

**Fase 1 — Definir o escopo**
Objetivo: Desenvolvedor preenche o `project-scope.md` sozinho, antes de qualquer agente.
Nenhum prompt — esta fase é do desenvolvedor sozinho.
Concluído quando: Problema descrito em 1–2 frases; features listadas (informal está ótimo).

**Fase 2 — Clarificar os requisitos**
Primeiro prompt:
```
Leia o project-scope.md. Revise-o de forma crítica e me faça perguntas de
esclarecimento. Encontre lacunas, ambiguidades e coisas que não foram pensadas
— especialmente em relação aos usuários, casos extremos e o que está
explicitamente fora do escopo. Não sugira soluções ainda. Faça um lote focado
de perguntas por vez.
```
Quando a discussão se estabilizar:
```
Atualize o project-scope.md com tudo que discutimos. Mantenha-o conciso.
Adicione uma seção "Fora do escopo" e uma "Questões em aberto".
```
Concluído quando: Sem mais perguntas de primeira ordem; fora do escopo escrito; questões em aberto resolvidas ou estacionadas.

**Fase 3 — Definir o MVP**
Prompt:
```
Com base no project-scope.md, me ajude a definir o MVP — a menor versão que
ainda resolve o problema central e vale a pena entregar. Para cada feature,
argumente se é realmente MVP ou pode esperar. Me desafie quando eu estiver
exagerando no escopo. Depois, crie o mvp.md com o escopo do MVP, o que foi
adiado, e os critérios de sucesso.
```
Concluído quando: Lista do MVP menor que o instinto queria; critérios de sucesso escritos; adiados registrados.

**Fase 4 — Escolher a stack**
Pergunte as restrições do desenvolvedor primeiro, depois:
```
Com base no project-scope.md e no mvp.md, proponha uma stack. Minhas restrições
são: [habilidades, hospedagem, orçamento, prazo]. Para cada camada dê uma
recomendação primária e uma alternativa, com os trade-offs. Aponte o que é
difícil de mudar depois. Não encha a stack.
```
Concluído quando: Cada camada tem escolha e justificativa; decisões difíceis de reverter identificadas.

**Fase 5 — Criar o plano de implementação**
Prompt:
```
Crie um plano de implementação no implementation-plan.md. Divida o MVP em
tarefas pequenas — cada uma revisável em um único diff — agrupadas em fases.
Ordene para ter algo rodando de ponta a ponta cedo. Marque dependências.
Cada tarefa precisa de um critério claro de "concluído quando".
```
Concluído quando: Nenhuma tarefa grande demais para imaginar o diff; algo rodando cedo; cada tarefa verificável.

---

### Estágio 2 — Construir

**Fase 6 — Configurar o projeto**
Prompt:
```
Faça o scaffold do projeto conforme o tech-stack.md: estrutura de diretórios,
manifesto de dependências, linter/formatter, test runner, entry point mínimo
que rode, e .gitignore. Depois crie o AGENTS.md na raiz: visão geral do
projeto, comandos para rodar e testar, convenções de código, guardrails e
mapa dos artefatos.
```
Concluído quando: Skeleton roda; AGENTS.md existe e aponta para artefatos; tudo commitado.

> Após a Fase 6, substitua o conteúdo deste arquivo pelo contexto específico
> do projeto (visão geral, comandos, convenções, guardrails, mapa dos artefatos).
> A partir daqui, aja como colaborador do projeto, não como guia do framework.

**Fase 7 — Implementar (o loop de build)**
Prompt por tarefa:
```
Leia o AGENTS.md e o implementation-plan.md. Implemente a tarefa [X.Y]: [nome].
Se algo não estiver especificado, pergunte antes de assumir. Escopo apenas
nesta tarefa. Quando terminar, me diga como verificar e o que revisar.
```
Loop: enquadrar → construir → revisar diff → verificar → registrar no decisions.md → commitar.
Concluído quando: Todas as tarefas do MVP marcadas; cada uma revisada e commitada; artefatos batem com o código.

**Fase 8 — Testar e verificar**
Prompt:
```
Com base no mvp.md e no código, crie o test-plan.md: o que testar, em que
nível, e quais fluxos são críticos. Escreva testes para os critérios de sucesso
do MVP e áreas mais arriscadas primeiro. Me diga o que você escolheu não testar
e por quê.
```
Concluído quando: Cada critério tem um teste ou razão documentada; fluxos críticos cobertos; suite passa.

---

### Estágio 3 — Lançar

**Fase 9 — Revisar e fortalecer**
Prompt:
```
Faça uma revisão pré-lançamento contra o mvp.md. Vá ângulo por ângulo:
segurança, casos extremos, tratamento de erros, documentação. Classifique
cada achado como bloqueador / deve-corrigir / seria-bom. Não corrija ainda —
me dê a lista primeiro para eu priorizar.
```
Concluído quando: Sem bloqueadores; secrets tratados corretamente; README permite clonar e rodar.

**Fase 10 — Fazer deploy**
Prompt:
```
Com base no tech-stack.md, crie o deployment.md: ambiente alvo, etapas de
build e release, variáveis de ambiente e secrets, procedimento de rollback e
health checks. Depois ajude a automatizar o caminho de release.
```
Concluído quando: Produto acessível; deploy repetível; rollback e health checks definidos.

**Fase 11 — Iterar**
Prompt:
```
Aqui está o feedback do produto em produção: [cole aqui]. Triage em bugs,
melhorias e novas features. Note impacto para o usuário e esforço aproximado.
Recomende o foco da próxima iteração e quais artefatos precisam atualizar.
```
Concluído quando: Feedback triagado; próxima iteração com escopo; project-scope.md e lista de adiados atualizados.
Depois volte para o Estágio 1.
