<script lang="ts">
  import { medicionesRepetidas } from '../../lib/core/fuentesIncertidumbre'

  import Aparato from '../../lib/aparatos/Aparato'
  import { dump } from '../../lib/utils/notacionIngenieria'
  import InputMediciones from './InputMediciones.svelte'
  import Input from './Input.svelte'
  import type { Medicion } from '../../lib/core/tipos'

  let a: number
  let b: number
  let k: number
  let lecturas: number[] = [0, 0]
  let mejorEstimacion: number

  export let medicion: Medicion

  $: aparato = new Aparato(k, a, b)
  $: medicion = medicionesRepetidas(aparato, ...lecturas)
</script>

<div class="card row m-0 py-3 flex-row">
  <div class="col-lg-6">
    <InputMediciones bind:lecturas bind:mejorEstimacion />
  </div>

  <div class="col-lg-6">
    <Input bind:value={a}>Porcentaje de la lectura</Input>
    <Input bind:value={k}>k veces la resolucion</Input>
    <Input bind:value={b}>Resolucion</Input>

    <div class="alert alert-info mt-3">
      <b>Exactitud (símbolo):</b> ({a}%)({mejorEstimacion}) + ({k})({dump(b)}) <br />

      <b>Exactitud:</b>
      {dump(aparato.exactitud(mejorEstimacion))} <br />

      <b>Incertidumbre tipo B:</b>
      {dump(medicion.tipoB)} <br />
    </div>
  </div>
</div>
