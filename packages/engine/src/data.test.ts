import { readdirSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { speciesSchema } from './schema';

const dir = fileURLToPath(new URL('../../../data/species/', import.meta.url));
const files = readdirSync(dir).filter((f) => f.endsWith('.json'));

describe('data/species', () => {
  it('tem pelo menos uma espécie', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)('%s cumpre o esquema e o id coincide com o ficheiro', (file) => {
    const raw: unknown = JSON.parse(readFileSync(join(dir, file), 'utf8'));
    const species = speciesSchema.parse(raw);
    expect(species.id).toBe(basename(file, '.json'));
  });
});
