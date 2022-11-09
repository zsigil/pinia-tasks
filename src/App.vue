<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/logo.svg" alt="PInia logo" />
      <h1>Pinia tasks</h1>
    </header>

    <!-- tasklist -->
    <div class="task-list">
      <div v-for="task in taskStore.tasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
</template>

<script>
import { useTaskStore } from "./stores/TaskStore";
import TaskDetails from "./components/TaskDetails.vue";

export default {
  components: { TaskDetails },
  setup() {
    const taskStore = useTaskStore();
    return { taskStore };
  },
};
</script>
