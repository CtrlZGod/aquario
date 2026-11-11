import { describe, expect, it } from 'vitest';
import { rectangularTankVolume } from './volume';

describe('rectangularTankVolume', () => {
  it('calcula o volume bruto', () => {
    const v = rectangularTankVolume({ length: 60, width: 30, height: 30 });
    expect(v.grossLiters).toBe(54);
    expect(v.waterLiters).toBe(54);
  });

  it('desconta vidro, folga de água e substrato', () => {
    const v = rectangularTankVolume({
      length: 60,
      width: 30,
      height: 30,
      glassMm: 5,
      waterGapCm: 2,
      substrateCm: 4,
    });
    // (60-1) * (30-1) * (30-0.5-2-4) / 1000 = 40.2
    expect(v.waterLiters).toBe(40.2);
  });

  it('rejeita dimensões inválidas', () => {
    expect(() => rectangularTankVolume({ length: 0, width: 30, height: 30 })).toThrow(RangeError);
    expect(() =>
      rectangularTankVolume({ length: 60, width: 30, height: 30, substrateCm: 40 }),
    ).toThrow(RangeError);
  });
});
