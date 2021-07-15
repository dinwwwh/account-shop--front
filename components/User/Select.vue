<template>
  <div
    class="
      focus:ring-indigo-500 focus:border-indigo-500
      sm:text-sm
      w-96
      relative
      flex
      items-center
      max-w-full
      px-4
      py-2
      bg-white
      border-gray-300
      rounded-md
      shadow-sm
    "
  >
    <!-- Infos -->
    <div class="flex items-center flex-1">
      <div
        class="min-w-max px-3 py-1 text-xl font-medium bg-green-200 rounded-md"
      >
        <span class="text-green-700">{{ userIds.length }}</span>
        <span class="text-green-700">users</span>
      </div>
    </div>

    <!-- actions -->
    <div class="flex items-center gap-2">
      <button
        type="button"
        class="
          hover:bg-indigo-700
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-indigo-500
          inline-flex
          items-center
          px-4
          py-2
          text-sm
          font-medium
          text-white
          bg-indigo-600
          border border-transparent
          rounded-md
          shadow-sm
        "
        @click="currentMenu = 'MANAGEMENT'"
      >
        <IconAdjustments class="size-xl mr-1 -ml-1" />
        Quản lý
      </button>
      <button
        type="button"
        class="
          hover:bg-green-700
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-green-500
          inline-flex
          items-center
          px-4
          py-2
          text-sm
          font-medium
          text-white
          bg-green-600
          border border-transparent
          rounded-md
          shadow-sm
        "
        @click="currentMenu = 'ADDITION'"
      >
        <IconPlus class="size-xl mr-1 -ml-1" />
        Thêm
      </button>
    </div>

    <!-- MANAGEMENT SCREEN -->
    <div
      v-if="currentMenu === 'MANAGEMENT'"
      class="top-full absolute left-0 right-0 mt-3 flex items-end gap-2"
    >
      <InputBase
        v-model="textUserIds"
        placeholder="Danh sách user id"
        class="flex-1"
      >
        <template #label> Danh sách id user đã chọn </template>
      </InputBase>
      <ButtonPrimary theme="red" class="mb-1" @click="destroy">
        <IconTrash class="size-xl" />
      </ButtonPrimary>
    </div>

    <!-- ADDITION SCREEN -->
    <div
      v-if="currentMenu === 'ADDITION'"
      class="top-full absolute left-0 right-0 mt-3 flex items-end gap-2"
      @keyup.enter="search"
    >
      <InputBase
        v-model="keyword"
        type="search"
        placeholder="Search bằng id, tên, email"
        class="flex-1"
      >
        <template #label> Tìm kiếm </template>
      </InputBase>
      <ButtonPrimary them="red" class="mb-1" @click="search">
        <IconSearch class="size-xl" />
      </ButtonPrimary>

      <!-- Results of search -->
      <div class="absolute top-full left-0 right-0 mt-3">
        <div
          v-if="!searchedUsers.length && isSearched"
          class="text-center text-gray-400"
        >
          không có kết quả nào
        </div>
        <div v-for="user in searchedUsers" :key="user.id">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 bg-cover bg-center rounded-full"
              :style="`background-image: url('/images/user.png')`"
            ></div>

            <div class="flex-1 flex items-center gap-3">
              <p class="text-yellow-500">
                Name: <span class="font-medium">{{ user.name }}</span>
              </p>
              <p class="text-purple-500">
                ID: <span class="font-medium">{{ user.id }}</span>
              </p>
            </div>

            <button
              v-if="!has(user)"
              type="button"
              class="
                inline-flex
                items-center
                p-1
                border border-transparent
                rounded-full
                shadow-sm
                text-white
                bg-green-600
                hover:bg-green-700
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-green-500
              "
              @click="add(user)"
            >
              <IconPlus class="size-lg" />
            </button>
            <button
              v-else
              type="button"
              class="
                inline-flex
                items-center
                p-1
                border border-transparent
                rounded-full
                shadow-sm
                text-white
                bg-red-600
                hover:bg-red-700
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-red-500
              "
              @click="remove(user)"
            >
              <IconTrash class="size-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'model',
    event: 'change',
  },
  props: {
    model: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentMenu: 'ADD',
      searchedUsers: [],
      keyword: '',
      isSearched: false,
    };
  },
  computed: {
    userIds: {
      get() {
        return this.model;
      },
      set(val) {
        this.$emit('change', val);
      },
    },
    textUserIds: {
      get() {
        return this.userIds.toString();
      },
      set(val) {
        this.userIds = val
          .split(',')
          .filter((id) => id)
          .map((id) => parseInt(id));
      },
    },
  },
  methods: {
    async search() {
      this.isSearched = false;
      const { data } = await this.$axios.$get('user/search', {
        params: {
          _keyword: this.keyword,
        },
      });
      this.searchedUsers = data;
      this.isSearched = true;
    },
    has(user) {
      return this.userIds.includes(user.id);
    },
    add(user) {
      this.userIds.push(user.id);
    },
    remove(user) {
      this.userIds = this.userIds.filter((id) => id !== user.id);
    },
    destroy() {
      this.userIds = [];
    },
  },
};
</script>
