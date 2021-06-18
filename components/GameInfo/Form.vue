<template>
  <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <!-- Title -->
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          <slot name="title">Thông tin của game</slot>
        </h3>
        <!-- Description -->
        <p class="mt-1 text-sm text-gray-500">
          <slot name="description">...</slot>
        </p>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2 space-y-6">
        <!-- Name -->
        <div class="grid grid-cols-3 gap-6">
          <div class="col-span-3 sm:col-span-2">
            <InputBase
              v-model="gameInfo.name"
              :can-edit="canEdit"
              placeholder="Phái, cấp,..."
            >
              <template #label> Tên </template>
            </InputBase>
          </div>
        </div>

        <!-- Description -->
        <TextareaBase
          v-model="gameInfo.description"
          :can-edit="canEdit"
          placeholder="Là cấp của nhân vật trong game..."
        >
          <template #label> Mô tả </template>
        </TextareaBase>

        <!-- Rule -->
        <RuleInlineForm v-model="gameInfo.rule" :can-edit="canEdit" />

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
    prop: 'modelGameInfo',
    event: 'input',
  },
  props: {
    modelGameInfo: {
      type: Object,
      required: true,
      validator(value) {
        // Has rule field that is an Object
        return value.rule instanceof Object || typeof value.rule === 'object';
      },
    },
    canEdit: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    gameInfo: {
      get() {
        return this.modelGameInfo;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};
</script>
