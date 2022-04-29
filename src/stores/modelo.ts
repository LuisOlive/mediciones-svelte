import { writable, derived } from 'svelte/store'
import { parse, derivative } from 'mathjs'
import type { Mediciones } from '../lib/core/tipos'
import mejoresValores from '../lib/core/mejoresValores'

export const control = writable({
  cuerpoStr: '',
  paramsStr: ''
})

export const parametros = derived(control, $modelo => $modelo.paramsStr.split(/,\s*/).filter(x => x))

export const expresion = derived(control, ({ cuerpoStr, paramsStr }) => `f(${paramsStr ?? ''}) = ${cuerpoStr ?? '0'}`)

export const modelo = derived(
  expresion,
  $expresion => {
    try {
      return parse($expresion)
    } catch {
      return parse('0')
    }
  },
  parse('0')
)

export default modelo

export const diff = derived(control, $control => (variable: string) => {
  try {
    return derivative($control.cuerpoStr, variable, { simplify: true })
  } catch {
    return parse('0')
  }
})

export const mediciones = writable<Mediciones>({})

export const mejores = derived(mediciones, $mediciones => {
  try {
    return mejoresValores($mediciones)
  } catch {
    return {}
  }
})

export const mejor = derived([mejores, control], ([$mejores, $control]) => {
  try {
    return parse($control.cuerpoStr).evaluate($mejores)
  } catch (e) {
    console.error(e)
    return 0
  }
})
