# aquario (nome provisório)

Ferramentas de aquariofilia em português: calculadoras e compatibilidade de espécies.

## Desenvolvimento

Requisitos: Node (ver `.nvmrc`) e pnpm.

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm check    # formatação, lint, typecheck, testes
pnpm build
```

## Estrutura

```
apps/web          site Astro (páginas e componentes)
packages/engine   motor de compatibilidades e esquema das espécies
packages/calc     fórmulas das calculadoras
data/species      uma espécie por ficheiro JSON
docs              decisões e roadmap
```

Convenções e contexto para quem contribui (pessoas ou agentes): [AGENTS.md](AGENTS.md).
