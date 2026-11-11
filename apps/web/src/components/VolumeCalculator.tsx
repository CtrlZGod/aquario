import { useState } from 'react';
import { rectangularTankVolume, type TankVolume } from '@aquario/calc';

const FIELDS = [
  { key: 'length', label: 'Comprimento (cm)', initial: '60' },
  { key: 'width', label: 'Largura (cm)', initial: '30' },
  { key: 'height', label: 'Altura (cm)', initial: '30' },
  { key: 'glassMm', label: 'Espessura do vidro (mm)', initial: '5' },
  { key: 'waterGapCm', label: 'Folga da água ao topo (cm)', initial: '2' },
  { key: 'substrateCm', label: 'Altura do substrato (cm)', initial: '4' },
] as const;

type FieldKey = (typeof FIELDS)[number]['key'];
type Values = Record<FieldKey, string>;

const INITIAL = Object.fromEntries(FIELDS.map((f) => [f.key, f.initial])) as Values;

function compute(values: Values): TankVolume | undefined {
  const n = Object.fromEntries(
    FIELDS.map((f) => [f.key, Number(values[f.key].replace(',', '.'))]),
  ) as Record<FieldKey, number>;
  try {
    return rectangularTankVolume(n);
  } catch {
    return undefined;
  }
}

export default function VolumeCalculator() {
  const [values, setValues] = useState<Values>(INITIAL);
  const result = compute(values);

  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2">
      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        {FIELDS.map((f) => (
          <label key={f.key} className="block text-sm">
            <span className="text-slate-700">{f.label}</span>
            <input
              className="mt-1 block w-full rounded border border-slate-300 bg-white px-3 py-2"
              inputMode="decimal"
              value={values[f.key]}
              onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
            />
          </label>
        ))}
      </form>
      <div className="rounded border border-slate-200 bg-white p-4" aria-live="polite">
        {result ? (
          <dl className="space-y-3">
            <div>
              <dt className="text-sm text-slate-600">Volume bruto</dt>
              <dd className="text-2xl font-semibold">{result.grossLiters} L</dd>
            </div>
            <div>
              <dt className="text-sm text-slate-600">Volume de água estimado</dt>
              <dd className="text-2xl font-semibold">{result.waterLiters} L</dd>
            </div>
          </dl>
        ) : (
          <p className="text-sm text-red-700">Verifica as medidas introduzidas.</p>
        )}
      </div>
    </div>
  );
}
