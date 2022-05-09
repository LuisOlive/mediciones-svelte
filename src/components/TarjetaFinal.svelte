<script lang="ts">
  import { dump } from 'mediciones-electricas/src/notacionIngenieria'

  import { mejor } from '../stores/modelo'

  export let incertidumbreExpandida = 0

  $: enPorcentaje = (100 * incertidumbreExpandida) / $mejor
</script>

<div class="alert alert-primary">
  <h2 class="text-center">Resultado final de la medición</h2>

  <h3 class="text-center">
    {dump(parseFloat($mejor?.toFixed(4) ?? '0'))} ±
    {Math.abs(parseFloat(enPorcentaje?.toFixed(4) ?? '0'))}%
  </h3>
</div>
