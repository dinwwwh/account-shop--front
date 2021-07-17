<template>
  <div>
    <div v-for="i in 10" :key="i" class="m-auto mt-20">
      <div>
        <input v-model="selectedUsers[i].value" type="text" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      selectedUsers: [],
    };
  },
  created() {
    for (let i = 1; i <= 10; i++) {
      this.selectedUsers[i] = {};
    }
  },
  methods: {},
};
</script>
