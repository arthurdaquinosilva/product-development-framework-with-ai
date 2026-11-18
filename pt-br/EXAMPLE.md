# Exemplo Detalhado

Um guia completo de ponta a ponta do framework aplicado a um projeto pequeno:
**um rastreador de hábitos por linha de comando**. Todas as fases são mostradas
— os comandos, as trocas com o agente, os artefatos preenchidos e os critérios
de conclusão. Os artefatos estão abreviados (os reais têm mais detalhe) mas a
forma e o conteúdo são fiéis.

Apenas markdown, de propósito. O framework não fornece código de exemplo;
o agente gera isso.

O projeto foi configurado com o `pdev-init`, então os templates estão em
`docs/` e as skills das fases estão disponíveis como comandos `/pdev-…`. A
qualquer momento, `/pdev` informa em qual fase o projeto está e o que rodar
em seguida.

---

## Estágio 1 — Planejar

### Fase 1: Definir o escopo

**O que você faz.** Abra o `docs/project-scope.md` e preencha o que está na
sua cabeça. Seja informal. Nenhum agente ainda — esta fase é só você.

**Primeiro rascunho (escrito por você, antes de qualquer agente):**

> **Problema.** Fico esquecendo quais hábitos fiz em cada dia e perco o fio
> das minhas sequências. Apps são pesados demais; quero algo que use no terminal
> sem mudar de contexto.
>
> **Solução.** Uma CLI onde posso definir hábitos, marcar como feito a cada dia,
> e ver minhas sequências atuais.
>
> **Usuários.** Eu, e desenvolvedores como eu que vivem no terminal.
>
> **Features.** Adicionar hábitos · marcar hábitos como feitos · ver
> sequências · remover hábitos.
>
> **Fora do escopo.** *(em branco — vou preencher com o agente)*
>
> **Questões em aberto.** *(em branco)*

**Concluído quando:**
- [x] Você consegue descrever o problema em uma ou duas frases.
- [x] Você listou as features que imagina, mesmo que pela metade.

---

### Fase 2: Clarificar os requisitos

**Rodar:** `/pdev-clarify`

**Primeiro lote de perguntas do agente:**

> 1. O que conta como um "dia"? Dia do calendário no horário local, ou uma
>    janela de 24 horas a partir do último registro?
> 2. Se você perder um dia, a sequência zera, ou dá para preencher depois?
> 3. Um hábito pode ter frequência não diária — a cada dois dias, só dias úteis?
> 4. É só para um usuário, ou deveria funcionar em várias máquinas?
> 5. O que deveria acontecer se duas pessoas compartilharem a mesma máquina?

**Suas respostas:**

> 1. Dia do calendário, meia-noite local.
> 2. A sequência zera — sem preencher depois, por enquanto.
> 3. Só diário. Qualquer outra coisa está fora do escopo.
> 4. Uma máquina só. Sem sincronização.
> 5. Fora do escopo — ferramenta de um usuário.

**Segundo lote:**

> 6. Quando você adiciona um hábito novo, a sequência começa em 0, ou em 1 no
>    primeiro dia em que você o registra?
> 7. Se você rodar `done` duas vezes para o mesmo hábito no mesmo dia — erro
>    ou idempotente?
> 8. Quando você remove um hábito, o que acontece com o histórico — apagado ou
>    mantido?

**Suas respostas:**

> 6. A sequência começa a contar na primeira vez que você marca — então 0 antes
>    de qualquer registro, 1 depois do primeiro.
> 7. Idempotente — seguro rodar duas vezes.
> 8. Remover hábito provavelmente fica fora do MVP; decido depois.

O agente informa que não tem mais perguntas de primeira ordem e reescreve o
arquivo.

**`project-scope.md` resultante:**

> **Problema.** Pessoas que querem construir hábitos diários perdem o controle
> das suas sequências e não têm um jeito rápido de registrar um hábito de onde
> já trabalham — o terminal.
>
> **Solução.** Uma CLI pequena para definir hábitos, marcá-los como feitos a
> cada dia e ver as sequências atuais.
>
> **Usuários.** Desenvolvedores e pessoas confortáveis com terminal construindo
> hábitos pessoais. Um usuário, uma máquina.
>
> **Features.** Adicionar um hábito · marcar um hábito como feito hoje
> (idempotente — rodar duas vezes no mesmo dia conta uma) · ver sequências
> atuais · remover um hábito.
>
> **Fora do escopo.** Lembretes/notificações · sincronização entre
> dispositivos · qualquer GUI · hábitos não diários · preencher dias perdidos ·
> suporte multiusuário.
>
> **Questões em aberto.** O que acontece com os dados de um hábito removido?
> → estacionada; adiada junto com a própria feature de remover.

*As duas rodadas de perguntas revelaram a ambiguidade do "o que é um dia", a
regra de registro idempotente, e empurraram o preenchimento retroativo para
fora do escopo — decisões que teriam causado retrabalho se deixadas para o
build.*

**Concluído quando:**
- [x] O agente não tem mais perguntas de esclarecimento de primeira ordem.
- [x] "Fora do escopo" está escrito, não apenas implícito.
- [x] As questões em aberto estão resolvidas ou explicitamente estacionadas.

---

### Fase 3: Definir o MVP

**Rodar:** `/pdev-mvp`

**Troca principal:**

> **Agente:** "Remover hábitos" — eu adiaria. O problema central é *perder o
> controle das sequências e registrar hábitos*. O usuário pode simplesmente
> ignorar um hábito que abandonou; o produto ainda resolve o problema. Incluir
> remoção também exige decidir o que acontece com o histórico, um risco de
> escopo para um MVP.
>
> **Você:** Justo. Adia.
>
> **Agente:** Seu critério de sucesso "as sequências estão corretas" não dá
> para testar do jeito que está. Posso dividi-lo nos casos específicos que
> importam — dias consecutivos, um dia perdido, duplicatas no mesmo dia e a
> virada do mês?
>
> **Você:** Pode.
>
> **Agente:** Uma premissa me preocupa: você espera usar isso por anos, e um
> único arquivo JSON é reescrito a cada `done`. Continua instantâneo com 50+
> hábitos e alguns anos de histórico? É barato testar isso antes de se
> comprometer com o formato. Eu marcaria para um spike.

**`mvp.md` resultante:**

> **Problema central que o MVP deve resolver.** Registrar um hábito e ver se a
> sequência está viva — sem atrito.
>
> **No MVP.** Adicionar um hábito · marcar como feito hoje · ver sequências.
>
> **Adiado.** Remover hábitos · preencher dias perdidos · estatísticas ou
> histórico além da sequência atual.
>
> **Critérios de sucesso.**
> - A sequência é 0 antes de qualquer registro, 1 após o primeiro, +1 por dia
>   consecutivo.
> - Um dia perdido zera a sequência.
> - Registrar o mesmo hábito duas vezes no mesmo dia conta uma.
> - A sequência está correta na virada do mês (30 abr → 1º mai).
> - Os dados sobrevivem entre execuções.
> - Um usuário novo consegue adicionar e registrar um hábito em menos de 10
>   segundos. *(manual)*
>
> **Premissas e riscos.**
> - Usuários aceitam adotar uma ferramenta de CLI. *(risco aceito — é para nós)*
> - Um único arquivo JSON continua rápido com 50+ hábitos e anos de
>   histórico. **(spike)**

**Concluído quando:**
- [x] A lista de features do MVP é menor do que seu instinto queria.
- [x] Todo critério de sucesso é verificável automaticamente, ou está marcado
      como manual.
- [x] As features adiadas estão registradas para não se perderem.
- [x] As premissas arriscadas estão listadas, e as que merecem um spike estão
      marcadas.

---

### Fase 4: Spikes nas incertezas

**Rodar:** `/pdev-spike`

O agente propõe uma pergunta — *"Carregar, atualizar e salvar um store JSON
com 100 hábitos × 5 anos de registros diários fica abaixo de 100 ms?"* — e um
script de 20 linhas em `spikes/` que gera esse volume de dados falsos e mede
um ciclo carregar-modificar-salvar. Você confirma.

**Resultado:** cerca de 180.000 datas, um arquivo de 3,4 MB, ~45 ms por ciclo
num notebook. Folgadamente rápido. Mas o spike revelou uma segunda descoberta
que ninguém tinha perguntado: escrever o arquivo no lugar significa que um
Ctrl-C no meio da escrita deixa um JSON truncado — e o usuário perde *todo* o
histórico.

**`spikes.md` resultante:**

> **Um único arquivo JSON continua rápido com 100 hábitos × 5 anos?**
> - **Por que importava.** O formato dos dados é difícil de mudar depois;
>   escolher errado significa uma migração.
> - **O que tentamos.** Um script descartável: gerar dados, medir carregar →
>   modificar → salvar.
> - **Descoberta.** Sim — ~45 ms por ciclo com 3,4 MB. Descoberta paralela:
>   escritas no lugar podem corromper o arquivo se forem interrompidas.
> - **O que muda.** JSON confirmado para o MVP. Os salvamentos precisam ser
>   atômicos (escrever num arquivo temporário e depois renomear). Adicionado
>   aos riscos do `mvp.md`.
> - **Código.** Apagado.

*Dez minutos de código descartável resolveram um debate sobre formato e
encontraram um risco de perda de dados antes de existir uma única linha do
produto real.*

**Concluído quando:**
- [x] Cada spike respondeu sua pergunta.
- [x] As descobertas estão no `spikes.md`, e o `mvp.md` as reflete.
- [x] O código do spike foi apagado.

---

### Fase 5: Escolher a stack tecnológica

**Rodar:** `/pdev-stack desenvolvedor solo, confortável com Python, só local,
orçamento zero de hospedagem, deve instalar com um comando`

**Troca principal:**

> **Agente:** Armazenamento: um arquivo JSON, como o spike confirmou, com um
> campo `version` para que o formato possa ser migrado, e escritas atômicas.
> Para verificação eu adicionaria `mypy --strict` junto com `ruff` e
> `pytest` — a lógica de sequência é toda aritmética de datas, e tipos
> rigorosos pegam uma classe de bugs antes mesmo de os testes rodarem. CI no
> GitHub Actions rodando os três.
>
> **Você:** De acordo com tudo.

**`tech-stack.md` resultante:**

> **Restrições.** Desenvolvedor solo, confortável com Python · só local ·
> orçamento zero de hospedagem · instalação com um comando.
>
> | Camada | Escolha | Por quê | Alternativa considerada |
> |---|---|---|---|
> | Linguagem | Python 3.11+ | Linguagem principal | — |
> | Framework | `argparse` (stdlib) | Uma CLI não precisa de framework | `click` — mais agradável, mas é uma dependência |
> | Armazenamento | Arquivo JSON (`~/.habit-cli/`), versionado, escritas atômicas | Zero configuração; o spike mostrou que é rápido o suficiente | SQLite — mais robusto, sem benefício para o MVP |
> | Distribuição | `pipx` | Instalação isolada, um comando | `pip` — polui o ambiente global |
> | Test runner | `pytest` | Padrão, rápido | — |
> | Lint / formatação / tipos | `ruff`, `mypy --strict` | Feedback rápido e rigoroso para o agente | — |
> | CI | GitHub Actions | Gratuito, roda os mesmos gates | — |
>
> **Difícil de reverter.** O formato dos dados em disco — JSON com um campo
> `version`.
>
> **Deliberadamente deixado de fora.** Sem framework web · sem serviço de
> banco de dados · sem async · sem ORM.

**Entrada no `decisions.md`:**

> **2026-05-02 — Arquivo JSON como armazenamento, com escritas atômicas**
> - **Contexto.** O MVP é de um usuário e só local. Spike: ~45 ms com 100
>   hábitos × 5 anos; escritas no lugar podem corromper o arquivo.
> - **Decisão.** Arquivo JSON em `~/.habit-cli/` com um campo `version`; todo
>   salvamento escreve um arquivo temporário e o renomeia por cima do antigo.
> - **Por quê.** Zero infraestrutura, rápido o suficiente. SQLite rejeitado —
>   sem benefício para o MVP.
> - **Consequências.** Configuração trivial; vai ser preciso um caminho de
>   migração se sincronização ou analytics entrarem no escopo.

**Concluído quando:**
- [x] Cada camada da stack tem uma opção escolhida e uma justificativa de uma linha.
- [x] O tooling de verificação (testes, tipos/lint, CI) está escolhido.
- [x] As escolhas difíceis de reverter foram identificadas e feitas deliberadamente.
- [x] Você conseguiria explicar a stack para outra pessoa sem a ajuda do agente.

---

### Fase 6: Planejar o build

**Rodar:** `/pdev-plan`

**`implementation-plan.md` resultante (abreviado):**

> **Fase A: Esqueleto funcional**
>
> **A.1 — Ponto de entrada da CLI**
> - Tarefa. Pacote, ponto de entrada e comandos stub `add`, `done`, `list`.
> - Verificação de aceite: `test_cli.py::test_help_lists_commands` —
>   `habit --help` sai com 0 e lista os três comandos.
> - Depende de: nenhuma · Grupo paralelo: — · Mexe em: `cli.py`, `pyproject.toml`
> - Revisão: auto
>
> **A.2 — Carregar/salvar o store JSON**
> - Tarefa. `load_store()` / `save_store()`; escritas atômicas; `version: 1`.
> - Verificação de aceite: `test_store.py` — a ida e volta preserva os dados;
>   o diretório é criado na primeira execução; o arquivo contém
>   `"version": 1`; um salvamento interrompido deixa o arquivo anterior
>   intacto.
> - Depende de: A.1 · Grupo paralelo: — · Mexe em: `store.py`
> - Revisão: **humana** — define o formato em disco (difícil de reverter).
>
> **Fase B: Features principais**
>
> **B.1 — `add` persiste um hábito**
> - Verificação de aceite: `test_cli.py::test_add_then_list`.
> - Depende de: A.2 · Grupo paralelo: **B1** · Mexe em: `cli.py`
> - Revisão: auto
>
> **B.2 — Cálculo da sequência**
> - Tarefa. Função pura `calculate_streak(dates, today) -> int`.
> - Verificação de aceite: `test_streak.py` — um teste por critério de
>   sucesso: 0 sem registros, dias consecutivos, zera após um dia perdido,
>   duplicatas no mesmo dia contam uma, 30 abr → 1º mai.
> - Depende de: nenhuma · Grupo paralelo: **B1** · Mexe em: `streak.py`
> - Revisão: auto
>
> **B.3 — `done` marca hoje**
> - Verificação de aceite: `test_cli.py::test_done_is_idempotent`.
> - Depende de: B.1 · Grupo paralelo: B2 · Mexe em: `cli.py`
> - Revisão: auto
>
> **B.4 — `list` mostra sequências e o status de hoje**
> - Verificação de aceite: `test_cli.py::test_list_shows_streak_and_status`.
> - Depende de: B.2, B.3 · Grupo paralelo: — · Mexe em: `cli.py`
> - Revisão: auto
>
> **Fase C: Polimento** — C.1 erros amigáveis para um store corrompido · C.2
> texto de ajuda e README *(mesma forma, omitidos)*.

**`test-plan.md` resultante (abreviado):**

> **Gates.** `pytest` · `ruff check . && ruff format --check .` · `mypy --strict src`
>
> | Critério de sucesso | Provado por | Automatizado? |
> |---|---|---|
> | Regras de sequência (4 critérios) | B.2 — `test_streak.py` | sim |
> | Os dados sobrevivem entre execuções | A.2 — `test_store_roundtrip` | sim |
> | Adicionar + registrar em menos de 10 segundos | verificação manual na Fase 9 | manual |
>
> **Fluxos críticos (ponta a ponta).** add → done → list mostra sequência 1.
>
> **Deliberadamente não testado.** Internos do `argparse` · formatação exata
> da saída.

**Sua revisão.** O agente sinalizou a B.2 como a tarefa mais arriscada e
notou que B.1 e B.2 mexem em arquivos diferentes, então podem rodar em
paralelo. Você leu o plano inteiro e mudou uma coisa: a verificação da A.2
originalmente não incluía o caso do salvamento interrompido descoberto no
spike. Você o adicionou.

**Concluído quando:**
- [x] Toda tarefa tem uma verificação de aceite executável.
- [x] Todo critério de sucesso do MVP mapeia para a verificação de uma tarefa
      ou para uma verificação manual.
- [x] Algo roda de ponta a ponta cedo na ordem.
- [x] Dependências, grupos paralelos e níveis de revisão estão definidos em
      todas as tarefas.
- [x] Você leu o plano inteiro e aprovou.

---

## Estágio 2 — Construir

### Fase 7: Configurar o projeto

**Rodar:** `/pdev-setup`

**O que o agente criou:**

```
habit-cli/
  src/habit_cli/
    __init__.py
    cli.py          ← ponto de entrada; só comandos stub
  tests/
    test_placeholder.py
  .github/workflows/ci.yml   ← roda pytest, ruff, mypy
  pyproject.toml    ← instalável com pipx; ruff, mypy, pytest configurados
  .gitignore
  AGENTS.md
  CLAUDE.md         ← "@AGENTS.md"
```

Os três gates passam localmente e no CI.

**`AGENTS.md` resultante (abreviado):**

> **Visão geral do projeto.** Um rastreador de hábitos de linha de comando
> para desenvolvedores: definir hábitos, registrá-los diariamente, ver as
> sequências atuais. Um usuário, uma máquina.
>
> **Rodar.** `pipx install -e .` · `habit --help`
>
> **Definição de pronto.**
> ```
> pytest
> ruff check . && ruff format --check .
> mypy --strict src
> ```
>
> **Convenções.** Type hints em tudo · nada de `print` fora do `cli.py` · os
> testes espelham `src/` · mensagens de commit: imperativo, ≤72 caracteres,
> com o id da tarefa.
>
> **Trabalhando de forma autônoma.** Commits: espere minha revisão antes de
> commitar.
>
> **Gatilhos de revisão humana.** O formato dos dados em disco · qualquer
> coisa que apague dados do usuário · empacotamento no `pyproject.toml` e
> configuração do CI.
>
> **Proteções.** Nunca enfraqueça um teste para passar · nenhuma dependência
> nova sem perguntar · todos os caminhos de arquivo passam pelo `store.py`.
>
> **Mapa de artefatos.** *(a lista padrão, apontando para `docs/`)*

**Concluído quando:**
- [x] O esqueleto roda e todos os gates passam.
- [x] O CI roda os mesmos gates e está verde.
- [x] O `AGENTS.md` está preenchido.
- [x] Está tudo commitado.

---

### Fase 8: Construir — o loop

Três momentos ilustram o ritmo: uma tarefa rotineira, uma tarefa `humana`, e
duas tarefas rodando em paralelo.

---

**Tarefa A.1 — Ponto de entrada da CLI** *(rotineira, `auto`)*

Rode `/pdev-build A.1`. O agente escreveu `test_help_lists_commands`, viu o
teste falhar, criou os comandos stub e rodou os gates de novo: tudo verde. O
relatório dele: três arquivos alterados, nenhum desvio, nada de que não
tivesse certeza.

*Revisão:* leu o relatório, passou o olho no diff. Commit:
`add CLI entry point with stub commands (A.1)`.

---

**Tarefa A.2 — Store JSON** *(`humana` — onde a sua atenção compensa)*

Rode `/pdev-build A.2`. O agente escreveu os quatro testes do store,
implementou o store e deixou todos os gates verdes. O relatório apontou a
função de serialização como a parte que precisava de revisão linha a linha.

*Revisão:* lendo com atenção, você notou que as datas eram escritas com
`date.strftime("%x")` — dependente de locale. Todos os testes passaram,
porque os testes rodam sob um único locale. Mas um usuário que mudasse o
locale do sistema encontraria o histórico ilegível. Exatamente o tipo de
problema que um formato difícil de reverter esconde.

*Questionou:*

```
As datas precisam ser ISO 8601 (date.isoformat()) — o formato em disco não
pode depender do locale. Adicione um teste que carrega um store sob outro
locale.
```

O agente corrigiu, adicionou o teste, rodou os gates de novo e registrou:

> **2026-05-03 — Datas em disco são ISO 8601**
> - **Contexto.** Revisão da A.2: a primeira implementação usava o formato
>   `%x`, dependente de locale.
> - **Decisão.** Sempre `date.isoformat()`; um teste fixa isso.
> - **Por quê.** O formato em disco não pode mudar com o ambiente do usuário.
> - **Consequências.** Nenhuma — pego antes de existir qualquer dado.

Commit: `add versioned JSON store with atomic writes (A.2)`.

---

**Tarefas B.1 e B.2 — em paralelo**

B.1 e B.2 compartilham o grupo paralelo B1 e mexem em arquivos diferentes,
então você iniciou duas sessões, cada uma no seu próprio git worktree:
`/pdev-build B.1` numa, `/pdev-build B.2` na outra.

Na B.2, o agente escreveu primeiro o `test_streak.py` a partir da verificação
de aceite — os cinco casos falhando. A primeira implementação passou em
quatro; o teste da virada do mês falhou (um erro de um dia ao calcular o dia
anterior entre meses). O agente viu a falha, corrigiu a aritmética de datas,
e só reportou de volta quando tudo estava verde. O caso de duplicatas no
mesmo dia passou de primeira, porque foi escrito na verificação lá na Fase
6 — a regra da Fase 2 nunca teve chance de se perder.

As duas tarefas voltaram verdes. Passou o olho nos dois diffs, fez merge dos
dois branches, um commit cada.

---

**Concluído quando (todas as tarefas prontas):**
- [x] Todas as tarefas do MVP no plano estão marcadas.
- [x] Toda verificação de aceite existe como teste automatizado e passa.
- [x] Toda tarefa `humana` foi revisada linha a linha.
- [x] Os artefatos ainda correspondem ao que foi realmente construído.

---

## Estágio 3 — Lançar

### Fase 9: Verificar e reforçar

**Rodar:** `/pdev-harden`

**Verificar.** O teste de ponta a ponta de add → done → list existia desde a
B.4 e passou. Depois o agente usou a CLI como um usuário novo e cronometrou:
adicionar e registrar um hábito levou uns 6 segundos, incluindo ler o
`--help` — o critério manual se mantém. Você experimentou o mesmo fluxo.

Ele também encontrou algo que nenhum teste cobria: `habit done corrr` (um
erro de digitação) quebrava com um traceback `KeyError`.

**Reforçar — achados:**

> 1. **Deveria corrigir.** Nomes de hábito desconhecidos quebram com um
>    traceback em vez de "nenhum hábito chamado 'corrr' — você quis dizer
>    'correr'?"
> 2. **Deveria corrigir.** O arquivo do store é criado com o umask padrão —
>    numa máquina compartilhada outros poderiam lê-lo. Usar modo `0600`.
> 3. **Seria bom ter.** Não existe a flag `--version`.
> 4. **Seria bom ter.** Nomes de hábito diferenciam maiúsculas (`"Correr"` ≠
>    `"correr"`) — isso não está documentado em lugar nenhum.

**Priorização:** corrigidos #1 e #2, cada um com um teste de regressão. #3 e
#4 registrados no `decisions.md` como itens conhecidos e adiados.

**Concluído quando:**
- [x] Todo fluxo crítico passa de ponta a ponta, e você mesmo usou o produto.
- [x] Não restam bloqueadores conhecidos, e cada correção tem um teste de regressão.
- [x] Segredos e configurações estão tratados corretamente, não hard-coded.
- [x] Uma pessoa nova conseguiria clonar, rodar e entender o projeto pelo README.

---

### Fase 10: Fazer o deploy

**Rodar:** `/pdev-deploy`

**`deployment.md` resultante:**

> **Ambiente alvo.** As máquinas dos usuários. Distribuído pelo PyPI;
> instalado com `pipx`.
>
> **Processo de release.** Automatizado: fazer push de uma tag `v*` roda o
> CI, faz o build com `python -m build` e publica no PyPI via trusted
> publishing (sem token guardado).
>
> **Variáveis de ambiente e segredos.** Nenhum — o trusted publishing do PyPI
> não precisa de segredo.
>
> **Health check.** `scripts/smoke.sh <versão>` — instala essa versão com
> `pipx` num ambiente temporário limpo e roda
> `habit add teste && habit done teste && habit list`; sai com código
> diferente de zero a menos que a sequência seja 1.
>
> **Rollback.** Fazer yank do release ruim no PyPI; a versão anterior continua
> instalável. Rodar o smoke test de novo contra ela.

O agente preparou tudo; você fez o push da tag `v0.1.0`. O smoke test passou
contra o pacote publicado.

**Concluído quando:**
- [x] O produto é acessível pelos usuários pretendidos.
- [x] Fazer deploy de novo é um processo repetível e automatizado.
- [x] O rollback está escrito, e os health checks rodam como um comando.

---

### Fase 11: Iterar

**Rodar:** `/pdev-iterate "quero remover hábitos que abandonei" / "esqueci de
registrar ontem — dá para preencher?" / "o habit list fica errado logo depois
da meia-noite"`

**Priorização:**

> - *"Remover hábitos"* — melhoria, já estava na lista de adiados. Esforço
>   pequeno, valor alto. Recomendado para a próxima iteração.
> - *"Preencher um dia perdido"* — feature nova, explicitamente adiada.
>   Precisa de escopo primeiro: só ontem, ou qualquer data? Não construir até
>   isso ser respondido.
> - *"Errado logo depois da meia-noite"* — **bug**. Reproduzido: o `list`
>   calcula "hoje" uma vez só, na importação, então uma sessão de shell longa
>   fica desatualizada. Adicionada a tarefa D.1, cuja verificação de aceite é
>   um teste que o reproduz.

**Resultado:** `/pdev-build D.1` corrigiu o bug. `project-scope.md`
atualizado — remover hábitos foi para a lista de features; preenchimento
retroativo foi para as questões em aberto. O loop volta para o Estágio 1 para
a próxima iteração.

**Concluído quando:**
- [x] O feedback está priorizado, não numa pilha.
- [x] Todo bug a corrigir tem uma tarefa que começa com um teste que o reproduz.
- [x] O foco da próxima iteração está decidido e com escopo.
- [x] O `project-scope.md` e a lista de adiados refletem a realidade atual.

---

## O `decisions.md` no final

Um log de decisões se acumula ao longo de todas as fases. Assim ele ficou no
final da primeira iteração:

> **2026-05-06 — Diferenciação de maiúsculas nos nomes é conhecida, mas adiada**
> - **Contexto.** A revisão da Fase 9 apontou que `"Correr"` e `"correr"` são
>   hábitos diferentes.
> - **Decisão.** Deixar assim por enquanto; documentar no README.
> - **Por quê.** Corrigir exige uma migração de dados. Baixo impacto num MVP.
> - **Consequências.** Pode causar duplicatas confusas.
>
> **2026-05-05 — O arquivo do store é privado do usuário (modo 0600)**
> - **Contexto.** Revisão da Fase 9: o arquivo era criado com o umask padrão.
> - **Decisão.** Criá-lo com modo `0600`.
> - **Por quê.** Dados de hábitos são pessoais; máquinas compartilhadas existem.
> - **Consequências.** Nenhuma para uso de um usuário.
>
> **2026-05-03 — Datas em disco são ISO 8601**
> - **Contexto.** Fase 8, revisão humana da A.2: a primeira implementação
>   usava um formato dependente de locale que passava em todos os testes.
> - **Decisão.** Sempre `date.isoformat()`; um teste fixa isso.
> - **Por quê.** O formato em disco não pode depender do ambiente do usuário.
> - **Consequências.** Nenhuma — pego antes de existir qualquer dado.
>
> **2026-05-02 — Arquivo JSON como armazenamento, com escritas atômicas**
> - **Contexto.** Fase 5, informada pelo spike da Fase 4.
> - **Decisão.** JSON versionado em `~/.habit-cli/`; arquivo temporário +
>   renomear ao salvar.
> - **Por quê.** Zero infraestrutura, rápido o suficiente; escritas atômicas
>   evitam perder todo o histórico num salvamento interrompido.
> - **Consequências.** Caminho de migração necessário se sincronização entrar
>   no escopo.

---

A questão: cada problema foi pego pelo mecanismo construído para pegá-lo. A
ambiguidade do "o que é um dia" e a regra de registro duplicado foram pegas
na clarificação, e depois travadas em verificações de aceite antes de existir
qualquer código. O risco de perda de dados foi pego por um spike de dez
minutos. O bug da virada do mês foi pego pelo próprio agente, porque a
verificação existia antes do código. E o bug de locale — que passava em todos
os testes — foi pego por um humano, porque o plano dizia que aquela tarefa
merecia um. Os prompts não são mágica; os artefatos e as verificações são.
Esse é o framework inteiro em um parágrafo.
