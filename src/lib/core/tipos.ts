export type Valores = { [key: string]: number }

/** Una función que recibe un objeto de números y devuelve el reultado físico de las variables*/
export type Mensurando = ((_: Valores) => number) & {
  /** @deprecated utiliza __parcial() en su lugar*/
  __parciales?: { [key: string]: Mensurando }

  __parcial?: (key: string) => Mensurando
}

export interface Medicion {
  tipoA: number
  tipoB: number
  mejor: number
  gradosLibertadA: number
  gradosLibertadB: number
}

export type Mediciones = { [key: string]: Medicion }

export interface IAparato {
  exactitud: (lectura: number) => number

  /** @deprecated utiliza __parcial() en su lugar */
  tipoB: (lectura: number) => number

  __incertidumbreB?: (lectura: number) => number
}
