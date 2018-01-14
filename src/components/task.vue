<template>
  <div>
    <article class="media">
      <div class="media-content">
        <div class="content">
          <p><strong>Name: </strong><br/>{{p.name}}<br/>
          <strong>Description: </strong><br/>{{p.desc}}<br/>
          <strong>Assigned to: </strong><br/>{{p.assigned}}<br/>
          <strong>Progress:</strong>
          <progress class="progress is-success" :value="p.progress" max="100">{{p.progress}}%</progress>
          <button class="backward is-radiusless" @click="backward(p['.key'])"></button>
          <button class="forward is-radiusless" @click="forward(p['.key'])" v-show="isforward(p)"></button></p>
        </div>
      </div>
      <div class="media-right">
        <p>
          <button class="delete is-radiusless" @click="destroy(p['.key'])"></button><br/>
          <button class="next is-radiusless" @click="next(p['.key'], p.status)"></button><br/>
          <button class="back is-radiusless" @click="back(p['.key'], p.status)"></button>
        </p>
      </div>
    </article>
    <hr>
  </div>
</template>

<script>
export default {

  name: 'task',
  props: [ 'p', 'tasks' ],
  data () {
    return {

    }
  },
  methods: {
    isbackward (p) {
      return (p.status !== 0 || p.progress !== 0)
    },
    isforward (p) {
      return (p.status !== 3 || p.progress !== 100)
    },
    forward (id) {
      let currentTask = this.tasks.filter(task => task['.key'] === id)
      let newProgress = currentTask[0].progress + 10
      if (newProgress > 100) {
        newProgress = 100
        let newStatus = currentTask[0].status + 1
        if (newStatus > 3) {
          newStatus = 3
        }
        if (this.tasks.filter(task => task['.key'] === newStatus).length < 6) {
          this.$db.ref('tasks').child(id).child('status').set(newStatus)
          newProgress = 0
        }
      }
      this.$db.ref('tasks').child(id).child('progress').set(newProgress)
    },
    backward (id) {
      let currentTask = this.tasks.filter(task => task['.key'] === id)
      let newProgress = currentTask[0].progress - 10
      if (newProgress < 0) {
        newProgress = 0
        let newStatus = currentTask[0].status - 1
        if (newStatus < 0) {
          newStatus = 0
        }
        if (this.tasks.filter(task => task['.key'] === newStatus).length < 6) {
          this.$db.ref('tasks').child(id).child('status').set(newStatus)
        }
      }
      this.$db.ref('tasks').child(id).child('progress').set(newProgress)
    },
    next (id, status) {
      let newStatus = status + 1
      if (newStatus > 3) {
        newStatus = 3
      }
      if (this.tasks.filter(task => task['.key'] === newStatus).length < 6) {
        this.$db.ref('tasks').child(id).child('status').set(newStatus)
      }
      let progress = 0
      this.$db.ref('tasks').child(id).child('progress').set(progress)
    },
    back (id, status) {
      let newStatus = status - 1
      if (newStatus < 0) {
        newStatus = 0
      }
      if (this.tasks.filter(task => task['.key'] === newStatus).length < 6) {
        this.$db.ref('tasks').child(id).child('status').set(newStatus)
      }
      let progress = 0
      this.$db.ref('tasks').child(id).child('progress').set(progress)
    },
    destroy (id) {
      this.$db.ref('tasks').child(id).remove()
    }
  }
}
</script>

<style lang="css" scoped>
.forward {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background-color: #209cee;
    border: none;
    border-radius: 290486px;
    cursor: pointer;
    display: inline-block;
    -webkit-box-flex: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    height: 20px;
    max-height: 20px;
    max-width: 20px;
    min-height: 20px;
    min-width: 20px;
    outline: none;
    position: relative;
    vertical-align: middle;
    width: 20px;
    color: white;
  }
  .forward::before, .forward::after {
    content: "»";
    font: normal normal normal 14px/1.4 FontAwesome;
    display: block;
    left: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    transform-origin: center center;
  }
  .backward {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background-color: #209cee;
    border: none;
    border-radius: 290486px;
    cursor: pointer;
    display: inline-block;
    -webkit-box-flex: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    height: 20px;
    max-height: 20px;
    max-width: 20px;
    min-height: 20px;
    min-width: 20px;
    outline: none;
    position: relative;
    vertical-align: middle;
    width: 20px;
    color: white;
  }
  .backward::before, .backward::after {
    content: "«";
    font: normal normal normal 14px/1.4 FontAwesome;
    display: block;
    left: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    transform-origin: center center;
  }
  .next {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background-color: #00c4a7;
    border: none;
    border-radius: 290486px;
    cursor: pointer;
    display: inline-block;
    -webkit-box-flex: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    height: 20px;
    max-height: 20px;
    max-width: 20px;
    min-height: 20px;
    min-width: 20px;
    outline: none;
    position: relative;
    vertical-align: middle;
    width: 20px;
    color: white;
  }
  .next::before, .next::after {
    content: "\f064";
    font: normal normal normal 14px/1.4 FontAwesome;
    display: block;
    left: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    transform-origin: center center;
  }
  .back {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background-color: #ffdb4a;
    border: none;
    border-radius: 290486px;
    cursor: pointer;
    display: inline-block;
    -webkit-box-flex: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    height: 20px;
    max-height: 20px;
    max-width: 20px;
    min-height: 20px;
    min-width: 20px;
    outline: none;
    position: relative;
    vertical-align: middle;
    width: 20px;
    color: white;
  }
  .back::before, .back::after {
    content: "\f112";
    font: normal normal normal 14px/1.4 FontAwesome;
    display: block;
    left: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    transform-origin: center center;
  }
  .delete{
    vertical-align: middle;
    background-color: #ff3860;
  }
  .progress{
    margin: 0.2em 0 !important;
  }
</style>