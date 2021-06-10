<template>
  <div>
    <FrameBox>
      <GameForm v-model="game" @submit="updateGame">
        <template #title> Thông tin game </template>
        <template #description> this is description </template>
        <template #actions>
          <div class="flex flex-row-reverse">
            <ButtonPrimary @click="updateGame">Cập nhật</ButtonPrimary>
          </div>
        </template>
      </GameForm>

      <div class="mt-8">
        <div class="flex items-center justify-between mb-4">
          <HeadingBase3>Danh sách kiểu tài khoản của game</HeadingBase3>
          <SearchWithSort placeholder="Search..."></SearchWithSort>
        </div>

        <AccountTypeList :account-types="accountTypes" />
      </div>
    </FrameBox>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  async asyncData({ $axios, params }) {
    const response = await $axios.$get(`game/${params.id}`);
    return {
      game: response.data,
      accountTypes: response.data.accountTypes,
    };
  },
  methods: {
    async updateGame() {
      // this.$axios.get('csrf-cookie');
      await this.$axios.post('game', this.game);
    },
  },
};
</script>
