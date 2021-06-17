<template>
  <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <!-- Title -->
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          <slot name="title">Thông tin của kiểu tài khoản</slot>
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
              v-model="accountInfo.name"
              :can-edit="canEdit"
              placeholder="Số điện thoại, ..."
            >
              <template #label> Tên </template>
            </InputBase>
          </div>
        </div>

        <!-- Description -->
        <TextareaBase
          v-model="accountInfo.description"
          :can-edit="canEdit"
          placeholder="Là số điện thoại trong nick và rất quan trọng..."
        >
          <template #label> Mô tả </template>
        </TextareaBase>

        <!-- Rule -->
        <RuleInlineForm v-model="accountInfo.rule" :can-edit="canEdit" />

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
    prop: 'modelAccountInfo',
    event: 'input',
  },
  props: {
    modelAccountInfo: {
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
    accountInfo: {
      get() {
        return this.modelAccountInfo;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  methods: {
    change() {
      this.accountInfo = { rule: {} };
    },
  },
};
</script>
