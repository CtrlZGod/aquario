export interface TankDimensionsCm {
  /** Comprimento exterior, em cm. */
  length: number;
  /** Largura (profundidade frente-trás) exterior, em cm. */
  width: number;
  /** Altura exterior, em cm. */
  height: number;
  /** Espessura do vidro, em mm. Por omissão 0 (usa medidas como interiores). */
  glassMm?: number;
  /** Distância da superfície da água ao topo do vidro, em cm. */
  waterGapCm?: number;
  /** Altura média do substrato, em cm. */
  substrateCm?: number;
}

export interface TankVolume {
  /** Volume bruto pelas medidas exteriores, em litros. */
  grossLiters: number;
  /** Volume de água estimado, em litros. */
  waterLiters: number;
}

function assertPositive(name: string, value: number): void {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${name} tem de ser um número positivo`);
  }
}

/** Volume de um aquário retangular. 1 litro = 1000 cm³. */
export function rectangularTankVolume(d: TankDimensionsCm): TankVolume {
  assertPositive('length', d.length);
  assertPositive('width', d.width);
  assertPositive('height', d.height);

  const glassCm = (d.glassMm ?? 0) / 10;
  const innerLength = d.length - 2 * glassCm;
  const innerWidth = d.width - 2 * glassCm;
  // O fundo também é vidro; desconta-se uma espessura na altura.
  const waterHeight = d.height - glassCm - (d.waterGapCm ?? 0) - (d.substrateCm ?? 0);

  if (innerLength <= 0 || innerWidth <= 0 || waterHeight <= 0) {
    throw new RangeError('As deduções excedem as dimensões do aquário');
  }

  return {
    grossLiters: round1((d.length * d.width * d.height) / 1000),
    waterLiters: round1((innerLength * innerWidth * waterHeight) / 1000),
  };
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}
