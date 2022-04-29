import type { IAparato, Medicion } from './tipos'

import { media, gradosLibertad, porcentajeDe, RAIZ_3 } from './estadistica'

import incertidumbreA from '../incertidumbres/incertidumbreA'
import incertidumbreB from '../incertidumbres/incertidumbreB'

const gradosLibertadA = 1
const gradosLibertadB = 8
const tipoA = 0
const tipoB = 0

export function medicionesRepetidas(aparato: IAparato, ...lecturas: number[]): Medicion {
  const mejor = media(lecturas)
  const tipoA = incertidumbreA(lecturas)
  const tipoB = incertidumbreB(aparato, mejor)
  const gradosLibertadA = gradosLibertad(lecturas)

  return { tipoA, tipoB, mejor, gradosLibertadA, gradosLibertadB }
}

export function constanteFisica(mejor: number, porcentajeTolerancia = 1): Medicion {
  const tipoB = porcentajeDe(mejor, porcentajeTolerancia) / RAIZ_3

  return { mejor, tipoA, tipoB, gradosLibertadA, gradosLibertadB }
}

export function exactamente(mejor: number): Medicion {
  return { mejor, tipoA, tipoB, gradosLibertadA, gradosLibertadB }
}
