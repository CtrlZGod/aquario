import { useState } from 'react';
import { checkCompatibility, type Finding, type Severity, type Species } from '@aquario/engine';

const SEVERITY_LABEL: Record<Severity, string> = {
  ok: 'Compatível',
  warning: 'Com reservas',
  incompatible: 'Incompatível',
};

const SEVERITY_CLASS: Record<Severity, string> = {
  ok: 'text-emerald-700',
  warning: 'text-amber-700',
  incompatible: 'text-red-700',
};

const RULE_LABEL: Record<Finding['rule'], { name: string; unit: string }> = {
  'water.temperatureC': { name: 'Temperatura', unit: '°C' },
  'water.ph': { name: 'pH', unit: '' },
  'water.ghDegrees': { name: 'Dureza (GH)', unit: '°dGH' },
};

function describe(finding: Finding): string {
  const { name, unit } = RULE_LABEL[finding.rule];
  if (!finding.commonRange) return `${name}: sem gama comum`;
  const { min, max } = finding.commonRange;
  const range = `${min}–${max}${unit ? ` ${unit}` : ''}`;
  return finding.severity === 'warning'
    ? `${name}: gama comum muito estreita (${range})`
    : `${name}: gama comum ${range}`;
}

export default function CompatibilityChecker({ species }: { species: Species[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const chosen = species.filter((s) => selected.includes(s.id));
  const result = checkCompatibility(chosen);

  function toggle(id: string) {
    setSelected((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
    );
  }

  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2">
      <fieldset className="space-y-2">
        <legend className="text-sm text-slate-700">Espécies</legend>
        {species.map((s) => (
          <label key={s.id} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selected.includes(s.id)}
              onChange={() => toggle(s.id)}
            />
            <span>
              {s.commonNames['pt-PT'][0]} <em className="text-slate-500">({s.scientificName})</em>
            </span>
          </label>
        ))}
      </fieldset>
      <div className="rounded border border-slate-200 bg-white p-4" aria-live="polite">
        {chosen.length < 2 ? (
          <p className="text-sm text-slate-600">Escolhe pelo menos duas espécies.</p>
        ) : (
          <>
            <p className={`text-lg font-semibold ${SEVERITY_CLASS[result.severity]}`}>
              {SEVERITY_LABEL[result.severity]}
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              {result.findings.map((f) => (
                <li key={f.rule} className={SEVERITY_CLASS[f.severity]}>
                  {describe(f)}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
