<template>
  <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <!-- Title -->
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          <slot name="title">Thông tin game</slot>
        </h3>
        <!-- Description -->
        <p class="mt-1 text-sm text-gray-500">
          <slot name="description">...</slot>
        </p>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2 space-y-6">
        <!-- Game's name -->
        <div class="grid grid-cols-3 gap-6">
          <div class="col-span-3 sm:col-span-2">
            <InputPlain
              v-model="modelGame.name"
              placeholder="Liên Minh Huyền Thoại..."
            >
              <template #label> Tên game </template>
              <template #description> This is a description </template>
            </InputPlain>
          </div>
        </div>

        <!-- Publisher name -->
        <div class="grid grid-cols-3 gap-6">
          <div class="col-span-3 sm:col-span-2">
            <InputPlain
              v-model="modelGame.publisherName"
              placeholder="Garena ..."
            >
              <template #label> Tên nhà phát hành </template>
              <template #description> This is a description </template>
            </InputPlain>
          </div>
        </div>

        <!-- Description for game -->
        <TextareaBase
          v-model="modelGame.description"
          placeholder="game rat la vui ..."
        >
          <template #label> Mô tả game </template>
          <template #description> Hãy nghi những gì bạn thích. </template>
        </TextareaBase>

        <InputBaseAvatar v-model="modelGame.image" rounded="lg">
          <template #label>Ảnh đại diện</template>
        </InputBaseAvatar>

        <!-- Actions -->
        <div>
          <slot name="actions"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'game',
    event: 'input',
  },
  props: {
    game: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    modelGame: {
      get() {
        return this.game;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};
</script>
