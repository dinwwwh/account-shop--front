<template>
  <div>
    <ul class="divide-y">
      <li v-for="role in roles" :key="role.id">
        <div
          class="
            bg-white
            shadow-sm
            rounded-md
            hover:bg-gray-50
            focus-within:ring-2
            focus-within:ring-offset-2
            focus-within:ring-indigo-500
            relative
          "
          :class="{
            'border border-gray-300': !isSelectedRole(role),
            'border-2 border-red-400': isSelectedRole(role),
          }"
          @click="selectRole(role)"
        >
          <a href="#" class="absolute inset-0 focus:outline-none"></a>
          <div class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <div class="flex text-sm">
                <p class="font-medium text-indigo-600 truncate">
                  {{ role.name }}
                </p>
                <p class="ml-1 flex-shrink-0 font-normal text-gray-500">
                  ({{ role.key }})
                </p>
              </div>
              <div class="ml-2 flex-shrink-0 flex">
                <p
                  class="
                    px-2
                    inline-flex
                    text-xs
                    leading-5
                    font-semibold
                    rounded-full
                    bg-red-100
                    text-red-800
                  "
                >
                  {{ role.pivot.status_code }}
                </p>
              </div>
            </div>
            <div class="mt-2 sm:flex sm:justify-between">
              <div class="sm:flex">
                <p class="flex items-center text-sm text-gray-500 gap-2">
                  <IconSpeakerphone class="size-sm" />
                  {{ getMessage(role.pivot.status_code) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'modelRole',
    event: 'changed',
  },
  props: {
    modelRole: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    roles: {
      type: Array,
      required: true,
    },
  },
  computed: {
    selectedRole: {
      get() {
        return this.modelRole;
      },
      set(val) {
        this.$emit('changed', val);
      },
    },
  },
  methods: {
    isSelectedRole(role) {
      return role.id === this.selectedRole.id;
    },
    selectRole(role) {
      this.selectedRole = role;
    },
    getMessage(statusCode) {
      if (statusCode === 0)
        return 'Đăng nick xong phải đợi admin phê duyệt xong thì nick mới xuất hiện trên shop.';
      else if (statusCode === 440)
        return 'Đăng nick xong, không cần admin phê duyệt và sẽ xuất hiện trên shop ngay lập tức.';
    },
  },
};
</script>
