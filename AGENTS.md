# Guia para agentes e contribuidores

Lê este ficheiro antes de alterar o repositório. Contexto adicional: `docs/decisions.md` (porquê
das decisões) e `docs/roadmap.md` (estado e próximos passos).

## O que é

Site de ferramentas de aquariofilia em português (pt-PT, com nomes comuns pt-BR): calculadoras e
verificação de compatibilidade entre espécies. Mais tarde, diário de aquário (PWA com contas).
Nome `aquario` é provisório.

## Stack

- TypeScript em tudo. pnpm workspaces. Node conforme `.nvmrc`.
- `apps/web`: Astro (saída estática) com ilhas React e Tailwind CSS v4.
- `packages/engine`: motor de compatibilidades e esquema Zod das espécies. TS puro, sem UI.
- `packages/calc`: fórmulas das calculadoras. TS puro, sem UI.
- `data/species`: um ficheiro JSON por espécie.
- Testes com Vitest. ESLint e Prettier decidem o estilo.
- TypeScript está fixado na v6: `astro check` e `typescript-eslint` ainda não suportam a v7.

## Comandos

| Comando       | Função                                                 |
| ------------- | ------------------------------------------------------ |
| `pnpm dev`    | Servidor de desenvolvimento do site                    |
| `pnpm check`  | Formatação, lint, typecheck e testes (inclui os dados) |
| `pnpm build`  | Build de produção do site                              |
| `pnpm format` | Formata tudo com Prettier                              |

`pnpm check` e `pnpm build` têm de passar antes de qualquer commit. O CI corre os dois.

## Regras

1. A lógica vive em `packages/`, com testes. Os componentes em `apps/web` só apresentam.
2. A compatibilidade é **calculada por regras** a partir dos atributos das espécies. Não criar
   matrizes espécie × espécie. Casos especiais vão para `data/overrides`.
3. Cada regra do motor tem um identificador estável (`water.ph`, …) e devolve o motivo. A UI
   traduz o identificador; o motor não devolve texto.
4. Dados de espécies: o `id` é igual ao nome do ficheiro. Não copiar fichas de outros sites nem
   usar fontes com licença não-comercial. `reviewed: true` só com fonte em `sources`.
5. Alterar o esquema (`packages/engine/src/schema.ts`) implica atualizar todos os JSON, os testes
   e registar a alteração em `docs/decisions.md`.
6. Não adicionar dependências sem necessidade; registar as estruturais em `docs/decisions.md`.
7. Texto da interface em pt-PT. Código, identificadores e commits em inglês; comentários podem
   ser em português.
8. Um branch e um pull request por funcionalidade, com commits pequenos.
9. No fim de cada sessão de trabalho, atualizar `docs/roadmap.md`.
