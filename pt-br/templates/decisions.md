# Log de Decisões

<!--
  Um log contínuo, atualizado em todas as fases do framework. Capture decisões
  que foram não-óbvias ou difíceis de reverter — aquelas que o você do futuro
  (ou o agente) de outra forma teria que reverter-engenheirar. Entrada mais
  recente no topo. Estilo ADR simplificado.
  Veja FRAMEWORK.md → Princípios transversais.
-->

## AAAA-MM-DD — <!-- título curto da decisão -->

- **Contexto.** <!-- qual situação forçou uma decisão -->
- **Decisão.** <!-- o que escolhemos -->
- **Por quê.** <!-- o raciocínio, e a principal alternativa rejeitada -->
- **Consequências.** <!-- o que isso facilita, dificulta ou nos prende -->

---

<!-- Copie o bloco acima para cada nova decisão. Exemplo:

## 2026-05-14 — Usar SQLite como banco de dados do MVP

- **Contexto.** MVP é single-user e roda localmente; sem escritas concorrentes.
- **Decisão.** SQLite, com uma camada fina de acesso a dados para permitir troca depois.
- **Por quê.** Zero infra, zero ops. Postgres era a alternativa mas adiciona um serviço
  para rodar sem benefício para o MVP. A camada de acesso a dados mantém a porta aberta.
- **Consequências.** Setup local trivial; vai precisar de um caminho de migração se
  adicionarmos sincronização multi-usuário (candidato conhecido para a Fase 11).

-->
