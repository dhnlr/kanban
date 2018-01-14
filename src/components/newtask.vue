<template>
  <div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Add New Task</p>
      <button class="delete" aria-label="close" @click="close"></button>
    </header>
    <section class="modal-card-body">
      <transition name="bounce">
        <div class="notification is-danger" v-show="iswarning">
          <button class="delete" @click="iswarning = false"></button>
          {{warningmsg}}
        </div>
      </transition>
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Task Name" v-model="newTask.name" :disabled="isprocess">
        </div>
        <p class="help is-danger" v-if="$vuelidation.error('newTask.name')">{{ $vuelidation.error('newTask.name') }}</p>
      </div>
      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <input class="input" type="text" placeholder="Task Description" v-model="newTask.desc" :disabled="isprocess">
        </div>
        <p class="help is-danger" v-if="$vuelidation.error('newTask.desc')">{{ $vuelidation.error('newTask.desc') }}</p>
      </div>
      <div class="field">
        <label class="label">Assigned</label>
        <div class="control">
          <input class="input" type="text" placeholder="Task Assigned To" v-model="newTask.assigned" :disabled="isprocess">
        </div>
        <p class="help is-danger" v-if="$vuelidation.error('newTask.assigned')">{{ $vuelidation.error('newTask.assigned') }}</p>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success" :class="{ 'is-loading': isprocess }" :disabled="$vuelidation.errors() || isprocess" @click="submit" >  
        Add
      </button>
      <button class="button" @click="reset">Reset</button>
    </footer>
  </div>
</div>
</template>

<script>
export default {

  name: 'newtask',

  data () {
    return {
      newTask: {
        name: '',
        desc: '',
        progress: 0,
        assigned: '',
        status: 0
      },
      isprocess: false,
      iswarning: false,
      warningmsg: ''
    }
  },
  vuelidation: {
    data: {
      newTask: {
        name: {
          required: true,
          alphabetic: true
        },
        desc: {
          required: true,
          alphaSpace: true
        },
        progress: {
          required: true,
          numeric: true
        },
        assigned: {
          required: true,
          alphabetic: true
        },
        status: {
          required: true,
          numeric: true,
          includes: [0, 1, 2, 3]
        }
      }
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
  methods: {
    close () {
      this.$emit('close')
    },
    reset () {
      this.newTask = {
        name: null,
        desc: null,
        progress: 0,
        assigned: null,
        status: 0
      }
    },
    submit () {
      if (this.pending.length < 6) {
        this.$emit('submitTask', this.newTask)
        this.reset()
        this.$emit('close')
      } else {
        this.iswarning = true
        this.warningmsg = 'Please wait pending task to be processed'
        this.reset()
      }
    }
  },
  computed: {
    pending () {
      return this.tasks.filter(task => task.status === 'Pending')
    }
  }
}
</script>

<style lang="css" scoped>
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style> 