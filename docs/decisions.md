# Decisões

Uma entrada por decisão estrutural: o que se decidiu e porquê. Acrescentar no fim; não reescrever
entradas antigas — se uma decisão mudar, criar uma nova que a substitui.

## 001 — Site estático com Astro e ilhas React (2026-11-11)

O tráfego esperado vem de pesquisa (calculadoras, páginas por espécie e por par de espécies), por
isso o HTML é gerado no build. React só nos componentes interativos; foi preferido a Svelte por
pesar mais no portfolio.

## 002 — TypeScript em tudo, monorepo pnpm (2026-11-11)

Um só idioma para site, motor e (mais tarde) backend, com tipos partilhados. A lógica fica em
pacotes sem dependências de UI para ser testável e reutilizável no cliente e no servidor.

## 003 — Compatibilidade calculada por regras (2026-11-11)

Uma matriz manual espécie × espécie não escala (100 espécies ≈ 5000 pares). Guardam-se atributos
por espécie e as regras calculam o resultado, sempre com o motivo. Exceções pontuais ficam numa
tabela de overrides.

## 004 — Dados em JSON no repositório, validados com Zod (2026-11-11)

Sem base de dados na v1. Os dados ficam versionados em git e são validados nos testes e no build.
Curadoria manual: não se conhece uma fonte aberta com licença compatível com uso comercial.

## 005 — TypeScript fixado na v6 (2026-11-11)

`astro check` e `typescript-eslint` recusam o TypeScript 7. Rever quando ambos o suportarem.

## 006 — Planeado para a v2: Supabase (2026-11-11)

Postgres, autenticação e row-level security para o diário de aquário, com endpoints do próprio
Astro. Ainda não implementado; rever se o objetivo passar a ser mostrar um backend próprio.

## 007 — Sem dependência de um agente ou fornecedor específico (2026-11-11)

O contexto do projeto vive em `AGENTS.md` e `docs/`. Ficheiros específicos de uma ferramenta
(`CLAUDE.md`, etc.) apenas apontam para `AGENTS.md`.
