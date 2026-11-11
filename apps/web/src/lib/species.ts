import { speciesSchema, type Species } from '@aquario/engine';

const modules = import.meta.glob<{ default: unknown }>('../../../../data/species/*.json', {
  eager: true,
});

/** Todas as espécies de data/species, validadas no build. */
export const allSpecies: Species[] = Object.values(modules)
  .map((m) => speciesSchema.parse(m.default))
  .sort((a, b) => a.scientificName.localeCompare(b.scientificName));
