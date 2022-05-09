<script lang="ts">
  import { mediciones, mejores, modelo, diff, parametros, mejor } from '../stores/modelo'
  import Contribucion from './Contribucion.svelte'
  import contribuciones, { contribucionesExpandidas } from '../lib/core/contribuciones'
  import { suma } from '../lib/core/estadistica'
  import { dump } from '../lib/utils/notacionIngenieria'

  $: f = $modelo?.evaluate
  // @ts-ignore
  $: f.__parcial = (variable: string) => () => $diff(variable)?.evaluate($mejores)

  export let contribucionesCombinada = [0]
  export let incertidumbreCombinada = 0

  $: sumaContribs = suma(contribuciones(f, $mediciones, $mejores))
  $: contribucionesCombinada = contribucionesExpandidas(f, $mediciones, $mejores)
  $: incertidumbreCombinada = Math.sqrt(sumaContribs)
</script>

<h2>Cálculo de incertidumbre combinada</h2>

<div class="alert alert-success">
  <b>Mejor valor para el mensurando:</b>
  {dump($mejor)}
</div>

{#each Object.entries($mediciones) as [variable, m]}
  {#if $parametros.includes(variable) && m}
    <div class="alert alert-info">
      <h4>Contribuciones de {variable}</h4>
      <Contribucion incertidumbre={m?.tipoA} gradosLibertad={m?.gradosLibertadA} {variable}>A</Contribucion>
      <Contribucion incertidumbre={m?.tipoB} gradosLibertad={m?.gradosLibertadB} {variable}>B</Contribucion>
    </div>
  {/if}
{/each}

<div class="alert alert-danger">
  <b>Suma de las contribuciones:</b>
  {dump(sumaContribs)}
  <br />

  <b>Incertidumbre combinada:</b>
  raiz({dump(sumaContribs)}) = <b>{dump(incertidumbreCombinada)}</b>
  <br />
</div>
