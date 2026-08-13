# Exemplo Detalhado

Um guia completo de ponta a ponta do framework aplicado a um projeto pequeno:
**um rastreador de hábitos por linha de comando**. Todas as fases são mostradas
— prompts, trocas com o agente, artefatos preenchidos e critérios de conclusão.
Os artefatos estão abreviados (os reais têm mais detalhe) mas a forma e o
conteúdo são fiéis.

Apenas markdown, de propósito. O framework não fornece código de exemplo;
o agente gera isso.

---

## Estágio 1 — Planejar

### Fase 1: Definir o escopo

**O que você faz.** Abra o `project-scope.md` e preencha o que está na sua
cabeça. Seja informal. Nenhum agente ainda — esta fase é só você.

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
> **Features.** Adicionar hábitos · marcar hábitos como feito · ver sequências ·
> remover hábitos.
>
> **Fora do escopo.** *(em branco — vou preencher com o agente)*
>
> **Questões em aberto.** *(em branco)*

**Concluído quando:**
- [x] Você consegue descrever o problema em uma ou duas frases.
- [x] Você listou as features que imagina, mesmo que pela metade.

---

### Fase 2: Clarificar os requisitos

**Prompt:**

```
Leia o project-scope.md. Revise-o de forma crítica e me faça perguntas de
esclarecimento. Encontre lacunas, ambiguidades e coisas que não foram pensadas
— especialmente em relação aos usuários, casos extremos e o que está
explicitamente fora do escopo. Não sugira soluções ainda. Faça um lote focado
de perguntas por vez.
```

**Primeiro lote de perguntas do agente:**

> 1. O que conta como um "dia"? Dia calendário no horário local, ou uma janela
>    de 24 horas a partir do último registro?
> 2. Se você pular um dia, a sequência zera ou dá para preencher retroativamente?
> 3. Um hábito pode ter frequência diferente de diária — a cada dois dias,
>    só dias úteis?
> 4. Isso é para um único dispositivo ou deve funcionar em várias máquinas?
> 5. O que acontece se duas pessoas compartilham a mesma máquina?

**Suas respostas:**

> 1. Dia calendário, meia-noite local.
> 2. Sequência zera — sem preenchimento retroativo por enquanto.
> 3. Apenas diário. Qualquer outra coisa está fora do escopo.
> 4. Uma máquina apenas. Sem sincronização.
> 5. Fora do escopo — ferramenta para usuário único.

**Segundo lote do agente:**

> 6. Quando você adiciona um novo hábito, a sequência começa em 0 ou em 1 no
>    primeiro dia que registrar?
> 7. Se você rodar `feito` duas vezes para o mesmo hábito no mesmo dia — erro
>    ou idempotente?
> 8. Quando você remove um hábito, o que acontece com o histórico — deletado
>    ou mantido?

**Suas respostas:**

> 6. Sequência começa a contar a partir da primeira vez que marcar como feito
>    — então 0 antes de qualquer registro, 1 depois do primeiro.
> 7. Idempotente — seguro rodar duas vezes.
> 8. Remover um hábito provavelmente está fora do MVP; vou decidir depois.

**Prompt:**

```
Atualize o project-scope.md com tudo que discutimos. Mantenha-o conciso.
Adicione uma seção "Fora do escopo" e uma "Questões em aberto" se tivermos
conteúdo para elas.
```

**`project-scope.md` resultante:**

> **Problema.** Pessoas que querem criar hábitos diários perdem o fio das
> sequências e não têm uma forma rápida de registrar um hábito de onde já
> trabalham — o terminal.
>
> **Solução.** Uma CLI pequena para definir hábitos, marcá-los como feito a
> cada dia, e ver as sequências atuais.
>
> **Usuários.** Desenvolvedores e pessoas que usam o terminal para construir
> hábitos pessoais. Usuário único, máquina única.
>
> **Features.** Adicionar um hábito · marcar um hábito como feito hoje ·
> ver sequências atuais · remover um hábito.
>
> **Fora do escopo.** Lembretes/notificações · sincronização entre dispositivos
> · qualquer GUI · hábitos sub-diários ou não-diários · preenchimento retroativo
> de dias perdidos · suporte multi-usuário.
>
> **Questões em aberto.** O que acontece com os dados quando um hábito é
> removido? → estacionado; adiado junto com a feature de remoção.

*As duas rodadas de perguntas descobriram a ambiguidade do "o que é um dia", a
regra de registro idempotente, e empurraram o preenchimento retroativo para fora
do escopo — todas decisões que teriam causado retrabalho se deixadas para a
fase de build.*

**Concluído quando:**
- [x] O agente não tem mais perguntas de primeira ordem.
- [x] "Fora do escopo" está escrito, não apenas implícito.
- [x] Questões em aberto estão resolvidas ou explicitamente estacionadas.

---

### Fase 3: Definir o MVP

**Prompt:**

```
Com base no project-scope.md, me ajude a definir o MVP — a menor versão que
ainda resolve o problema central e vale a pena entregar. Para cada feature,
argumente se é realmente MVP ou pode esperar. Me desafie quando eu estiver
exagerando no escopo. Depois, crie o mvp.md com o escopo do MVP, o que foi
adiado, e os critérios de sucesso que vão nos dizer se o MVP funcionou.
```

**Troca principal:**

> **Agente:** "Remover hábitos" — eu adiaria. O problema central é *perder o
> fio das sequências e registrar hábitos*. Um usuário pode simplesmente ignorar
> um hábito que abandonou; o produto ainda resolve o problema. Incluir deletar
> também significa decidir o que acontece com o histórico, o que é risco de
> escopo para um MVP.
>
> **Você:** Faz sentido. Adiar.
>
> **Agente:** "Ver sequências" precisa estar no MVP — é o feedback loop que
> torna o registro útil. Concordamos?
>
> **Você:** Concordo.

**`mvp.md` resultante:**

> **Problema central que o MVP deve resolver.** Registrar um hábito e ver se
> a sequência está viva — sem fricção.
>
> **No MVP.** Adicionar um hábito · marcar como feito hoje · ver sequências.
> *(Remover foi adiado — você pode ignorar um hábito; o produto ainda resolve
> o problema central sem deletar.)*
>
> **Adiado.** Remover hábitos · preenchimento retroativo de dias perdidos ·
> estatísticas ou histórico além da sequência atual.
>
> **Critérios de sucesso.** Um novo usuário consegue adicionar um hábito e
> registrá-lo em menos de 10 segundos · a contagem de sequência está correta
> entre dias · os dados sobrevivem entre execuções.
>
> **Premissas e riscos.** Usuários estão dispostos a adotar uma ferramenta CLI
> · um arquivo JSON local não será lento mesmo com 50+ hábitos.

**Concluído quando:**
- [x] A lista de features do MVP é menor do que o instinto queria.
- [x] Você escreveu como é o sucesso do MVP.
- [x] Features adiadas estão registradas para não se perderem.

---

### Fase 4: Escolher a stack

**Prompt:**

```
Com base no project-scope.md e no mvp.md, proponha uma stack. Minhas restrições
são: desenvolvedor solo, confortável com Python, roda apenas localmente, zero
orçamento de hospedagem, deve instalar com um comando. Para cada camada dê uma
recomendação primária e uma alternativa, com os trade-offs. Aponte o que é
difícil de mudar depois. Não encha a stack — menos partes móveis é melhor para
um MVP.
```

**Troca principal:**

> **Agente:** Para o banco de dados, recomendo um arquivo JSON em vez de SQLite.
> Motivos: usuário único, sem escritas concorrentes, legível por humanos para
> debug. SQLite é mais robusto mas não adiciona nenhum benefício de MVP para
> uma ferramenta local. O trade-off: JSON é mais difícil de consultar se você
> adicionar análises depois. Vale a pena?
>
> **Você:** Sim. Adicione um campo `version` para podermos migrar o formato
> se precisar.
>
> **Agente:** Boa decisão. Vou registrar o formato em disco como uma decisão
> difícil de reverter e documentar no `decisions.md`.

**`tech-stack.md` resultante:**

> **Restrições.** Desenvolvedor solo, confortável com Python · apenas local ·
> zero orçamento de hospedagem · instalação com um comando.
>
> | Camada | Escolha | Por quê | Alternativa considerada |
> |---|---|---|---|
> | Linguagem | Python 3.11+ | Linguagem principal | — |
> | Framework | `argparse` (stdlib) | Nenhum framework necessário para CLI | `click` — mais ergonômico mas uma dependência |
> | Banco de dados | Arquivo JSON (`~/.habit-cli/`) | Zero setup, legível por humanos | SQLite — mais robusto, sem benefício de MVP |
> | Distribuição | `pipx` | Instalação isolada, um comando | `pip` — mais simples mas polui o ambiente global |
> | Tooling | `ruff` + `pytest` | Lint e teste rápidos | — |
>
> **Difícil de reverter.** Formato de dados em disco. Escolhemos JSON com um
> campo `version` para que o formato possa ser migrado depois.
>
> **Deliberadamente deixado de fora.** Sem framework web · sem serviço de banco
> de dados · sem async · sem ORM.

**Entrada no `decisions.md` (primeira):**

> **2026-05-02 — Arquivo JSON como banco de dados**
> - **Contexto.** MVP é usuário único e apenas local; sem escritas concorrentes.
> - **Decisão.** Arquivo JSON em `~/.habit-cli/`, com um campo `version`.
> - **Por quê.** Zero infra, zero ops. SQLite considerado e rejeitado — sem
>   benefício de MVP. O campo `version` mantém a migração possível.
> - **Consequências.** Setup trivial; vai precisar de caminho de migração se
>   sincronização multi-usuário ou análises forem adicionadas.

**Concluído quando:**
- [x] Cada camada da stack tem uma opção escolhida e uma justificativa.
- [x] Escolhas difíceis de reverter foram identificadas e tomadas conscientemente.
- [x] Você consegue explicar a stack para alguém sem a ajuda do agente.

---

### Fase 5: Criar o plano de implementação

**Prompt:**

```
Crie um plano de implementação no implementation-plan.md. Divida o MVP em
tarefas pequenas — cada uma revisável em uma única sessão — e agrupe-as em
fases. Ordene-as para ter algo rodando de ponta a ponta o mais cedo possível,
e para que cada tarefa construa sobre código já funcionando. Marque dependências
entre tarefas. Cada tarefa deve ter um critério claro de "concluído quando".
```

**`implementation-plan.md` resultante:**

> **Fase A: Esqueleto**
>
> **A.1 — Entry point da CLI**
> - Tarefa. Criar o pacote, entry point e comandos stub (`adicionar`, `feito`,
>   `listar`) que fazem parsing dos argumentos e imprimem "não implementado".
> - Depende de: nenhuma
> - Concluído quando: `habito --help` e `habito adicionar foo` rodam sem erros.
>
> **A.2 — Load/save do store JSON**
> - Tarefa. Implementar `carregar_store()` e `salvar_store()` — criar o arquivo
>   na primeira execução, ler nas subsequentes.
> - Depende de: A.1
> - Concluído quando: `habito adicionar foo` cria `~/.habit-cli/dados.json`;
>   rodar novamente lê o mesmo arquivo.
>
> **Fase B: Features principais**
>
> **B.1 — `adicionar` persiste um hábito**
> - Tarefa. Conectar `adicionar <nome>` para armazenar o hábito no arquivo JSON.
> - Depende de: A.2
> - Concluído quando: `habito adicionar foo` seguido de `habito listar` mostra "foo".
>
> **B.2 — `feito` marca hoje**
> - Tarefa. Conectar `feito <nome>` para registrar a data de hoje para o hábito.
> - Depende de: B.1
> - Concluído quando: `habito feito foo` registra a data de hoje; rodar novamente
>   é idempotente.
>
> **B.3 — Cálculo de sequência**
> - Tarefa. Calcular a sequência atual a partir do log de datas.
> - Depende de: B.2
> - Concluído quando: sequência é 1 após o primeiro registro, 2 após um segundo
>   dia consecutivo; zera após um dia perdido.
>
> **B.4 — `listar` mostra sequências e status de hoje**
> - Tarefa. Imprimir cada hábito com sua contagem de sequência e se foi feito
>   hoje.
> - Depende de: B.3
> - Concluído quando: `habito listar` mostra nome, contagem de sequência e
>   "✓ feito" ou "○ pendente" para hoje.
>
> **Fase C: Polimento**
>
> **C.1 — Erros amigáveis**
> - Tarefa. Capturar store ausente ou corrompido; imprimir uma mensagem
>   legível por humanos em vez de um traceback bruto.
> - Depende de: A.2
> - Concluído quando: deletar o store e rodar `habito listar` dá uma mensagem
>   útil, não um crash.
>
> **C.2 — Texto de ajuda e README**
> - Tarefa. Preencher o texto `--help` para cada comando; escrever um README
>   cobrindo instalação e uso básico.
> - Depende de: B.4
> - Concluído quando: `habito --help` e `habito adicionar --help` são claros
>   para um novo usuário.

**Concluído quando:**
- [x] Nenhuma tarefa é grande demais para imaginar o diff.
- [x] A ordem produz algo rodando cedo, não apenas no final.
- [x] Cada tarefa tem um critério de conclusão verificável.

---

## Estágio 2 — Construir

### Fase 6: Configurar o projeto

**Prompt:**

```
Faça o scaffold do projeto conforme o tech-stack.md: estrutura de diretórios,
manifesto de dependências, linter/formatter, test runner, um entry point mínimo
que rode, e um .gitignore. Mantenha mínimo — sem features ainda. Depois crie o
AGENTS.md na raiz do repositório: uma visão geral curta do projeto, como rodar
e testar, as convenções de código que seguiremos, guardrails (o que nunca fazer
sem perguntar), e um mapa de onde cada artefato de planejamento fica.
```

**O que o agente estruturou:**

```
habito-cli/
  src/habito_cli/
    __init__.py
    cli.py          ← entry point; apenas comandos stub
    store.py        ← placeholder vazio
  tests/
    __init__.py
  pyproject.toml    ← instalável via pipx; ruff + pytest configurados
  .gitignore
  AGENTS.md
```

`habito --help` roda. `pytest` passa com zero testes. Primeiro commit feito.

**`AGENTS.md` resultante:**

> **Visão geral do projeto.** Um rastreador de hábitos por linha de comando
> para desenvolvedores. Usuários definem hábitos, registram diariamente e
> veem as sequências atuais. Usuário único, máquina única. Veja
> `docs/project-scope.md` para contexto completo.
>
> **Rodar e testar.**
> ```
> pipx install -e .        # instalar (modo dev)
> habito --help            # rodar
> pytest                   # testar
> ruff check src tests     # lint
> ruff format src tests    # formatar
> ```
>
> **Convenções.** Python 3.11+ com type hints em todo lugar · `ruff` para lint
> e format · mensagens de commit: modo imperativo, ≤72 chars · sem `print` em
> código de biblioteca (apenas em `cli.py`) · arquivos de teste espelham a
> estrutura de `src/`.
>
> **Guardrails.** Não adicionar dependências sem perguntar · não mudar o
> formato de dados em disco sem um plano de migração · não hardcodar caminhos
> de arquivo — roteie tudo pelo módulo store · não commitar sem uma execução
> de testes passando.
>
> **Mapa de artefatos.**
> - Escopo e requisitos — `docs/project-scope.md`
> - Definição do MVP — `docs/mvp.md`
> - Stack tecnológica — `docs/tech-stack.md`
> - Plano de implementação — `docs/implementation-plan.md`
> - Plano de testes — `docs/test-plan.md`
> - Deployment — `docs/deployment.md`
> - Log de decisões — `docs/decisions.md`

**Concluído quando:**
- [x] O esqueleto roda e o comando de teste passa (mesmo com zero testes reais).
- [x] O `AGENTS.md` existe e aponta para cada artefato de planejamento.
- [x] Tudo está commitado.

---

### Fase 7: O loop de build

Cada tarefa segue o mesmo loop de seis passos: **enquadrar → construir →
revisar → verificar → registrar → commitar.** Duas tarefas são mostradas
completas para ilustrar o ritmo.

---

**Tarefa A.1 — Entry point da CLI** *(uma passagem limpa e simples)*

*Enquadrar (prompt para o agente):*

```
Leia o AGENTS.md e o implementation-plan.md. Implemente a tarefa A.1: entry
point da CLI. Use apenas o contexto dos nossos artefatos — se algo não estiver
especificado, pergunte antes de assumir. Mantenha a mudança com escopo nesta
tarefa. Quando terminar, me diga como verificar e o que revisar.
```

*Construir:* Agente criou `cli.py` com três comandos stub e conectou o entry
point no `pyproject.toml`.

*Revisar:* Diff estava limpo e com escopo. Nada inesperado.

*Verificar:* `habito --help` ✓ · `habito adicionar foo` imprime "não implementado" ✓

*Registrar:* Sem desvios. Tarefa marcada no `implementation-plan.md`.

*Commitar:* `adiciona entry point da CLI com comandos stub (A.1)`

---

**Tarefa B.3 — Cálculo de sequência** *(a tarefa ilustrativa — bug capturado na revisão)*

*Enquadrar (prompt para o agente):*

```
Leia o AGENTS.md e o implementation-plan.md. Implemente a tarefa B.3: cálculo
de sequência. A regra: dias calendário consecutivos até e incluindo hoje contam
como a sequência; um dia perdido a zera. Um hábito registrado mais de uma vez
no mesmo dia é idempotente — não quebra a sequência. Use apenas o contexto dos
nossos artefatos. Me diga como verificar e o que revisar quando terminar.
```

*Construir:* Agente implementou `calcular_sequencia(datas: list[date]) -> int`.

*Revisar:* A lógica parecia certa numa leitura rápida. Mas rastreando a
aritmética de datas com cuidado — quando a mesma data aparecia duas vezes na
lista, a função a contava como dois dias consecutivos, quebrando a sequência.
Um bug que a clarificação da Fase 2 já havia descartado.

*Questionado:*

```
A lógica aqui conta uma data duplicada como dois dias separados —
o project-scope.md diz que registrar no mesmo dia é idempotente. Corrija.
```

*Agente corrigiu* deduplicando as datas antes de calcular a sequência.

*Verificar:* Chamou a função manualmente com inputs incluindo datas duplicadas.
Correto.

*Registrar:* Registrado no `decisions.md`:

> **2026-05-03 — Registrar um hábito duas vezes no mesmo dia é idempotente**
> - **Contexto.** Durante a revisão da B.3, a primeira implementação quebrava
>   sequências quando `feito` era rodado duas vezes no mesmo dia.
> - **Decisão.** Deduplicar datas antes de calcular a sequência; `feito` é
>   sempre seguro de rodar múltiplas vezes.
> - **Por quê.** Consistente com a clarificação da Fase 2. Uma quebra de
>   sequência por duplicata seria uma surpresa silenciosa para o usuário.
> - **Consequências.** Nenhum erro "já registrado" necessário; rodar `feito`
>   duas vezes não tem efeito.

Também atualizou o `project-scope.md` para tornar a regra de registro
idempotente explícita em vez de enterrada no histórico de clarificações.

*Commitar:* `implementa cálculo de sequência com registro idempotente (B.3)`

---

**Concluído quando (todas as tarefas completas):**
- [x] Cada tarefa do MVP no plano está marcada como concluída.
- [x] Cada tarefa foi revisada e commitada individualmente.
- [x] Os artefatos ainda correspondem ao que foi construído.

---

### Fase 8: Testar e verificar

**Prompt:**

```
Com base no mvp.md e no código que construímos, crie o test-plan.md: o que
testamos, em que nível, e quais fluxos de usuário são críticos. Depois escreva
testes para os critérios de sucesso do MVP e as áreas mais arriscadas primeiro.
Me diga o que você escolheu não testar e por quê.
```

**`test-plan.md` resultante:**

> **Estratégia.** Testar unitariamente a lógica de sequência com intensidade
> — é a parte mais arriscada. Um teste ponta a ponta por comando de CLI. Pular
> testar o `argparse` em si.
>
> **Fluxos críticos de usuário.** Adicionar um hábito e registrá-lo · ver
> sequências após múltiplos dias · verificar que a sequência zera após um dia
> perdido.
>
> **Cobertura por nível.**
>
> | Nível | O que cobre aqui | Prioridade |
> |---|---|---|
> | Unitário | `calcular_sequencia` — todos os casos extremos | Alta |
> | Integração | Roundtrip de load/save do store | Alta |
> | Ponta a ponta | Um teste por comando de CLI | Média |
>
> **Critérios de sucesso do MVP → testes.**
>
> | Critério (do mvp.md) | Coberto por |
> |---|---|
> | Sequência correta entre dias | `test_sequencia_entre_dias` |
> | Dados sobrevivem entre execuções | `test_store_roundtrip` |
> | Adicionar + registrar em menos de 10 segundos | apenas timing manual — não automatizado |
>
> **Deliberadamente não testado.** Wiring do `argparse` (nível de framework,
> não nossa lógica) · formatação exata do output do terminal (frágil, baixo
> valor para um MVP).

**O que os testes encontraram:** `test_sequencia_entre_dias` falhou — um erro
de off-by-one na aritmética de datas quando um mês vira (ex: 30 de abril → 1
de maio). Corrigido. Suite verde.

**Concluído quando:**
- [x] Cada critério de sucesso do `mvp.md` tem um teste ou uma razão
      documentada para não ter.
- [x] Os fluxos críticos de usuário estão cobertos ponta a ponta.
- [x] O suite completo passa.

---

## Estágio 3 — Lançar

### Fase 9: Revisar e fortalecer

**Prompt:**

```
Faça uma revisão pré-lançamento do código contra o mvp.md. Vá ângulo por
ângulo: segurança, casos extremos, tratamento de erros e documentação. Para
cada achado, classifique como bloqueador / deve-corrigir / seria-bom, e
explique o risco. Não corrija nada ainda — me dê a lista primeiro para eu
priorizar.
```

**Achados:**

> 1. **Bloqueador.** `~/.habit-cli/` não é criado na primeira execução —
>    `open()` vai crashar com `FileNotFoundError`. Correção: `mkdir -p` antes
>    da primeira escrita.
> 2. **Deve-corrigir.** Um arquivo JSON corrompido crasha com traceback bruto.
>    (Já tratado — C.1 está implementado. Confirmado na reverificação.)
> 3. **Seria-bom.** Sem flag `--versao`.
> 4. **Seria-bom.** Nomes de hábitos são case-sensitive (`"Correr"` ≠
>    `"correr"`) — não documentado em lugar nenhum.

**Priorização:** Corrigido o #1 (bloqueador). Confirmado que o #2 já estava
tratado. Registrado #3 e #4 no `decisions.md` como itens conhecidos e adiados.

**Concluído quando:**
- [x] Nenhum problema bloqueador conhecido permanece.
- [x] Secrets e configurações são tratados corretamente, não hardcoded.
- [x] Uma pessoa nova consegue clonar, rodar e entender o projeto pelo README.

---

### Fase 10: Fazer deploy

**Prompt:**

```
Com base no tech-stack.md, crie o deployment.md: ambiente alvo, processo
passo a passo de build e release, variáveis de ambiente necessárias e como
secrets são gerenciados, o procedimento de rollback, e os health checks que
confirmam um deploy bem-sucedido. Depois me ajude a automatizar o caminho de
release para que deploys futuros sejam repetíveis.
```

**`deployment.md` resultante:**

> **Ambiente alvo.** Máquina local. Distribuído via PyPI; instalado pelo
> usuário com `pipx`.
>
> **Processo de release.**
> 1. Incrementar versão no `pyproject.toml`.
> 2. Commitar e taguear: `git tag v0.1.0`.
> 3. Build: `python -m build`.
> 4. Publicar: `twine upload dist/*`.
> 5. Verificar em ambiente limpo: `pipx install habito-cli && habito --help`.
>
> **Variáveis de ambiente e secrets.** Nenhuma — ferramenta local, sem secrets.
>
> **Health check.** `pipx install habito-cli` funciona em ambiente limpo;
> `habito --help` imprime uso; `habito adicionar teste && habito feito teste
> && habito listar` mostra sequência de 1.
>
> **Rollback.** Yankar o release ruim do PyPI
> (`twine yank habito-cli 0.1.0`). A versão anterior continua instalável.

**Concluído quando:**
- [x] O produto é acessível pelos usuários pretendidos.
- [x] Fazer deploy novamente é um processo repetível, não improviso.
- [x] Você sabe como fazer rollback e como saber se está saudável.

---

### Fase 11: Iterar

**Prompt:**

```
Aqui está o feedback dos primeiros usuários: "quero poder remover hábitos que
abandonei" e "perdi um dia de registro — posso preencher retroativamente?"
Me ajude a priorizar em bugs, melhorias e novas features. Note o impacto para
o usuário e o esforço aproximado. Depois recomende no que a próxima iteração
deve focar, e quais artefatos precisam ser atualizados.
```

**Priorização:**

> - *"Remover hábitos"* — melhoria, já estava na lista de adiados. Esforço
>   pequeno, alto valor (reduz bagunça). Recomendado para a próxima iteração.
> - *"Preencher retroativamente"* — nova feature, explicitamente adiada.
>   Esforço médio. Precisa de escopo primeiro: até quando? Só ontem, ou qualquer
>   data? Não commitar para construir até essa questão estar respondida.

**Resultado:** `project-scope.md` atualizado — remover hábitos movido para a
lista de features; preenchimento retroativo movido para questões em aberto.
Loop volta para o Estágio 1 para a próxima iteração.

**Concluído quando:**
- [x] O feedback está priorizado, não numa pilha.
- [x] O foco da próxima iteração está decidido e com escopo.
- [x] O `project-scope.md` e a lista de adiados refletem a realidade atual.

---

## O `decisions.md` no final

Um log de decisões se acumula em todas as fases. Veja como ficou ao final
da primeira iteração:

> **2026-05-05 — Case-sensitivity em nomes de hábitos é conhecida mas adiada**
> - **Contexto.** Revisão da Fase 9 apontou que `"Correr"` e `"correr"` são
>   tratados como hábitos diferentes.
> - **Decisão.** Deixar por enquanto; documentar no README.
> - **Por quê.** Corrigir requer migração dos dados existentes. Baixo impacto
>   para um MVP com um usuário.
> - **Consequências.** Pode causar duplicatas confusas se usuários não forem
>   cuidadosos.
>
> **2026-05-04 — Diretório do store deve ser criado na primeira execução**
> - **Contexto.** Revisão da Fase 9 encontrou um bloqueador: `~/.habit-cli/`
>   não era criado automaticamente.
> - **Decisão.** `mkdir -p` no `salvar_store()` antes de cada escrita.
> - **Por quê.** Crash na primeira execução é inaceitável. Uma linha de código.
> - **Consequências.** Nenhuma — `mkdir -p` é idempotente.
>
> **2026-05-03 — Registrar um hábito duas vezes no mesmo dia é idempotente**
> - **Contexto.** Fase 7, revisão da B.3. Primeira implementação quebrava
>   sequências em registros duplicados no mesmo dia.
> - **Decisão.** Deduplicar datas antes do cálculo de sequência.
> - **Por quê.** Consistente com a clarificação da Fase 2. Quebra de sequência
>   por duplicata pareceria corrupção de dados para o usuário.
> - **Consequências.** `feito` é sempre seguro de rodar múltiplas vezes.
>
> **2026-05-02 — Arquivo JSON como banco de dados**
> - **Contexto.** Decisão de stack na Fase 4. MVP é usuário único, apenas local.
> - **Decisão.** Arquivo JSON em `~/.habit-cli/` com campo `version`.
> - **Por quê.** Zero infra, zero ops. SQLite sem benefício de MVP. Campo
>   `version` mantém migração possível.
> - **Consequências.** Setup trivial; caminho de migração necessário se
>   sincronização multi-usuário for escopo algum dia.

---

O ponto: cada decisão que poderia ter causado retrabalho — a ambiguidade do
"o que é um dia", o bug de registro idempotente, o diretório ausente do store,
o erro de off-by-one no virar do mês — foi capturada *porque* os artefatos
existiam e o agente tinha contexto para raciocinar contra eles. Os prompts
não são mágica; os artefatos são. É isso que resume o framework em uma frase.
