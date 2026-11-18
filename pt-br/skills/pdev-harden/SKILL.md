---
name: pdev-harden
description: Fase 9 do framework pdev — verificar os fluxos críticos de ponta a ponta, fazer uma revisão adversarial pré-lançamento e priorizar os achados.
disable-model-invocation: true
---

# Fase 9 — Verificar e reforçar

Leia o `AGENTS.md`, o `docs/mvp.md` e o `docs/test-plan.md`.

## 1. Verificar

- Confirme que todo fluxo crítico de usuário do `docs/test-plan.md` tem um
  teste de ponta a ponta e que ele passa. Escreva os que faltarem.
- Depois use o produto como um usuário novo usaria — conduza-o você mesmo se
  conseguir (CLI, navegador, API) — seguindo cada critério de sucesso do MVP,
  incluindo os manuais. Reporte qualquer coisa surpreendente, mesmo que nenhum
  teste falhe.
- Me dê os passos exatos para eu mesmo experimentar os fluxos críticos.

## 2. Reforçar

Revise a base de código como um adversário que não a escreveu. Se você tiver
uma ferramenta dedicada de revisão de segurança ou um agente revisor separado,
use. Vá ângulo por ângulo:

- **Segurança** — tratamento de segredos, validação de input, authn/authz,
  riscos de dependências.
- **Casos extremos** — estados vazios, inputs grandes, uso concorrente, falha
  de rede.
- **Tratamento de erros** — falha de forma clara e recuperável, ou silenciosa
  e ruim?
- **Documentação** — uma pessoa nova consegue clonar, rodar e entender pelo
  README? O `AGENTS.md` ainda está correto?

Classifique cada achado como **bloqueador / deveria corrigir / seria bom ter**
e explique o risco. **Não corrija nada ainda** — me dê a lista para eu
priorizar.

## 3. Corrigir

Depois que eu priorizar: corrija os bloqueadores (e o que mais eu escolher),
cada um com um teste de regressão, rodando todos os gates de novo. Registre o
que adiamos no `docs/decisions.md`.

## Concluído quando

- [ ] Todo fluxo crítico passa de ponta a ponta, e eu mesmo usei o produto.
- [ ] Não restam bloqueadores conhecidos, e cada correção tem um teste de
      regressão.
- [ ] Segredos e configurações estão tratados corretamente, não hard-coded.
- [ ] Uma pessoa nova conseguiria clonar, rodar e entender o projeto pelo README.

Termine verificando estes itens e me dizendo o próximo passo: `/pdev-deploy`.
