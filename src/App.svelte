<script lang="ts">
  import 'bootswatch/dist/cosmo/bootstrap.min.css'
  import 'katex/dist/katex.css'
  // import {description} from '../package.json'
  import FormularioModelo from './components/formularios/FormularioModelo.svelte'
  import FormularioIncertidumbres from './components/formularios/FormularioIncertidumbres.svelte'
  import Combinada from './components/Combinada.svelte'

  import { parametros } from './stores/modelo'
</script>

<svelte:head>
  <title>Calculadora de incertidumbres</title>

  <!-- <meta name="description" content={description}/> -->
</svelte:head>

<header class="navbar navbar-expand-lg navbar-dark bg-success">
  <div class="container-md text-white">Calculadora perrona de mediciones electricas</div>
</header>

<div class="container-md d-grid gap-3">
  <FormularioModelo />

  {#each $parametros as parametro}
    <FormularioIncertidumbres {parametro} />
  {/each}

  <Combinada />
</div>

<style>
  * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>
