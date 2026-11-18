# O Framework

Este documento é a metodologia. Percorre onze fases, agrupadas em três
estágios — **Planejar**, **Construir**, **Lançar** — que levam um produto de
uma ideia bruta a um lançamento, com um agente de IA como colaborador ao longo
de todo o processo.

Percorra as fases em ordem na primeira vez. Depois disso, o processo se repete:
a fase 11 alimenta de volta a fase 1 para a próxima iteração.

## O que este framework assume sobre agentes

Agentes de código não escrevem mais um trechinho de cada vez enquanto você
observa. Eles trabalham sozinhos por longos períodos, rodam os testes, leem as
falhas, corrigem os próprios erros e podem trabalhar em várias tarefas em
paralelo. Isso muda onde a sua atenção vale mais:

- **O plano é a coisa de maior alavancagem que você revisa.** Um plano errado
  executado de forma autônoma produz muito código errado, rápido.
- **Verificações executáveis são a especificação.** Um agente que consegue
  rodar uma verificação continua trabalhando até ela passar. Um agente que só
  tem texto para seguir para quando _acha_ que terminou. Por isso as
  verificações são escritas antes do código.
- **A profundidade da revisão segue o risco, não o volume.** Gates
  automatizados pegam os problemas rotineiros em toda mudança. Sua atenção
  cuidadosa, linha a linha, vai para as mudanças que custam caro se derem
  errado.
- **Código é barato — inclusive código descartável.** Um protótipo de uma hora
  pode responder uma pergunta que uma semana de discussão não responde.

O que não mudou: o agente é tão bom quanto o contexto que recebe, e as
decisões são suas.

## Como ler este documento

Cada fase abaixo segue a mesma estrutura:

- **Objetivo** — o que a fase produz e por que importa.
- **Entradas** — o que você precisa antes de começar.
- **Trabalho** — o que você e o agente realmente fazem.
- **Rodar** — a skill que conduz a fase (veja abaixo).
- **Saída** — o artefato criado ou atualizado. Templates ficam em [`templates/`](templates/).
- **Concluído quando** — o checklist que diz que é seguro avançar.

## Skills: os prompts, empacotados

Cada fase que envolve o agente tem uma **skill** correspondente em
[`skills/`](skills/) — um arquivo `SKILL.md` com o prompt da fase, os
artefatos que ela lê e escreve, e o checklist de conclusão. O instalador copia
as skills para o `.claude/skills/` do seu projeto, então no Claude Code você
roda uma fase digitando o nome dela: `/pdev-clarify`, `/pdev-plan`,
`/pdev-build A.2`.

`/pdev` é o guia: lê seus artefatos, descobre em que fase você está e diz o
que fazer em seguida. Use sempre que se perder.

Skills são markdown puro. Com um agente que não carrega arquivos `SKILL.md`,
cole o corpo da skill como prompt — funciona do mesmo jeito.

## Uma nota sobre artefatos

Os artefatos são **documentos vivos**, não burocracia. Mantenha-os no controle
de versão do seu projeto. O agente os lê no início de cada tarefa para
recuperar contexto, e os atualiza quando a realidade diverge do plano. Um
artefato desatualizado é pior que nenhum artefato — ele mente para o agente.

Não dependa só de disciplina para mantê-los em dia. Toda tarefa de build
termina com o agente atualizando o plano e o log de decisões, e o instalador
adiciona um hook opcional do Claude Code que lembra o agente quando o código
mudou mas nenhum artefato mudou.

---

# Estágio 1 — Planejar

O objetivo deste estágio é tomar as decisões importantes enquanto ainda é
barato mudá-las — e testar de verdade as arriscadas antes de se comprometer
com elas.

## Fase 1: Definir o escopo

**Objetivo.** Capturar o que você está construindo e por quê, com suas próprias
palavras, antes de envolver o agente. Esta é a semente da qual tudo cresce.

**Entradas.** Uma ideia. Só isso.

**Trabalho.** Abra [`templates/project-scope.md`](templates/project-scope.md) e
preencha as seções Problema, Solução e Features com seu pensamento inicial.
Seja informal. Não lapide. O ponto é externalizar o que está na sua cabeça para
que possa ser examinado — e garantir que o ponto de partida é _seu_, não do
agente.

**Rodar.** _(nada — esta fase é apenas você)_

**Saída.** `project-scope.md`, primeiro rascunho.

**Concluído quando.**

- [ ] Você consegue descrever o problema em uma ou duas frases.
- [ ] Você listou as features que imagina, mesmo que pela metade.

## Fase 2: Clarificar os requisitos

**Objetivo.** Transformar o escopo bruto em algo preciso o suficiente para
construir. Descobrir lacunas, contradições e suposições não ditas agora.

**Entradas.** Primeiro rascunho do `project-scope.md`.

**Trabalho.** Entregue o escopo ao agente e deixe-o interrogá-lo. O trabalho
dele aqui _não_ é concordar com você — é encontrar o que você não pensou.
Responda as perguntas em rodadas. Quando as perguntas acabarem, o agente
reescreve o `project-scope.md` para refletir o que vocês concluíram juntos.

**Rodar.** `/pdev-clarify` — [skill](skills/pdev-clarify/SKILL.md)

**Saída.** `project-scope.md`, refinado.

**Concluído quando.**

- [ ] O agente não tem mais perguntas de esclarecimento de primeira ordem.
- [ ] "Fora do escopo" está escrito, não apenas implícito.
- [ ] As questões em aberto estão resolvidas ou explicitamente estacionadas.

## Fase 3: Definir o MVP

**Objetivo.** Encontrar a menor versão que ainda resolve o problema central — e
vale a pena lançar. Todo o resto vira "depois".

**Entradas.** `project-scope.md` refinado.

**Trabalho.** Com o agente, separe as features em "MVP" e "depois". Teste o
limite do MVP: para cada feature que você quer incluir, pergunte se o produto
ainda resolve o problema central sem ela. Se sim, não é MVP. Escreva critérios
de sucesso **concretos o suficiente para virar testes automatizados** — eles
vão virar, na fase 6. Nomeie as premissas em que o MVP está apostando, e
marque as que são ao mesmo tempo arriscadas e testáveis.

**Rodar.** `/pdev-mvp` — [skill](skills/pdev-mvp/SKILL.md)

**Saída.** [`mvp.md`](templates/mvp.md).

**Concluído quando.**

- [ ] A lista de features do MVP é menor do que seu instinto queria.
- [ ] Todo critério de sucesso é concreto o suficiente para ser verificado
      automaticamente, ou está marcado explicitamente como verificação manual.
- [ ] As features adiadas estão registradas para não se perderem.
- [ ] As premissas arriscadas estão listadas, e as que merecem um spike estão
      marcadas.

## Fase 4: Fazer spikes nas incertezas _(pule se não houver nenhuma)_

**Objetivo.** Responder as perguntas em aberto mais arriscadas com código
descartável em vez de debate — antes que elas moldem a stack e o plano.

**Entradas.** `mvp.md` (as premissas marcadas para spike).

**Trabalho.** Escolha de uma a três perguntas em que errar doeria mais: _A
interação principal parece certa na prática? Essa API faz o que precisamos? É
rápido o suficiente? O modelo dá conta dessa entrada?_ Para cada uma, peça ao
agente o menor protótipo possível que a responda — num branch ou diretório
de rascunho, ignorando qualidade por completo. Olhe o resultado você mesmo.
Registre a pergunta, o que foi tentado e o que você aprendeu em
[`templates/spikes.md`](templates/spikes.md). **Depois apague o código.**
Fique com as conclusões, não com o protótipo — código de protótipo que entra
escondido no código real carrega todos os atalhos que você tomou para
escrevê-lo rápido.

Pule esta fase se nada no MVP é realmente incerto. Um CRUD conhecido numa
stack conhecida não precisa de spike.

**Rodar.** `/pdev-spike` — [skill](skills/pdev-spike/SKILL.md)

**Saída.** `spikes.md`; premissas atualizadas no `mvp.md`; entradas no
`decisions.md` para o que um spike resolveu.

**Concluído quando.**

- [ ] Cada spike respondeu sua pergunta (sim, não, ou "não desse jeito").
- [ ] As descobertas estão registradas no `spikes.md`, e o `mvp.md` as reflete.
- [ ] O código do spike foi apagado ou está claramente isolado do projeto real.

## Fase 5: Escolher a stack tecnológica

**Objetivo.** Decidir com o que você vai construir — e por quê — antes de
qualquer configuração.

**Entradas.** `project-scope.md`, `mvp.md`, `spikes.md` se você fez algum.

**Trabalho.** Peça ao agente que proponha uma stack que se encaixe no MVP, nas
suas restrições (habilidades, hospedagem, orçamento, prazo), nas necessidades
não-funcionais (escala, latência, offline, etc.) e no que os spikes ensinaram.
Faça-o justificar cada escolha e nomear os trade-offs. Inclua o **tooling de
verificação** — test runner, type checker, linter, CI — como camadas de
primeira classe: o agente se apoia nelas o tempo todo, e uma stack com
feedback rápido e rigoroso o torna muito mais confiável. Você escolhe.
Registre a decisão em [`templates/tech-stack.md`](templates/tech-stack.md) e as
escolhas significativas em [`templates/decisions.md`](templates/decisions.md).

**Rodar.** `/pdev-stack` — [skill](skills/pdev-stack/SKILL.md)

**Saída.** `tech-stack.md`; entradas no `decisions.md`.

**Concluído quando.**

- [ ] Cada camada da stack tem uma opção escolhida e uma justificativa de uma linha.
- [ ] O tooling de verificação (testes, tipos/lint, CI) está escolhido, não
      deixado para depois.
- [ ] As escolhas difíceis de reverter foram identificadas e feitas deliberadamente.
- [ ] Você conseguiria explicar a stack para outra pessoa sem a ajuda do agente.

## Fase 6: Planejar o build

**Objetivo.** Quebrar o MVP em tarefas que um agente consegue concluir e
_provar_ que concluiu sozinho — e decidir de antemão como cada uma é
verificada e revisada. Este plano é a espinha dorsal do estágio de
construção, e a coisa mais importante que você revisa em todo o framework.

**Entradas.** `project-scope.md`, `mvp.md`, `tech-stack.md`.

**Trabalho.** O agente rascunha dois artefatos juntos:

- [`implementation-plan.md`](templates/implementation-plan.md) — tarefas
  agrupadas em fases, ordenadas para que algo rode de ponta a ponta cedo. Cada
  tarefa recebe:
  - uma **verificação de aceite** — um teste ou comando que passa quando a
    tarefa está pronta. Não "funciona corretamente"; algo executável.
  - suas **dependências** e um **grupo paralelo**, para que tarefas que não
    dependem umas das outras — e não mexem nos mesmos arquivos — possam rodar
    ao mesmo tempo.
  - um **nível de revisão**: `auto` (gates mais uma olhada rápida bastam) ou
    `humana` (você lê o diff com cuidado), com o motivo.
- [`test-plan.md`](templates/test-plan.md) — a estratégia de verificação: os
  gates que toda mudança precisa passar, como cada critério de sucesso do MVP
  mapeia para um teste, quais fluxos de usuário recebem cobertura de ponta a
  ponta, e o que deliberadamente não é testado.

Depois revise o plano com rigor. Dimensione as tarefas pela
**verificabilidade**, não por quanto código você consegue ler de uma vez: uma
tarefa tem o tamanho certo quando tem uma verificação de aceite clara e o
agente consegue terminá-la sem voltar para perguntar. Tudo que mexe com
formatos de dados, autenticação, dinheiro, interfaces públicas ou deploy deve
ser marcado como `humana`.

**Rodar.** `/pdev-plan` — [skill](skills/pdev-plan/SKILL.md)

**Saída.** `implementation-plan.md`; `test-plan.md`.

**Concluído quando.**

- [ ] Toda tarefa tem uma verificação de aceite que pode ser executada, não só lida.
- [ ] Todo critério de sucesso do MVP mapeia para a verificação de aceite de
      pelo menos uma tarefa (ou uma verificação manual documentada).
- [ ] A ordenação produz algo executável cedo, não só no final.
- [ ] Dependências, grupos paralelos e níveis de revisão estão definidos em
      todas as tarefas.
- [ ] Você leu o plano inteiro e ficaria confortável com um agente executando-o.

---

# Estágio 2 — Construir

Agora o código existe. A disciplina aqui é deixar o agente trabalhar de forma
autônoma _dentro_ de proteções que você montou deliberadamente — e manter os
artefatos sincronizados.

## Fase 7: Configurar o projeto

**Objetivo.** Criar o esqueleto do projeto, os gates automatizados e o
contexto de trabalho do agente, para que toda tarefa posterior comece de uma
base sólida.

**Entradas.** `tech-stack.md`, `implementation-plan.md`, `test-plan.md`.

**Trabalho.** Peça ao agente para criar o scaffold do repositório conforme a
stack: estrutura de diretórios, manifesto de dependências, formatter/linter,
type checker, test runner, um ponto de entrada mínimo que realmente roda,
`.gitignore`, e **CI que roda todos os gates do `test-plan.md` a cada push**.
Depois preencha o [`AGENTS.md`](templates/AGENTS.md) na raiz do repositório — o
arquivo que todo agente lê primeiro. Ele registra como rodar e verificar o
projeto, as convenções, o que o agente pode fazer sozinho, o que precisa de
um humano, e onde ficam os artefatos. O `CLAUDE.md` simplesmente o importa
(`@AGENTS.md`), então existe uma única fonte de contexto do projeto para todos
os agentes.

**Rodar.** `/pdev-setup` — [skill](skills/pdev-setup/SKILL.md)

**Saída.** Um esqueleto executável e commitado; CI; um `AGENTS.md` preenchido.

**Concluído quando.**

- [ ] O esqueleto roda, e todos os comandos de gate passam (mesmo com zero
      testes reais).
- [ ] O CI roda os mesmos gates e está verde.
- [ ] O `AGENTS.md` lista os comandos de gate, as regras de autonomia, os
      gatilhos de revisão humana e a localização de cada artefato.
- [ ] Está tudo commitado.

## Fase 8: Construir — o loop

**Objetivo.** Transformar o plano em software funcionando, tarefa por tarefa,
com o agente trabalhando de forma autônoma e você gastando atenção onde está
o risco.

**Entradas.** `implementation-plan.md`, `test-plan.md`, `AGENTS.md` e o resto
dos artefatos.

**Trabalho.** Para cada tarefa (ou cada grupo paralelo de tarefas):

1. **Iniciar.** Rode `/pdev-build <id-da-tarefa>`. Tarefas independentes do
   mesmo grupo paralelo podem rodar ao mesmo tempo em sessões separadas do
   agente, cada uma no seu próprio branch ou worktree.
2. **Verificação primeiro.** O agente escreve a verificação de aceite da
   tarefa como um teste e confirma que ela falha — provando que a verificação
   realmente testa algo.
3. **Construir até ficar verde.** O agente implementa e itera até a
   verificação de aceite, a suíte completa e todos os outros gates passarem.
   Ele não pode enfraquecer, pular ou apagar uma verificação para chegar lá.
4. **Auto-revisão.** O agente revisa o próprio diff com olhos frescos —
   idealmente numa passada de revisão separada ou com um agente revisor, não
   no mesmo contexto que escreveu o código — e corrige o que encontrar.
5. **Registrar.** O agente marca a tarefa no `implementation-plan.md`,
   registra qualquer decisão ou desvio no `decisions.md`, e reporta: o que
   mudou, do que não tinha certeza, e o que se desviou do plano.
6. **Revisar — na proporção do risco.** Para tarefas `auto`, leia o relatório
   e passe o olho no diff. Para tarefas `humana`, leia o diff linha a linha e
   questione qualquer coisa que você não teria escrito.
7. **Commitar.** Uma tarefa, um commit focado.

O agente para e pergunta em vez de seguir em frente quando: a especificação é
ambígua, a tarefa está ficando maior que o planejado, ele esbarra num gatilho
de revisão humana que o plano não previu, ou a única forma de passar numa
verificação é mudar a verificação. Quando uma tarefa for maior que o esperado,
divida-a no plano em vez de deixar uma mudança inchar.

**Rodar.** `/pdev-build <id-da-tarefa>` — [skill](skills/pdev-build/SKILL.md)

**Saída.** Código funcionando e commitado, tarefa por tarefa;
`implementation-plan.md` atualizado; `decisions.md` atualizado no caminho.

**Concluído quando.**

- [ ] Todas as tarefas do MVP no plano estão marcadas.
- [ ] Toda verificação de aceite existe como teste automatizado (ou
      verificação manual documentada) e passa.
- [ ] Toda tarefa `humana` foi revisada linha a linha.
- [ ] Os artefatos ainda correspondem ao que foi realmente construído.

---

# Estágio 3 — Lançar

O produto funciona e suas verificações passam. Este estágio o torna seguro para
colocar na frente de usuários reais.

## Fase 9: Verificar e reforçar

**Objetivo.** Fechar a distância entre "as verificações passam" e "está
pronto": provar que os fluxos reais de usuário funcionam de ponta a ponta, e
depois caçar o que as verificações não cobrem — falhas de segurança, casos
extremos, tratamento de erros ruim, documentação faltando.

**Entradas.** Código funcionando e testado; todos os artefatos.

**Trabalho.** Duas passadas:

- **Verificar.** Confirme que todo fluxo crítico do `test-plan.md` tem
  cobertura de ponta a ponta e passa. Depois _use_ o produto de verdade — ou
  peça ao agente que o conduza (navegador, CLI, API) — do jeito que um usuário
  novo usaria. Testes passando provam o que você pensou em verificar; usar o
  produto encontra o que você não pensou.
- **Reforçar.** Faça uma revisão adversarial nestes ângulos:
  - **Segurança** — tratamento de segredos, validação de input, authn/authz,
    riscos de dependências.
  - **Casos extremos** — estados vazios, inputs grandes, uso concorrente,
    falha de rede.
  - **Tratamento de erros** — falha de forma clara e recuperável, ou silenciosa
    e ruim?
  - **Documentação** — um README que permite outra pessoa rodar; `AGENTS.md`
    ainda correto.

  Use um contexto de agente novo para a revisão — um que não escreveu o
  código — e ferramentas dedicadas de revisão de segurança, se o seu agente
  tiver.

Priorize o que a revisão encontrar: corrija os bloqueadores agora (cada
correção ganha um teste de regressão), e registre o resto no `decisions.md` ou
como itens adiados.

**Rodar.** `/pdev-harden` — [skill](skills/pdev-harden/SKILL.md)

**Saída.** Cobertura de ponta a ponta dos fluxos críticos; uma lista de
achados priorizada; correções para bloqueadores; um README correto.

**Concluído quando.**

- [ ] Todo fluxo crítico passa de ponta a ponta, e você mesmo usou o produto.
- [ ] Não restam problemas bloqueadores conhecidos, e cada correção tem um
      teste de regressão.
- [ ] Segredos e configurações estão tratados corretamente, não hard-coded.
- [ ] Uma pessoa nova conseguiria clonar, rodar e entender o projeto pelo README.

## Fase 10: Fazer o deploy

**Objetivo.** Colocar o produto rodando onde usuários reais conseguem acessá-lo
— de forma repetível, não como algo pontual.

**Entradas.** Uma base de código reforçada e testada; `tech-stack.md`.

**Trabalho.** Rascunhe o [`templates/deployment.md`](templates/deployment.md)
com o agente: ambiente alvo, passos de build e release, variáveis de ambiente
e segredos, como fazer rollback e como você vai saber que está saudável.
Automatize o caminho de release no CI para que fazer deploy de novo seja
entediante, e torne os health checks executáveis para que o agente (ou o CI)
consiga verificar um deploy, não só você. Faça um deploy real. Verifique-o
contra os health checks.

Deploy é algo voltado para fora e às vezes difícil de desfazer: mantenha o
release de produção em si como um passo que você dispara ou aprova, mesmo
quando o agente preparou tudo.

**Rodar.** `/pdev-deploy` — [skill](skills/pdev-deploy/SKILL.md)

**Saída.** `deployment.md`; um caminho de release automatizado; um deploy no ar.

**Concluído quando.**

- [ ] O produto é acessível pelos usuários pretendidos.
- [ ] Fazer deploy de novo é um processo repetível e automatizado, não improviso.
- [ ] Você sabe como fazer rollback, e os health checks rodam com um comando.

## Fase 11: Iterar

**Objetivo.** Transformar o que você aprende com o uso real na próxima iteração
— e manter os artefatos honestos.

**Entradas.** Um produto em produção; feedback dos usuários; dados de uso; o
conjunto completo de artefatos.

**Trabalho.** Colete feedback e comportamento observado. Com o agente, priorize
em bugs, melhorias e novas features. Bugs re-entram no loop de build
diretamente — cada um começa como um teste falhando que o reproduz. Melhorias
e novas features voltam para a **Fase 1**: atualize o `project-scope.md`,
revisite o limite do MVP/escopo e planeje a próxima iteração. A lista de
adiados da fase 3 é revisitada aqui também.

**Rodar.** `/pdev-iterate` — [skill](skills/pdev-iterate/SKILL.md)

**Saída.** Um backlog priorizado; artefatos atualizados; um foco para o
próximo loop.

**Concluído quando.**

- [ ] O feedback está priorizado, não numa pilha.
- [ ] Todo bug a corrigir tem um teste que o reproduz, ou uma tarefa que
      começa com um.
- [ ] O foco da próxima iteração está decidido e com escopo.
- [ ] O `project-scope.md` e a lista de adiados refletem a realidade atual.

Depois volte para o Estágio 1 para a próxima iteração.

---

# Princípios transversais

Estes valem em todas as fases:

- **Contexto antes de código.** O agente lê os artefatos antes de construir.
  Se os artefatos estão errados, o build está errado.
- **Verificações antes de código.** O "pronto" de toda tarefa é algo que o
  agente consegue executar. Uma verificação executável mantém um agente
  autônomo honesto; texto não.
- **Você decide, o agente rascunha.** O agente propõe opções e trade-offs; a
  decisão e o raciocínio são seus, e ficam escritos.
- **Revise na proporção do risco.** Gates e auto-revisão do agente em toda
  mudança; sua atenção linha a linha no plano e em tudo que é difícil de
  reverter.
- **Nunca enfraqueça uma verificação para passar nela.** Se um teste parece
  errado, isso é uma conversa, não uma edição.
- **Unidades pequenas e verificáveis.** Uma tarefa, uma verificação de aceite,
  um commit. Tarefas grandes e vagas são onde agentes autônomos se perdem.
- **Mantenha os artefatos sincronizados.** No momento em que a realidade
  diverge de um documento, corrija o documento. Um artefato desatualizado
  engana ativamente o agente.
- **Registre o porquê.** O `decisions.md` captura decisões e raciocínios em
  todas as fases. O você do futuro e o agente vão precisar disso.
- **Faça o agente discordar de você.** O movimento mais valioso dele é
  encontrar a falha que você não consegue ver — peça isso explicitamente.

---

# Apêndice: quando o próprio produto usa IA

Se o seu produto chama um modelo de linguagem — um chatbot, um sumarizador, um
agente, um classificador — algumas coisas precisam de cuidado extra, porque a
saída do modelo não é determinística e um teste que passa hoje pode falhar
amanhã.

- **Fase 3 (MVP).** Escreva critérios de sucesso como barras de qualidade
  mensuráveis ("90% dos tickets de suporte de amostra vão para a fila
  certa"), mais orçamentos de custo e latência por requisição.
- **Fase 4 (Spike).** Quase sempre vale a pena: teste o modelo com entradas
  reais antes de desenhar o produto em volta dele. É aqui que "o modelo
  consegue mesmo fazer isso?" é respondido.
- **Fase 5 (Stack).** Registre o modelo, o provedor e o motivo. Trate uma
  troca de modelo como um upgrade de dependência — registrada no
  `decisions.md`, nunca silenciosa.
- **Fase 6 (Plano).** Planeje um **conjunto de evals**: uma coleção
  versionada de entradas representativas com resultados esperados ou regras
  de avaliação. Evals são as verificações de aceite deste produto. Mantenha os
  prompts em arquivos versionados, não em strings espalhadas.
- **Fase 8 (Construir).** Mudanças de prompt são mudanças de código: rodam os
  evals antes de entrar.
- **Fase 9 (Reforçar).** Adicione ângulos específicos de IA: prompt
  injection, vazamento de dados entre usuários, saída nociva ou fora do
  assunto, comportamento quando o provedor está lento ou fora do ar, e custo
  descontrolado.
- **Fases 10–11 (Deploy, Iterar).** Registre entradas e saídas (respeitando a
  privacidade), acompanhe custo e latência, e transforme falhas reais em novos
  casos de eval.
