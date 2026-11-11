import type { Range, Species } from './schema';

export type Severity = 'ok' | 'warning' | 'incompatible';

export type WaterParameter = 'temperatureC' | 'ph' | 'ghDegrees';

export interface Finding {
  /** Identificador estável da regra, para testes e tradução na UI. */
  rule: `water.${WaterParameter}`;
  severity: Severity;
  /** Espécies envolvidas (ids). */
  species: string[];
  /** Intervalo comum, quando existe. */
  commonRange?: Range;
}

export interface CompatibilityResult {
  severity: Severity;
  findings: Finding[];
}

/** Margens abaixo das quais um intervalo comum é considerado demasiado estreito. */
const NARROW_MARGIN: Record<WaterParameter, number> = {
  temperatureC: 1,
  ph: 0.3,
  ghDegrees: 1,
};

const PARAMETERS: WaterParameter[] = ['temperatureC', 'ph', 'ghDegrees'];

const SEVERITY_ORDER: Record<Severity, number> = { ok: 0, warning: 1, incompatible: 2 };

/** Interseção de intervalos fechados; undefined se não se sobrepõem. */
export function intersectRanges(ranges: Range[]): Range | undefined {
  if (ranges.length === 0) return undefined;
  const min = Math.max(...ranges.map((r) => r.min));
  const max = Math.min(...ranges.map((r) => r.max));
  return min <= max ? { min, max } : undefined;
}

/**
 * Avalia a compatibilidade de um conjunto de espécies.
 * v0: apenas interseção das gamas de água (temperatura, pH, GH).
 */
export function checkCompatibility(species: Species[]): CompatibilityResult {
  const ids = species.map((s) => s.id);
  const findings: Finding[] = [];

  if (species.length >= 2) {
    for (const parameter of PARAMETERS) {
      const common = intersectRanges(species.map((s) => s.water[parameter]));
      if (!common) {
        findings.push({ rule: `water.${parameter}`, severity: 'incompatible', species: ids });
      } else {
        const narrow = common.max - common.min < NARROW_MARGIN[parameter];
        findings.push({
          rule: `water.${parameter}`,
          severity: narrow ? 'warning' : 'ok',
          species: ids,
          commonRange: common,
        });
      }
    }
  }

  const severity = findings.reduce<Severity>(
    (worst, f) => (SEVERITY_ORDER[f.severity] > SEVERITY_ORDER[worst] ? f.severity : worst),
    'ok',
  );
  return { severity, findings };
}
