<template>
  <div>
    <nav class="level navbar is-warning">
      <p class="level-item has-text-centered">
        <img src="../assets/logo.png" alt="Logo" style="height: 50px;" class="logo">
      </p>
    </nav>
    <div class="has-text-centered">
      <h1 class="title is-size-3">KANBAN</h1>
      <h2 class="subtitle heading is-size-6">Development Management</h2>
    </div>
    <div class="field is-grouped is-grouped-centered">
      <p class="control">
        <a class="button is-light is-rounded" @click="addtask = true">
          Add Task
        </a>
      </p>
    </div>
    <newtask v-if='addtask' @close="addtask = false" @submitTask="add"></newtask>
  </div>
</template>

<script>
import newtask from './newtask'
export default {

  name: 'navbar',
  components: {newtask},
  data () {
    return {
      addtask: false
    }
  },
  methods: {
    add (newTask) {
      this.$db.ref('tasks').push(newTask)
    }
  }
}
</script>

<style lang="css" scoped>
  .logo{
    top: 25px;
    position: absolute;
  }
  .columns{
    padding-top: 1em;
  }
</style>