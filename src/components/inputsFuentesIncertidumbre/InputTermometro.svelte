<script lang="ts">
  import { medicionesRepetidas } from '../../lib/core/fuentesIncertidumbre'
  import Termometro from '../../lib/aparatos/TermometroCA865'
  import { dump } from '../../lib/utils/notacionIngenieria'
  import InputMediciones from './InputMediciones.svelte'
  import type { Medicion } from '../../lib/core/tipos'

  const termometro = new Termometro()
  const a = termometro.exactitud()

  let lecturas: number[] = [0]

  export let medicion: Medicion
  $: medicion = medicionesRepetidas(termometro, ...lecturas)
</script>

<div class="card row m-0 py-3 flex-row">
  <div class="col-lg-6">
    <InputMediciones bind:lecturas />
  </div>

  <div class="col-lg-6">
    <div class="alert alert-warning mt-3">
      <b>Exactitud:</b> ±{a} ºC <br />
      <b>Incertidumbre tipo B:</b>
      {dump(medicion.tipoB)} ºC<br />
    </div>
  </div>
</div>
