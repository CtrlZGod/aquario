import { z } from 'zod';

/** Intervalo fechado [min, max]. */
export const rangeSchema = z
  .object({ min: z.number(), max: z.number() })
  .refine((r) => r.min <= r.max, { message: 'min tem de ser <= max' });
export type Range = z.infer<typeof rangeSchema>;

/**
 * Esquema v0 de uma espécie. Só cobre os parâmetros de água.
 * Os restantes atributos (tamanho, temperamento, flags, plantas) entram
 * com as regras correspondentes — ver docs/roadmap.md.
 */
export const speciesSchema = z.object({
  /** Identificador estável, igual ao nome do ficheiro (kebab-case). */
  id: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  kind: z.enum(['fish', 'invertebrate', 'plant']),
  scientificName: z.string().min(1),
  commonNames: z.object({
    'pt-PT': z.array(z.string().min(1)).min(1),
    'pt-BR': z.array(z.string().min(1)).default([]),
  }),
  water: z.object({
    /** Temperatura em °C. */
    temperatureC: rangeSchema,
    ph: rangeSchema,
    /** Dureza geral em °dGH. */
    ghDegrees: rangeSchema,
  }),
  /** false enquanto os valores não forem confirmados numa fonte citada. */
  reviewed: z.boolean().default(false),
  sources: z.array(z.string().min(1)).default([]),
});
export type Species = z.infer<typeof speciesSchema>;
