<script lang="ts">
  import { mediciones, mejores, modelo, diff, parametros, mejor } from '../stores/modelo'
  import Contribucion from './Contribucion.svelte'
  import contribuciones, { contribucionesExpandidas } from '../lib/core/contribuciones'
  import { suma } from '../lib/core/estadistica'
  import { dump } from '../lib/utils/notacionIngenieria'
  import img1 from '../assets/1.jpg'
  import img2 from '../assets/2.jpg'

  $: f = $modelo?.evaluate
  // @ts-ignore
  $: f.__parcial = (variable: string) => () => $diff(variable)?.evaluate($mejores)

  $: sumaContribs = suma(contribuciones(f, $mediciones, $mejores))
  $: sumaContribs2 = suma(contribucionesExpandidas(f, $mediciones, $mejores))
  $: incertidumbreCombinada = Math.sqrt(sumaContribs)
  $: gradosEfectivos = incertidumbreCombinada ** 4 / sumaContribs2
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

<h2>Cálculo de incertidumbre expandida</h2>

<div class="alert alert-warning">
  <b>Suma de las contribuciones para la expandida:</b>
  {dump(sumaContribs2)}
  <br />

  <b>Grados efectivos de libertad</b>
  {dump(incertidumbreCombinada)}^4 / {dump(sumaContribs2)} = {Math.floor(gradosEfectivos)}
  <br />
</div>

<img src={img1} class="img-fluid" alt="" />
<img src={img2} class="img-fluid" alt="" />
