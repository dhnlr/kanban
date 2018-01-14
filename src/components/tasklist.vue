<template>
  <div class="columns">
    <div class="column">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            Pending
          </p>
          <a class="card-header-icon">
            <span class="icon">
              <i class="fa fa-angle-down" aria-hidden="true"></i>
            </span>
          </a>
        </header>
        <div class="card-content">
          <div class="content" v-for="p in pending">
            <task :p="p" :tasks="tasks"></task>
          </div>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item">Current: {{pending.length}}</p>
          <p class="card-footer-item">Max: 6</p>
        </footer>
      </div>
    </div>
    <div class="column">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            Analysis
          </p>
          <a class="card-header-icon">
            <span class="icon">
              <i class="fa fa-angle-down" aria-hidden="true"></i>
            </span>
          </a>
        </header>
        <div class="card-content">
          <div class="content" v-for="p in analysis">
            <task :p="p" :tasks="tasks"></task>
          </div>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item">Current: {{analysis.length}}</p>
          <p class="card-footer-item">Max: 6</p>
        </footer>
      </div>
    </div>
    <div class="column">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            Development
          </p>
          <a class="card-header-icon">
            <span class="icon">
              <i class="fa fa-angle-down" aria-hidden="true"></i>
            </span>
          </a>
        </header>
        <div class="card-content">
          <div class="content" v-for="p in development">
            <task :p="p" :tasks="tasks"></task>
          </div>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item">Current: {{development.length}}</p>
          <p class="card-footer-item">Max: 6</p>
        </footer>
      </div>
    </div>
    <div class="column">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            Done
          </p>
          <a class="card-header-icon">
            <span class="icon">
              <i class="fa fa-angle-down" aria-hidden="true"></i>
            </span>
          </a>
        </header>
        <div class="card-content">
          <div class="content" v-for="p in done">
            <task :p="p" :tasks="tasks"></task>
          </div>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item">Current: {{done.length}}</p>
          <p class="card-footer-item">Max: 6</p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import task from './task'

export default {

  name: 'tasklist',
  components: { task },
  data () {
    return {
    }
  },
  firebase () {
    return {
      tasks: {
        source: this.$db.ref('tasks'),
        anArray: true
      }
    }
  },
  computed: {
    pending () {
      return this.tasks.filter(task => task.status === 0)
    },
    analysis () {
      return this.tasks.filter(task => task.status === 1)
    },
    development () {
      return this.tasks.filter(task => task.status === 2)
    },
    done () {
      return this.tasks.filter(task => task.status === 3)
    }
  }
}
</script>

<style lang="css" scoped>
  .columns{
    padding-top: 2em;
    margin: 0 1em;
  }
</style>