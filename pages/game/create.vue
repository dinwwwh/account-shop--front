<template>
  <!-- This is detail game page -->
  <div>
    <FrameBox>
      <GameForm v-model="game">
        <template #title> Thông tin game </template>
        <template #description> this is description </template>
        <template #actions>
          <div class="flex flex-row-reverse items-center gap-4">
            <ButtonPrimary @click="create">Thêm mới</ButtonPrimary>
            <p v-if="successMessage" class="text-sm text-green-500">
              <IconCheck class="size-sm inline" />
              {{ successMessage }}
            </p>
            <p v-if="errorMessage" class="text-sm text-red-500">
              <IconX class="size-sm inline" />
              {{ errorMessage }}
            </p>
          </div>
        </template>
      </GameForm>
    </FrameBox>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  async middleware({ $auth, error }) {
    if (!(await $auth.can('create', 'game'))) return error(403);
  },
  data() {
    return {
      game: {},
      successMessage: undefined,
      errorMessage: undefined,
    };
  },
  methods: {
    create() {
      this.$axios
        .$post('game', this.$withFile(this.game))
        .then(({ data }) => {
          this.successMessage = 'Tạo mới game thành công!';
          this.errorMessage = null;

          this.$router.push({
            name: 'game-id',
            params: { id: data.id },
          });
        })
        .catch(() => {
          this.successMessage = null;
          this.errorMessage = 'Tạo mới game không thành công.';
        });
    },
  },
};
</script>
