<script lang="ts">
  import modelo, {control, parametros, diff} from '../../stores/modelo'
  import Katex from 'svelte-katex'
</script>

<div class="row p-3">
  
  <div class="col-lg-4 p-0">
    <div class="card p-3">
      <label class="form-group d-block">
        Ingrese las variables de incertidumbre (separadas por comas)
        <input class="form-control " bind:value={$control.paramsStr}/>
      </label>

      <label class="form-group d-block">
        Ingrese el modelo del mensurando
        <textarea class="form-control " bind:value={$control.cuerpoStr}></textarea>
      </label>
    </div>
  </div>
  
  <div class="col-lg-8 p-0">
    <div class="p-3">
      <p class="">Modelo del mensurando:</p>
      
      <div class="alert alert-success">
        <Katex>{$modelo.toTex({implicit: 'hide'})}</Katex>
      </div>
      
      <p class="">Derivadas parciales:</p>
      
      <div class="row">
        {#each $parametros as p}
          <div class="col-lg-6">
            <div class="alert alert-warning">
                <Katex>
                  {`\\frac{\\partial f}{\\partial ${p}} =`}
                  {$diff(p).toTex({implicit: 'hide'})}
                </Katex>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>