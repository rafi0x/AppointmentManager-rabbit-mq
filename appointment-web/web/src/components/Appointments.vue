<template>
  <div class="flex flex-col py-16 px-20">
    <table-view>
      <tr v-if="people.length === 0">
        <td colspan="8" class="text-center py-5 text-gray-500">No Appointment yet</td>
      </tr>
      <tr v-for="(person, index) in people" :key="index" class="hover:bg-gray-100" v-else>
        <td class="px-6 py-4 whitespace-nowrap cursor-pointer"></td>
        <td class="px-6 py-4 whitespace-nowrap cursor-pointer">
          <div class="text-sm font-medium text-gray-900">
            {{ person.patientName }}
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">
          <div class="text-sm text-gray-500">
            {{ person.patientContact }}
          </div>
        </td>
        <!-- <td class="px-6 py-4 whitespace-nowrap cursor-pointer">
          <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
            :class="{ 'bg-yellow-100 text-yellow-800': person.status === 'Active', 'bg-green-100 text-green-800': person.status === 'Completed', 'bg-red-100 text-red-800': person.status === 'Cancelled' }">
            {{ person.status }}
          </span>
        </td> -->
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">
          {{ person.time }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">
          {{ person.date ? person.date.split('T')[0] : '' }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <Actions :appointment="person" @status-updated="getDataFromApi" />
        </td>

      </tr>

    </table-view>

  </div>

</template>

<script>
import Actions from "./Actions.vue";
import TableView from "./TableView.vue";

export default {
  name: 'Appointments',
  components: {
    "table-view": TableView,
    Actions
  },
  data() {
    return {
      people: []
    }
  },
  async mounted() {
    //call the api
    await this.getDataFromApi()
  },
  methods: {
    //call api for getting all appointments and update to state
    async getDataFromApi() {
      console.log("recall");
      const request = await fetch('http://localhost:3000/api/appointment/pendding', { method: "GET" });
      const response = await request.json();
      if (response) {
        this.people = response;
      }
      console.log(this.people);
    }
  }
}

</script>