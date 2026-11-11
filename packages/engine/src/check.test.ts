import { describe, expect, it } from 'vitest';
import { checkCompatibility, intersectRanges } from './check';
import { speciesSchema, type Species } from './schema';

function make(
  id: string,
  t: [number, number],
  ph: [number, number],
  gh: [number, number],
): Species {
  return speciesSchema.parse({
    id,
    kind: 'fish',
    scientificName: id,
    commonNames: { 'pt-PT': [id] },
    water: {
      temperatureC: { min: t[0], max: t[1] },
      ph: { min: ph[0], max: ph[1] },
      ghDegrees: { min: gh[0], max: gh[1] },
    },
  });
}

describe('intersectRanges', () => {
  it('devolve o intervalo comum', () => {
    expect(
      intersectRanges([
        { min: 20, max: 26 },
        { min: 24, max: 30 },
      ]),
    ).toEqual({ min: 24, max: 26 });
  });

  it('devolve undefined sem sobreposição', () => {
    expect(
      intersectRanges([
        { min: 18, max: 22 },
        { min: 24, max: 30 },
      ]),
    ).toBeUndefined();
  });
});

describe('checkCompatibility', () => {
  const a = make('a', [22, 26], [6, 7.5], [2, 12]);
  const b = make('b', [24, 28], [6.5, 7.5], [4, 15]);
  const cold = make('cold', [15, 21], [7, 8], [8, 20]);
  const edge = make('edge', [26, 30], [6, 7.5], [2, 12]);

  it('é ok com uma só espécie', () => {
    expect(checkCompatibility([a])).toEqual({ severity: 'ok', findings: [] });
  });

  it('é ok quando todas as gamas se sobrepõem e indica a gama comum', () => {
    const result = checkCompatibility([a, b]);
    expect(result.severity).toBe('ok');
    expect(result.findings.find((f) => f.rule === 'water.temperatureC')?.commonRange).toEqual({
      min: 24,
      max: 26,
    });
  });

  it('é incompatível quando a temperatura não se sobrepõe', () => {
    const result = checkCompatibility([a, cold]);
    expect(result.severity).toBe('incompatible');
    expect(result.findings.find((f) => f.rule === 'water.temperatureC')?.severity).toBe(
      'incompatible',
    );
  });

  it('avisa quando a gama comum é demasiado estreita', () => {
    const result = checkCompatibility([a, edge]);
    expect(result.severity).toBe('warning');
  });
});
