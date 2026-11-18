# Plano de Testes

<!--
  Escrito na Fase 6 (/pdev-plan) junto com o plano de implementação — ANTES
  de qualquer código. Define como o agente prova que seu trabalho está pronto.
  Estendido na Fase 9 (/pdev-harden) com cobertura de ponta a ponta.
  Veja FRAMEWORK.md → Fase 6 e 9.
-->

## Estratégia

<!-- Quanto teste é suficiente para este MVP, e por quê? Seja explícito.
     "Buscar 100% de cobertura" não é uma estratégia; "todo critério de
     sucesso e toda área arriscada têm uma verificação automatizada" é. -->

## Gates

<!-- Os comandos que toda mudança precisa passar. Eles vão para a "Definição
     de pronto" do AGENTS.md e para o CI na Fase 7. -->

| Gate | Comando |
|------|---------|
| Testes | |
| Lint / formatação | |
| Type check | |

## Critérios de sucesso do MVP → verificações

<!-- Mapeie cada critério de sucesso do mvp.md para a(s) verificação(ões) de
     aceite de tarefa que o provam. Um critério sem verificação é uma lacuna —
     preencha, ou marque como manual e diga como vai ser verificado. -->

| Critério de sucesso (do mvp.md) | Provado por (tarefa / teste) | Automatizado? |
|---------------------------------|------------------------------|---------------|
| | | |

## Fluxos críticos de usuário

<!-- Os fluxos que nunca podem quebrar. Eles recebem testes de ponta a ponta,
     no máximo na Fase 9. -->

-

## Cobertura por nível

| Nível | O que cobre aqui | Prioridade |
|-------|------------------|------------|
| Unitário | <!-- lógica, casos extremos --> | |
| Integração | <!-- componentes funcionando juntos --> | |
| Ponta a ponta | <!-- fluxos críticos acima --> | |

## Deliberadamente não testado

<!-- O que você escolheu deixar sem teste, e o raciocínio. Honestidade aqui
     vale mais que um número de cobertura enganoso. -->

-
