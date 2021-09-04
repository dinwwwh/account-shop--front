<template>
  <div class="space-y-6 p-8">
    <ConfigTable :configs="configs" :fields="['key', 'data', 'actions']" />

    <PaginationCenteredNumbers
      v-if="lastPage > 1"
      v-model="page"
      :last-page="lastPage"
      @change="onPageChange"
    />
  </div>
</template>

<script>
export default {
  layout: 'admin',
  async asyncData({ $axios, query }) {
    const { data: configs, meta } = await $axios.$get('config', {
      params: {},
    });

    return {
      configs,
      page: meta.current_page,
      lastPage: meta.last_page,
    };
  },
  methods: {
    onPageChange() {},
  },
};
</script>
