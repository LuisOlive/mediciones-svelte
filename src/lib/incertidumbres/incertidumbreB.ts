import type { IAparato } from '../core/tipos'

export default function incertidumbreB(aparato: IAparato, lectura: number) {
  return aparato.__incertidumbreB?.(lectura) ?? aparato.exactitud(lectura) / Math.sqrt(3)
}
