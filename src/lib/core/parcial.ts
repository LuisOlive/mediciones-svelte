import type { Mensurando, Valores } from './tipos'

export default function parcial(f: Mensurando, variable: string, h = 1e-9) {
  return f.__parcial?.(variable) ?? ((x: Valores) => (f({ ...x, [variable]: x[variable] + h }) - f(x)) / h)
}
