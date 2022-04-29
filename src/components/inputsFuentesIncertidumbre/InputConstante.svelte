<script lang="ts">
  import { dump } from '../../lib/utils/notacionIngenieria'
  import { constanteFisica } from '../../lib/core/fuentesIncertidumbre'
  import Input from './Input.svelte'
  import type { Medicion } from '../../lib/core/tipos'

  let value: number
  let tol: number = 1

  export let medicion: Medicion
  $: medicion = constanteFisica(value, tol)
</script>

<div class="card row m-0 py-3 flex-row">
  <div class="col-lg-3">
    <Input bind:value>Valor de la constante fisica</Input>
  </div>

  <div class="col-lg-3">
    <Input bind:value={tol}>Porcentaje de tolerancia</Input>
  </div>

  <div class="col-lg-6">
    <div class="alert alert-danger mt-3">
      <b>Incertidumbre tipo B:</b>
      {dump(medicion.tipoB)}<br />
    </div>
  </div>
</div>
