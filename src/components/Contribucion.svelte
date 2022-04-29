<script lang="ts">
  import { dump } from '../lib/utils/notacionIngenieria'
  import { diff, mejores } from '../stores/modelo'

  export let incertidumbre: number
  export let variable: string
  export let gradosLibertad = 8

  let derivadaEvaluada = 0

  $: try {
    derivadaEvaluada = $diff(variable).evaluate($mejores)
  } catch (e) {
    derivadaEvaluada = 0
  }

  $: contribucion = (incertidumbre * derivadaEvaluada) ** 2
  $: contribucion2 = contribucion ** 2 / gradosLibertad
</script>

{#if incertidumbre}
  <b>para tipo <slot>A</slot>:</b>

  ({dump(incertidumbre)})² ({dump(derivadaEvaluada)})² = <b>{dump(contribucion)}</b>
  <br />

  <em>Contribucion para la expandida:</em>
  ({dump(contribucion)})² / {gradosLibertad} = {dump(contribucion2)}
  <br />
{/if}
