<script lang="ts">
  import type { Medicion } from '../../lib/core/tipos'
  import { mediciones } from '../../stores/modelo'
  import Multimetro from '../inputsFuentesIncertidumbre/InputMultimetro.svelte'
  import Termometro from '../inputsFuentesIncertidumbre/InputTermometro.svelte'
  import Constante from '../inputsFuentesIncertidumbre/InputConstante.svelte'

  export let parametro: string

  let medicion: Medicion
  let value: 'multimetro' | 'termometro' | 'constante' = 'multimetro'

  $: $mediciones[parametro] = medicion
</script>

<h3>Mediciones para {parametro}</h3>

<div class="row">
  <div class="col-md-3 col-lg-2">Tipo de medición</div>

  <div class="col-md-9 col-lg-10">
    <select class="form-select" bind:value>
      <option value="multimetro">Multimetro</option>
      <option value="termometro">Termometro</option>
      <option value="constante">Constante física</option>
    </select>
  </div>
</div>

{#if value === 'multimetro'}
  <Multimetro bind:medicion />
{:else if value === 'termometro'}
  <Termometro bind:medicion />
{:else if value === 'constante'}
  <Constante bind:medicion />
{/if}
