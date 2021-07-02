<template>
  <FrameBox>
    <GameInfoForm v-model="gameInfo" :can-edit="canUpdateGameInfo">
      <template #actions>
        <div class="flex flex-row-reverse gap-4 items-center">
          <ButtonPrimary v-if="canUpdateGameInfo" @click="update">
            Cập nhật
          </ButtonPrimary>
          <p
            class="text-sm"
            :class="{
              'text-green-500': !message.error,
              'text-red-500': message.error,
            }"
          >
            {{ message.error || message.success }}
          </p>
        </div>
      </template>
    </GameInfoForm>
  </FrameBox>
</template>

<script>
export default {
  layout: 'admin',
  async asyncData({ $axios, $auth, params }) {
    const [{ data: gameInfo }, canUpdateGameInfo] = await Promise.all([
      $axios.$get(`game-info/show/${params.id}`, {
        params: { _requiredModelRelationships: ['rule'] },
      }),
      $auth.can('update', `GameInfo:${params.id}`),
    ]);
    return {
      gameInfo,
      canUpdateGameInfo,
      message: {
        success: undefined,
        error: undefined,
      },
    };
  },
  methods: {
    update() {
      this.$axios
        .$put(`game-info/${this.$route.params.id}`, this.gameInfo)
        .then(({ data }) => {
          this.gameInfo = data;
          this.message.error = null;
          this.message.success = 'Thành công!!';
        })
        .catch(() => {
          this.message.error = 'Thất bại :((';
          this.message.success = null;
        });
    },
  },
};
</script>
