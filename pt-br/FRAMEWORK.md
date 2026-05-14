# O Framework

Este documento é a metodologia. Percorre onze fases, agrupadas em três
estágios — **Planejar**, **Construir**, **Lançar** — que levam um produto de
uma ideia bruta a um lançamento, com um agente de IA como colaborador ao longo
de todo o processo.

Percorra as fases em ordem na primeira vez. Depois disso, o processo se repete:
a fase 11 alimenta de volta a fase 1 para a próxima iteração.

## Como ler este documento

Cada fase abaixo segue a mesma estrutura:

- **Objetivo** — o que a fase produz e por que importa.
- **Entradas** — o que você precisa antes de começar.
- **Trabalho** — o que você e o agente realmente fazem.
- **Prompt** — um prompt inicial para o seu agente. Adapte; não trate como mágica.
- **Saída** — o artefato criado ou atualizado. Templates ficam em [`templates/`](templates/).
- **Concluído quando** — o checklist que diz que é seguro avançar.

## Uma nota sobre artefatos

Os artefatos são **documentos vivos**, não burocracia. Mantenha-os no controle
de versão do seu projeto. O agente os lê no início de cada tarefa para
recuperar contexto, e os atualiza quando a realidade diverge do plano. Um
artefato desatualizado é pior que nenhum artefato — ele mente para o agente.

Um bom hábito: ao final de qualquer fase, pergunte ao agente _"o que nos nossos
artefatos existentes está errado ou incompleto?"_ e corrija antes de avançar.

---

# Estágio 1 — Planejar

O objetivo deste estágio é tomar todas as decisões importantes _antes_ de o
código existir, quando mudar de ideia ainda é de graça.

## Fase 1: Definir o escopo

**Objetivo.** Capturar o que você está construindo e por quê, com suas próprias
palavras, antes de envolver o agente. Esta é a semente da qual tudo cresce.

**Entradas.** Uma ideia. Só isso.

**Trabalho.** Abra [`templates/project-scope.md`](templates/project-scope.md) e
preencha as seções Problema, Solução e Features com seu pensamento inicial.
Seja informal. Não policie. O ponto é externalizar o que está na sua cabeça
para que possa ser examinado.

**Prompt.** _(nenhum — esta fase é apenas você)_

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
Responda suas perguntas, discuta, e peça que reescreva o `project-scope.md`
para refletir o que concluíram juntos. Espere algumas rodadas.

**Prompt.**

```
Leia o project-scope.md. Revise-o de forma crítica e me faça perguntas de
esclarecimento. Encontre lacunas, ambiguidades e coisas que não foram pensadas
— especialmente em relação aos usuários, casos extremos e o que está
explicitamente fora do escopo. Não sugira soluções ainda. Faça um lote focado
de perguntas por vez.
```

Depois, quando a discussão se estabilizar:

```
Atualize o project-scope.md com tudo que discutimos. Mantenha-o conciso.
Adicione uma seção "Fora do escopo" e uma "Questões em aberto" se tivermos
conteúdo para elas.
```

**Saída.** `project-scope.md`, refinado.

**Concluído quando.**

- [ ] O agente não tem mais perguntas de primeira ordem.
- [ ] "Fora do escopo" está escrito, não apenas implícito.
- [ ] Questões em aberto estão resolvidas ou explicitamente estacionadas.

## Fase 3: Definir o MVP

**Objetivo.** Encontrar a menor versão que ainda resolve o problema central —
e vale a pena lançar. Todo o resto vira "mais tarde".

**Entradas.** `project-scope.md` refinado.

**Trabalho.** Com o agente, classifique as features em "MVP" e "depois".
Teste o limite do MVP: para cada feature que você quer incluir, pergunte se o
produto ainda resolve o problema central sem ela. Se sim, não é MVP. Registre
o resultado em [`templates/mvp.md`](templates/mvp.md).

**Prompt.**

```
Com base no project-scope.md, me ajude a definir o MVP — a menor versão que
ainda resolve o problema central e vale a pena entregar. Para cada feature,
argumente se é realmente MVP ou pode esperar. Me desafie quando eu estiver
exagerando no escopo. Depois, crie o mvp.md com o escopo do MVP, o que foi
adiado, e os critérios de sucesso que vão nos dizer se o MVP funcionou.
```

**Saída.** `mvp.md`.

**Concluído quando.**

- [ ] A lista de features do MVP é menor do que o instinto queria.
- [ ] Você escreveu como é o sucesso do MVP.
- [ ] Features adiadas estão registradas para não se perderem.

## Fase 4: Escolher a stack

**Objetivo.** Decidir com o que vai construir — e por quê — antes de qualquer
configuração.

**Entradas.** `project-scope.md`, `mvp.md`.

**Trabalho.** Peça ao agente para propor uma stack que se encaixe no MVP, nas
suas restrições (habilidades, hospedagem, orçamento, prazo) e nas necessidades
não-funcionais (escala, latência, offline, etc.). Faça-o justificar cada
escolha e nomear os trade-offs. Você decide. Registre a decisão e o raciocínio
em [`templates/tech-stack.md`](templates/tech-stack.md), e registre as decisões
significativas em [`templates/decisions.md`](templates/decisions.md).

**Prompt.**

```
Com base no project-scope.md e no mvp.md, proponha uma stack. Minhas restrições
são: [habilidades, hospedagem, orçamento, prazo, outras]. Para cada camada
(linguagem, framework, banco de dados, hospedagem, bibliotecas principais) dê
uma recomendação primária e uma alternativa, com os trade-offs. Aponte o que é
difícil de mudar depois. Não encha a stack — menos partes móveis é melhor para
um MVP.
```

**Saída.** `tech-stack.md`; entradas no `decisions.md`.

**Concluído quando.**

- [ ] Cada camada da stack tem uma opção escolhida e uma justificativa.
- [ ] Escolhas difíceis de reverter foram identificadas e tomadas conscientemente.
- [ ] Você consegue explicar a stack para alguém sem a ajuda do agente.

## Fase 5: Criar o plano de implementação

**Objetivo.** Dividir o MVP em tarefas pequenas, ordenadas e verificáveis
independentemente, agrupadas em fases. Este plano se torna a espinha dorsal
do estágio de build.

**Entradas.** `project-scope.md`, `mvp.md`, `tech-stack.md`.

**Trabalho.** Peça ao agente para rascunhar o plano em
[`templates/implementation-plan.md`](templates/implementation-plan.md). Revise
com cuidado: tarefas devem ser pequenas o suficiente para revisar em um único
diff, ordenadas para que cada uma construa sobre código já funcionando, e
sequenciadas para que algo rode ponta a ponta o mais cedo possível. Retrabalhe
qualquer coisa vaga.

**Prompt.**

```
Crie um plano de implementação no implementation-plan.md. Divida o MVP em
tarefas pequenas — cada uma revisável em uma única sessão — e agrupe-as em
fases. Ordene-as para ter algo rodando de ponta a ponta o mais cedo possível,
e para que cada tarefa construa sobre código já funcionando. Marque dependências
entre tarefas. Cada tarefa deve ter um critério claro de "concluído quando".
```

**Saída.** `implementation-plan.md`.

**Concluído quando.**

- [ ] Nenhuma tarefa é grande demais para imaginar o diff.
- [ ] A ordem produz algo rodando cedo, não apenas no final.
- [ ] Cada tarefa tem um critério de conclusão verificável.

---

# Estágio 2 — Construir

Agora o código existe. A disciplina aqui é manter o loop de build apertado e
os artefatos sincronizados.

## Fase 6: Configurar o projeto

**Objetivo.** Criar a estrutura inicial do projeto _e_ o contexto de trabalho
do agente, para que cada tarefa futura comece em terreno sólido.

**Entradas.** `tech-stack.md`, `implementation-plan.md`.

**Trabalho.** Peça ao agente para estruturar o repositório conforme a stack:
estrutura de diretórios, manifesto de dependências, formatter/linter, test
runner, um "hello world" que realmente rode, e um `.gitignore`. Depois crie
[`templates/AGENTS.md`](templates/AGENTS.md) na raiz do repositório — este é o
arquivo que o agente lê primeiro em cada tarefa futura. Ele aponta para os
outros artefatos e registra as convenções e guardrails do projeto. Faça o
primeiro commit.

**Prompt.**

```
Faça o scaffold do projeto conforme o tech-stack.md: estrutura de diretórios,
manifesto de dependências, linter/formatter, test runner, um entry point mínimo
que rode, e um .gitignore. Mantenha mínimo — sem features ainda. Depois crie o
AGENTS.md na raiz do repositório: uma visão geral curta do projeto, como rodar
e testar, as convenções de código que seguiremos, guardrails (o que nunca fazer
sem perguntar), e um mapa de onde cada artefato de planejamento fica.
```

**Saída.** Um esqueleto de projeto rodando e commitado; `AGENTS.md`.

**Concluído quando.**

- [ ] O esqueleto roda e o comando de teste passa (mesmo com zero testes reais).
- [ ] O `AGENTS.md` existe e aponta para cada artefato de planejamento.
- [ ] Tudo está commitado.

## Fase 7: Implementar — o loop de build

**Objetivo.** Transformar o plano em software funcionando, uma tarefa por vez,
sem perder o controle do que o agente está fazendo.

**Entradas.** `implementation-plan.md`, `AGENTS.md`, e os demais artefatos.

**Trabalho.** Este é um loop. Para cada tarefa no plano de implementação:

1. **Enquadrar.** Aponte o agente para a tarefa e os artefatos que ela precisa.
   Uma tarefa por vez — resista a agrupar.
2. **Construir.** Deixe o agente implementar.
3. **Revisar.** Leia o diff você mesmo. Verifique contra o "concluído quando"
   da tarefa e as convenções do projeto. Questione qualquer coisa que você não
   teria escrito.
4. **Verificar.** Rode. Rode os testes. (Testes detalhados são a fase 8, mas
   nunca avance uma tarefa que não rode.)
5. **Registrar.** Marque a tarefa no `implementation-plan.md`. Se algo mudou —
   uma decisão, um desvio do plano — atualize o artefato relevante e registre
   no `decisions.md`.
6. **Commitar.** Uma tarefa, um commit focado.

Depois repita. Se uma tarefa ficar maior que o esperado, pare e divida no plano
em vez de deixar um diff crescer.

**Prompt.** _(por tarefa)_

```
Leia o AGENTS.md e o implementation-plan.md. Implemente a tarefa [X.Y]: [nome].
Use apenas o contexto dos nossos artefatos — se algo não estiver especificado,
pergunte antes de assumir. Mantenha a mudança com escopo nesta tarefa. Quando
terminar, me diga como verificar e o que revisar.
```

**Saída.** Código funcionando e commitado, tarefa a tarefa; `implementation-plan.md`
mantido atualizado; `decisions.md` atualizado conforme avança.

**Concluído quando.**

- [ ] Cada tarefa do MVP no plano está marcada como concluída.
- [ ] Cada tarefa foi revisada e commitada individualmente.
- [ ] Os artefatos ainda correspondem ao que foi construído.

## Fase 8: Testar e verificar

**Objetivo.** Provar que o MVP faz o que o `mvp.md` diz que faz — e manter
isso provável conforme ele muda.

**Entradas.** Código funcionando; `mvp.md`; `implementation-plan.md`.

**Trabalho.** Rascunhe [`templates/test-plan.md`](templates/test-plan.md) com
o agente: o que testar, em que nível (unitário, integração, ponta a ponta), e
quais fluxos são críticos o suficiente para nunca quebrar. Peça ao agente que
escreva os testes, priorizando os critérios de sucesso do MVP e as partes
arriscadas. Rode-os. Corrija o que quebrar. Decida qual nível de cobertura
automatizada é suficiente para um MVP — e escreva essa decisão em vez de
perseguir 100%.

**Prompt.**

```
Com base no mvp.md e no código que construímos, crie o test-plan.md: o que
testamos, em que nível, e quais fluxos de usuário são críticos. Depois escreva
testes para os critérios de sucesso do MVP e as áreas mais arriscadas primeiro.
Me diga o que você escolheu não testar e por quê.
```

**Saída.** `test-plan.md`; suite de testes automatizados; execução verde.

**Concluído quando.**

- [ ] Cada critério de sucesso do MVP do `mvp.md` tem um teste ou uma razão
      deliberada e documentada para não ter.
- [ ] Os fluxos críticos de usuário estão cobertos ponta a ponta.
- [ ] O suite completo passa.

---

# Estágio 3 — Lançar

O produto funciona na sua máquina. Este estágio o torna seguro para colocar
na frente de usuários reais.

## Fase 9: Revisar e fortalecer

**Objetivo.** Fechar a lacuna entre "funciona" e "está pronto" — segurança,
casos extremos, tratamento de erros e documentação.

**Entradas.** Código funcionando e testado; todos os artefatos.

**Trabalho.** Execute uma revisão deliberada com o agente por estes ângulos:

- **Segurança** — gerenciamento de secrets, validação de input, authn/authz,
  riscos de dependências.
- **Casos extremos** — estados vazios, inputs grandes, uso concorrente, falha
  de rede.
- **Tratamento de erros** — falha de forma barulhenta e recuperável, ou
  silenciosa e ruim?
- **Docs** — um README que permita outra pessoa rodar; `AGENTS.md` ainda preciso.

Priorize o que a revisão encontrar: corrija o que bloqueia o lançamento agora,
registre o resto no `decisions.md` ou como itens adiados.

**Prompt.**

```
Faça uma revisão pré-lançamento do código contra o mvp.md. Vá ângulo por
ângulo: segurança, casos extremos, tratamento de erros e documentação. Para
cada achado, classifique como bloqueador / deve-corrigir / seria-bom, e
explique o risco. Não corrija nada ainda — me dê a lista primeiro para eu
priorizar.
```

**Saída.** Uma lista priorizada de achados; correções para bloqueadores; README preciso.

**Concluído quando.**

- [ ] Nenhum problema bloqueador conhecido permanece.
- [ ] Secrets e configurações são tratados corretamente, não hardcoded.
- [ ] Uma pessoa nova consegue clonar, rodar e entender o projeto pelo README.

## Fase 10: Fazer deploy

**Objetivo.** Colocar o produto rodando onde usuários reais podem acessá-lo —
de forma repetível, não como uma vez só.

**Entradas.** Código robusto e testado; `tech-stack.md`.

**Trabalho.** Rascunhe [`templates/deployment.md`](templates/deployment.md)
com o agente: ambiente alvo, etapas de build e release, variáveis de ambiente
e secrets, como fazer rollback, e como você saberá que está saudável. Automatize
o caminho de release (CI/CD ou um script documentado) para que fazer deploy
novamente seja entediante. Faça um deploy real. Verifique contra os health
checks do `deployment.md`.

**Prompt.**

```
Com base no tech-stack.md, crie o deployment.md: ambiente alvo, processo
passo a passo de build e release, variáveis de ambiente necessárias e como
secrets são gerenciados, o procedimento de rollback, e os health checks que
confirmam um deploy bem-sucedido. Depois me ajude a automatizar o caminho de
release para que deploys futuros sejam repetíveis.
```

**Saída.** `deployment.md`; caminho de release automatizado/documentado; deploy em produção.

**Concluído quando.**

- [ ] O produto é acessível pelos usuários pretendidos.
- [ ] Fazer deploy novamente é um processo repetível, não improviso.
- [ ] Você sabe como fazer rollback e como saber se está saudável.

## Fase 11: Iterar

**Objetivo.** Transformar o que você aprende com o uso real na próxima
iteração — e manter os artefatos honestos.

**Entradas.** Um produto em produção; feedback dos usuários; o conjunto completo
de artefatos.

**Trabalho.** Colete feedback e comportamento observado. Com o agente, priorize
em bugs, melhorias e novas features. Bugs re-entram no loop de build
diretamente. Melhorias e novas features voltam para a **Fase 1**: atualize
`project-scope.md`, revisite o limite do MVP/escopo, e planeje a próxima
iteração. A lista de adiados da fase 3 é revisitada aqui também.

**Prompt.**

```
Aqui estão o feedback e os dados de uso do produto em produção: [cole]. Me
ajude a priorizar em bugs, melhorias e novas features. Para cada um, note o
impacto para o usuário e o esforço aproximado. Depois recomende no que a
próxima iteração deve focar, e quais artefatos precisam ser atualizados para
refletir isso.
```

**Saída.** Um backlog priorizado; artefatos atualizados; um foco para o
próximo loop.

**Concluído quando.**

- [ ] O feedback está priorizado, não numa pilha.
- [ ] O foco da próxima iteração está decidido e com escopo.
- [ ] O `project-scope.md` e a lista de adiados refletem a realidade atual.

Depois volte para o Estágio 1 para a próxima iteração.

---

# Princípios transversais

Estes valem em todas as fases:

- **Contexto antes de código.** O agente lê os artefatos antes de construir.
  Se os artefatos estão errados, o build está errado.
- **Passos pequenos.** Uma tarefa, um diff, um commit. Diffs grandes escondem
  erros.
- **Você decide, o agente rascunha.** O agente propõe opções e trade-offs; a
  decisão e o raciocínio são seus, e ficam escritos.
- **Revise cada diff.** O agente é rápido, não infalível. Ler o output dele
  não é opcional.
- **Mantenha os artefatos sincronizados.** No momento em que a realidade
  diverge de um documento, corrija o documento. Um artefato desatualizado
  engana ativamente o agente.
- **Registre o porquê.** O `decisions.md` captura decisões e raciocínios em
  todas as fases. O você do futuro e o agente vão precisar disso.
- **Faça o agente discordar de você.** O movimento mais valioso dele é
  encontrar a falha que você não consegue ver — peça isso explicitamente.
