<script lang="ts">
  import { load } from '../../lib/utils/notacionIngenieria'

  export let value: number
  export let placeholder = 'se acepta formato de ingeniería'

  let className = ''
  export { className as class }

  let _value = ''
  $: value = load(_value)
</script>

<label class="form-group m-0 mb-3 d-block {className}">
  <slot />

  <input class="form-control m-0" bind:value={_value} {placeholder} />
</label>
