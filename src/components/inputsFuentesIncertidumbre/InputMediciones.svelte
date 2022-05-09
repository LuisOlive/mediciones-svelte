<script lang="ts">
  import { estadistica as s, notacionIngenieria as ni } from 'mediciones-electricas'

  let value = ''

  export let lecturas: number[] = []
  export let mejorEstimacion: number = 0

  $: _lecturas = value
    .split(/,\s*/) // separa por comas
    .filter(x => x) // quita valores vacíos
    .map(ni.load) // convierte entradas en notacion de ingenieria a numeros

  // optimizacion para celulares, cuando se mejore se podrán menos de 10
  $: if (_lecturas.length > 9) {
    // @ts-ignore
    lecturas = _lecturas
  }

  $: mejorEstimacion = s.media(lecturas)
</script>

<label class="form-group m-0 mb-3 d-block">
  lecturas obtenidas (separadas por comas)
  <textarea class="form-control m-0" bind:value />
</label>

<div class="alert alert-success">
  <b>Media aritmética:</b>
  {ni.dump(mejorEstimacion)} <br />

  <b>Varianza:</b>
  {ni.dump(s.varianza(lecturas))} <br />

  <b>Desviacion estandar:</b>
  {ni.dump(s.desviacionEstandar(lecturas))} <br />

  <b>Grados efectivos de libertad:</b>
  {s.gradosLibertad(lecturas)} <br />

  <b>Incertidumbre tipo A:</b>
  {ni.dump(s.incertidumbreA(lecturas))} <br />
</div>
