<template>
  <div id="app">
    <navbar></navbar>
    <div class="container is-fluid">
      <tasklist></tasklist>
    </div>
  </div>
</template>

<script>
import navbar from './components/navbar'
import tasklist from './components/tasklist'
export default {

  name: 'app',
  components: {navbar, tasklist}
}
</script>

<style>

</style>
