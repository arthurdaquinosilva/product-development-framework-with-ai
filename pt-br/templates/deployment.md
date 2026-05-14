# Deployment

<!--
  Fase 10 do framework. O objetivo é um release REPETÍVEL, não único.
  Se um passo existe apenas na sua cabeça, não está feito.
  Veja FRAMEWORK.md → Fase 10.
-->

## Ambiente alvo

<!-- Onde isso roda em produção: plataforma/host, região, versões de runtime,
     serviços gerenciados dos quais depende. -->

## Processo de release

<!-- Passo a passo, de um commit a um release em produção. Numerado. Se for
     automatizado (CI/CD), descreva o pipeline e o que o dispara. -->

1.

## Variáveis de ambiente e secrets

<!-- Qual configuração o app precisa em produção, e como os secrets são
     armazenados e injetados. Nunca commite valores reais — liste apenas os
     nomes. -->

| Variável | Propósito | Onde é definida |
|----------|-----------|-----------------|
| | | |

## Health checks

<!-- Como você confirma que um deploy foi bem-sucedido: o endpoint/comando/
     sinal a verificar, e como é um resultado saudável. -->

-

## Rollback

<!-- Exatamente como voltar para o último estado conhecido-bom, e quão rápido
     pode ser feito. Escreva isso ANTES de precisar. -->

1.

## Riscos operacionais conhecidos

<!-- O que pode dar errado em produção, e o plano se acontecer. -->

-
