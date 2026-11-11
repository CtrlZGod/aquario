# Roadmap

Atualizar no fim de cada sessão de trabalho.

## Feito

- Monorepo, tooling (ESLint, Prettier, Vitest, CI) e documentação para agentes.
- `@aquario/calc`: volume de aquário retangular.
- `@aquario/engine` v0: esquema das espécies (só parâmetros de água) e regra de interseção de
  gamas de temperatura, pH e GH.
- Site: página inicial, calculadora de volume, página de compatibilidade.
- 3 espécies de exemplo em `data/species`, **não revistas** (`reviewed: false`).

## A seguir (por ordem)

1. Fechar o esquema completo das espécies: tamanho adulto, volume e comprimento mínimos, zona,
   temperamento, cardume mínimo, flags (morde barbatanas, barbatanas longas, predador, come
   plantas, escava, come invertebrados), atributos de plantas (luz, CO2).
2. Regras do motor, uma de cada vez e com testes: predação, temperamento, barbatanas, plantas,
   aquário (volume, cardume, zonas).
3. Formato de `data/overrides` e respetiva regra.
4. Rever os dados de exemplo com fontes e curar até 50–100 espécies e 30–40 plantas.
5. Páginas geradas por espécie e por par de espécies.
6. Mais calculadoras: dosagem de fertilizantes, mistura de água de osmose, potência de aquecedor.
7. Nome definitivo, domínio e deploy (Cloudflare Pages).
8. Analytics sem cookies; links de afiliado com aviso.

## Mais tarde

- v2: contas, diário de parâmetros, gráficos, lembretes por Web Push (ver decisão 006).
- v3: sonda ESP32 a enviar leituras para a app.

## Em aberto

- Nome e domínio.
- Supabase ou backend próprio na v2.
