import type { Mediciones, Mensurando, Valores } from './tipos'
import parcial from './parcial'

export default function contribuciones(mensurando: Mensurando, mediciones: Mediciones, mejor: Valores): number[] {
  const ans = []

  for (const [variable, x] of Object.entries(mediciones)) {
    try {
      if (!x) continue

      const df = parcial(mensurando, variable)
      const { tipoA, tipoB } = x
      const y = df(mejor)

      if (tipoA) {
        ans.push(tipoA ** 2 * y ** 2)
      }

      if (tipoB) {
        ans.push(tipoB ** 2 * y ** 2)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return ans
}

export function contribucionesExpandidas(mensurando: Mensurando, mediciones: Mediciones, mejor: Valores): number[] {
  const ans = []

  for (const [variable, x] of Object.entries(mediciones)) {
    try {
      if (!x) continue

      const df = parcial(mensurando, variable)
      const { tipoA, tipoB, gradosLibertadA, gradosLibertadB } = x
      const y = df(mejor)

      if (tipoA) {
        ans.push((tipoA * y) ** 4 / gradosLibertadA)
      }

      if (tipoB) {
        ans.push((tipoB * y) ** 4 / gradosLibertadB)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return ans
}
