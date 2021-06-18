<template>
  <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <!-- Title -->
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          <slot name="title"> Hành động của kiểu tài khoản </slot>
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
              v-model="accountAction.name"
              :can-edit="canEdit"
              placeholder="Đổi số điện thoại, ..."
            >
              <template #label> Tên </template>
            </InputBase>
          </div>
        </div>

        <!-- Description -->
        <TextareaBase
          v-model="accountAction.description"
          :can-edit="canEdit"
          placeholder="Là số điện thoại trong nick và rất quan trọng..."
        >
          <template #label> Mô tả </template>
        </TextareaBase>

        <!-- Video path -->
        <div class="grid grid-cols-3 gap-6">
          <div class="col-span-3 sm:col-span-2">
            <InputBase
              v-model="accountAction.videoPath"
              :can-edit="canEdit"
              placeholder="https://youtobe.com/..."
            >
              <template #label> Đường dẫn video hướng dẫn </template>
            </InputBase>
          </div>
        </div>

        <!-- required -->
        <div class="grid grid-cols-3 gap-6 pb-20">
          <div class="col-span-3 sm:col-span-2">
            <SelectBase
              v-model="accountAction.required"
              :options="requiredOptions"
              display-key="name"
              value-key="value"
            >
              <template #label> Bắt buộc hay không ? </template>
            </SelectBase>
          </div>
        </div>

        <!-- Required role keys -->
        <div v-if="accountAction.required === null" class="space-y-3">
          <HeadingBase6>Chọn role bắt buộc thực hiện </HeadingBase6>
          <SelectModernMultiple
            v-model="accountAction.requiredRoleKeys"
            :options="originalRoles"
            display-key="name"
            value-key="key"
          />
        </div>

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
    prop: 'modelAccountAction',
    event: 'input',
  },
  props: {
    modelAccountAction: {
      type: Object,
      required: true,
    },
    canEdit: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      requiredOptions: [
        {
          name: 'Bắt buộc',
          value: true,
        },
        {
          name: 'Không bắt buộc',
          value: false,
        },
        {
          name: 'Tuỳ theo role',
          value: null,
        },
      ],
      originalRoles: [],
    };
  },
  async fetch() {
    this.originalRoles = (await this.$axios.$get('role')).data;
  },
  computed: {
    accountAction: {
      get() {
        return this.modelAccountAction;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  watch: {
    accountAction() {
      this.initializeRequiredRoleKeys();
    },
  },
  created() {
    this.initializeRequiredRoleKeys();
  },
  methods: {
    change() {
      this.accountAction = { rule: {} };
    },
    initializeRequiredRoleKeys() {
      this.accountAction.requiredRoleKeys =
        this.accountAction.requiredRoles?.map((role) => role.key);
    },
  },
};
</script>
