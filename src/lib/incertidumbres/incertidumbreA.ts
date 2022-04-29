import { incertidumbreA as tipoA } from '../core/estadistica'

export default function incertidumbreA(mediciones: { __incertidumbreA: () => number } | number[]): number {
  // @ts-ignore
  return mediciones?.__incertidumbreA?.() ?? tipoA(mediciones)
}
