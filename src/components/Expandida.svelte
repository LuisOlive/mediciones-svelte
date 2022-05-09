<script lang="ts">
  import { notacionIngenieria as ni, estadistica as s } from 'mediciones-electricas'
  import confiabilidad from 'mediciones-electricas/src/coeficienteConfiabilidad'

  export let contribucionesCombinada = [0]
  export let incertidumbreCombinada = 0
  export let incertidumbreExpandida = 0

  $: suma = s.suma(contribucionesCombinada)
  $: gradosEfectivos = Math.floor(incertidumbreCombinada ** 4 / suma)
  $: coeficienteConfiabilidad = confiabilidad(gradosEfectivos ?? 1)
  $: incertidumbreExpandida = coeficienteConfiabilidad * incertidumbreCombinada
</script>

<div class="alert alert-warning">
  <b>Suma de las contribuciones para la expandida:</b>
  {ni.dump(suma)}
  <br />

  <b>Grados efectivos de libertad</b>
  {ni.dump(incertidumbreCombinada)}^4 / {ni.dump(suma)} = {gradosEfectivos}
  <br />

  <b>Coeficiente de confiabilidad:</b>
  {ni.dump(coeficienteConfiabilidad)}
  <br />
  <small>(tabla student 94.5%)</small>
  <br />

  <b>Incertidumbre expandida:</b>
  {ni.dump(incertidumbreExpandida)}
  <br />
</div>
