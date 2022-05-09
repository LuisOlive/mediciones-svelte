import { IAparato } from '../core/tipos'

export default class CA865 implements IAparato {
  exactitud() {
    return 0.5
  }

  tipoB() {
    return this.exactitud() / Math.sqrt(3)
  }
}
