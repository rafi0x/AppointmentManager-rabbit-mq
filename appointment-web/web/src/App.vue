<template>
  <div id="app" class="bg-green-500 h-screen w-auto overflow-x-hidden">
    <Appointments />
  </div>
</template>

<script>
import Appointments from "./components/Appointments.vue";
export default {
  name: 'App',
  components: {
    Appointments
  },
}
</script>
