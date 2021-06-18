<template>
  <div>
    <FrameBox>
      <GameForm v-model="game" :can-edit="canUpdateGame">
        <template #title> Thông tin game </template>
        <template #description> this is description </template>
        <template #actions>
          <div v-if="canUpdateGame" class="flex flex-row-reverse">
            <ButtonPrimary @click="updateGame">Cập nhật</ButtonPrimary>
          </div>
        </template>
      </GameForm>

      <!-- Account types -->
      <div class="mt-8">
        <div class="flex items-center justify-between mb-4">
          <HeadingBase3>Danh sách kiểu tài khoản của game</HeadingBase3>
          <NuxtLink
            v-if="canCreateAccountType"
            :to="{
              name: 'game-id-create-account-type',
              params: { id: $route.params.id },
            }"
          >
            <ButtonPrimary>Thêm mới</ButtonPrimary>
          </NuxtLink>
        </div>
        <AccountTypeList :account-types="accountTypes" />
      </div>

      <!-- Game infos -->
      <div class="mt-8">
        <div class="flex items-center justify-between mb-4">
          <HeadingBase3>Danh sách thông tin game</HeadingBase3>
          <NuxtLink
            v-if="canCreateGameInfo"
            :to="{
              name: 'game-id-create-game-info',
              params: { id: $route.params.id },
            }"
          >
            <ButtonPrimary>Thêm mới</ButtonPrimary>
          </NuxtLink>
        </div>
        <GameInfoList :game-infos="gameInfos" />
      </div>
    </FrameBox>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  async asyncData({ $axios, params, $auth }) {
    const { data: game } = await $axios.$get(`game/${params.id}`);
    const [canUpdateGame, canCreateAccountType, canCreateGameInfo] =
      await Promise.all([
        $auth.can('update', `game:${game.id}`),
        $auth.can('create', `AccountType,Game:${game.id}`),
        $auth.can('create', `GameInfo,Game:${game.id}`),
      ]);
    return {
      game,
      accountTypes: game.accountTypes,
      gameInfos: game.gameInfos,
      canUpdateGame,
      canCreateAccountType,
      canCreateGameInfo,
    };
  },
  methods: {
    updateGame() {
      // this.$axios.get('csrf-cookie');
      this.$axios
        .$post(
          `game/${this.game.id}`,
          this.$withFile({
            _method: 'put',
            order: this.game.order,
            name: this.game.name,
            description: this.game.description,
            publisherName: this.game.publisherName,
            image: this.game.image,
          })
        )
        .then(({ data }) => {
          this.game = data;
        })
        .catch(() => {});
    },
  },
};
</script>
