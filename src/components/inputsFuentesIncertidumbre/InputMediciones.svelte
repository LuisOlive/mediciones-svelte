<script lang="ts">
  import * as s from '../../lib/core/estadistica'
  import { load, dump } from '../../lib/utils/notacionIngenieria'

  let _lecturas = ''

  export let lecturas: number[] = [0]
  export let mejorEstimacion: number = 0

  $: lecturas = _lecturas.split(/,\s*/).map(load)
  $: mejorEstimacion = s.media(lecturas)
</script>

<label class="form-group m-0 mb-3 d-block">
  lecturas obtenidas (separadas por comas)
  <textarea class="form-control m-0" bind:value={_lecturas} />
</label>

<div class="alert alert-success">
  <b>Media aritmética:</b>
  {dump(mejorEstimacion)} <br />

  <b>Varianza:</b>
  {dump(s.varianza(lecturas))} <br />

  <b>Desviacion estandar:</b>
  {dump(s.desviacionEstandar(lecturas))} <br />

  <b>Grados efectivos de libertad:</b>
  {s.gradosLibertad(lecturas)} <br />

  <b>Incertidumbre tipo A:</b>
  {dump(s.incertidumbreA(lecturas))} <br />
</div>
