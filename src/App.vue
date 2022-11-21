<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/logo.svg" alt="PInia logo" />
      <h1>Pinia tasks</h1>
    </header>

    <!-- filter -->
    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Favorite tasks</button>
    </nav>
    <!-- tasklist -->
    <div v-if="filter == 'all'" class="task-list">
      <p>You have {{ taskStore.totalCount }} task(s) to do.</p>
      <div v-for="task in taskStore.tasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <div v-if="filter == 'favs'" class="task-list">
      <p>{{ taskStore.favCount }} favorite task(s) to do.</p>
      <div v-for="task in taskStore.favs" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
import { useTaskStore } from "./stores/TaskStore";
import TaskDetails from "./components/TaskDetails.vue";

export default {
  components: { TaskDetails },
  setup() {
    const taskStore = useTaskStore();

    const filter = ref("all");
    return { taskStore, filter };
  },
};
</script>
