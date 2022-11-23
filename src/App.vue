<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/logo.svg" alt="PInia logo" />
      <h1>Pinia tasks</h1>
    </header>

    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>
    <!-- filter -->
    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Favorite tasks</button>
    </nav>

    <!-- loading -->
    <div v-if="loading" class="loading">Loading tasks</div>

    <!-- tasklist -->
    <div v-if="filter == 'all'" class="task-list">
      <p>You have {{ totalCount }} task(s) to do.</p>
      <div v-for="task in tasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <div v-if="filter == 'favs'" class="task-list">
      <p>{{ favCount }} favorite task(s) to do.</p>
      <div v-for="task in favs" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <button @click="taskStore.$reset">Reset</button>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "./stores/TaskStore";
import TaskDetails from "./components/TaskDetails.vue";
import TaskForm from "./components/TaskForm.vue";
import { storeToRefs } from "pinia";

const taskStore = useTaskStore();

const { tasks, loading, favs, favCount, totalCount } = storeToRefs(taskStore);

taskStore.getTasks();

const filter = ref("all");
</script>
