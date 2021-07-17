<template>
  <div>
    <UnderHeader :divide-line="true">
      <HeadingWithAction>
        Danh sách tài khoản
        <template #actions>
          <NuxtLink :to="{ name: 'account-create' }">
            <ButtonPrimary>Thêm mới</ButtonPrimary>
          </NuxtLink>
        </template>
      </HeadingWithAction>
    </UnderHeader>

    <FrameBox>
      <div class="grid grid-cols-5 mb-8" @keyup.enter="refreshAccounts">
        <SearchWithSort
          v-model="search"
          class="col-start-4 col-span-2"
          placeholder="search..."
        />
      </div>

      <AccountTable :accounts="accounts" />
      <PaginationCenteredNumbers
        v-if="lastPage > 1"
        v-model="currentPage"
        class="mt-4"
        :last-page="lastPage"
        @change="refreshAccounts"
      />
    </FrameBox>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  async asyncData({ $axios }) {
    const { data: accounts, meta } = await $axios.$get('account/manage/index', {
      params: {
        _requiredModelRelationships: ['accountType.game.representativeImage'],
      },
    });
    return {
      accounts,
      currentPage: meta.current_page,
      lastPage: meta.last_page,
      search: undefined,
    };
  },
  methods: {
    refreshAccounts() {
      this.$nuxt.$loading.start();

      return this.$axios
        .$get('account/manage/index', {
          params: {
            page: this.currentPage,
            search: this.search,
            _requiredModelRelationships: [
              'accountType.game.representativeImage',
            ],
          },
        })
        .then(({ data: accounts, meta }) => {
          this.$nuxt.$loading.finish();
          this.accounts = accounts;
          this.currentPage = meta.current_page;
          this.lastPage = meta.last_page;
        })
        .catch(() => {
          this.$nuxt.$loading.fail();
        });
    },
  },
};
</script>
