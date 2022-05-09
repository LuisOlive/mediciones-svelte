<script lang="ts">
  import 'bootswatch/dist/cosmo/bootstrap.min.css'
  import 'katex/dist/katex.css'
  import { description } from '../package.json'
  import FormularioModelo from './components/formularios/FormularioModelo.svelte'
  import FormularioIncertidumbres from './components/formularios/FormularioIncertidumbres.svelte'
  import Combinada from './components/Combinada.svelte'
  import Expandida from './components/Expandida.svelte'
  import TarjetaFinal from './components/TarjetaFinal.svelte'

  import { parametros } from './stores/modelo'

  let contribucionesCombinada: number[]
  let incertidumbreCombinada: number
  export let incertidumbreExpandida: number
</script>

<svelte:head>
  <title>Calculadora de incertidumbres</title>

  <meta name="description" content={description ?? 'SOS'} />
</svelte:head>

<header class="navbar navbar-expand-lg navbar-dark bg-success">
  <div class="container-md text-white">Calculadora perrona de mediciones electricas</div>
</header>

<main class="container-md d-grid gap-3">
  <FormularioModelo />

  {#each $parametros as parametro}
    <FormularioIncertidumbres {parametro} />
  {/each}

  <Combinada bind:contribucionesCombinada bind:incertidumbreCombinada />

  <Expandida bind:incertidumbreExpandida {contribucionesCombinada} {incertidumbreCombinada} />

  <TarjetaFinal {incertidumbreExpandida} />
</main>

<footer class="bg-dark text-white p-4">
  <div class="container">
    <div class="row gy-3">
      <div class="col-md-8">Desarrollado por Axel Parra, Luis Basurto, Luis Pintor, Nolberto Cortés</div>

      <div class="col-md-2 text-end">
        <a class="text-white btn btn-block btn-success" href="https://github.com/LuisOlive/mediciones-electricas"> código de cálculos </a>
      </div>

      <div class="col-md-2 text-end">
        <a class="text-white btn btn-block btn-danger" href="https://github.com/LuisOlive/mediciones-svelte"> código de interfaz </a>
      </div>
    </div>
  </div>
</footer>

<style>
  * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>
