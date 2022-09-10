<template>
  <div>
    <div v-if="!showDelete && !error.msg">
      <div class="mr-5 relative inline-flex">
        <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 412 232">
          <path
            d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
            fill="#648299" fill-rule="nonzero" />
        </svg>
        <select
          class="border border-gray-300 rounded-md text-gray-600 h-9 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
          v-model="status">
          <option value="" selected hidden disabled>Select</option>
          <option value="approved">Approve</option>
          <option value="rejected">Reject</option>
        </select>
      </div>
      <div class="w-auto relative inline-flex">
        <button type="button" @click="update"
          class="py-1 ml-1.5 px-4 border border-green-500 hover:text-white hover:bg-green-500 focus:ring-green-500 focus:ring-offset-green-200 text-green-500 w-full transition ease-in duration-200 text-center text-base font-medium shadow-md outline-none focus:ring-2 focus:ring-offset-2  rounded-full ">
          Update
        </button>
      </div>
    </div>
    <div v-if="error.msg"
      class="py-1 ml-1.5 px-4 border-red-500 border text-red-500 w-full text-center text-base font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full ">
      {{ error.msg }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Actions",
  emits: ["status-updated"],
  props: {
    appointment: {
      type: Object,
      required: true
    },
    showDelete: Boolean
  },
  data() {
    return {
      status: '',
      token: '',
      error: {}
    }
  },
  methods: {
    async update() {
      this.error = {};
      if (this.status && this.appointment) {
        const request = await fetch('http://localhost:3000/api/appointment/update', {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            'token': this.token
          },
          body: JSON.stringify({
            ...this.appointment,
            status: this.status,
          })
        });
        const response = await request.json();
        if (response) {
          this.$emit("status-updated")
        } else {
          this.error = {
            msg: response.clientErr
          };
        }
      }
    }
  }
}
</script>

<style scoped>
</style>