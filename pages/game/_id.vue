<template>
  <!-- This is detail game page -->
  <div>
    <FrameBox>
      <GameForm :game="game">
        <template #title> Thông tin game </template>
        <template #description> this is description </template>
        <template #actions>
          <div class="flex flex-row-reverse">
            <ButtonPrimary>Cập nhật</ButtonPrimary>
          </div>
        </template>
      </GameForm>

      <div class="mt-8">
        <!-- Heading with search -->
        <div class="flex items-center justify-between mb-4">
          <HeadingBase3>Danh sách kiểu tài khoản của game</HeadingBase3>
          <SearchWithSort placeholder="Search..."></SearchWithSort>
        </div>

        <AccountTypeList :account-types="accountTypes"></AccountTypeList>

        <PaginationCenteredNumbers
          v-model="currentAccountTypePage"
          class="mt-4"
          :last-page="3"
        />
      </div>
    </FrameBox>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      currentAccountTypePage: 1,
      game: {},
      accountTypes: [
        {
          id: 1,
          name: 'đăng ký ảo',
          updatedAt: '1234-t6-201',
        },
        {
          id: 2,
          name: 'đăng ký ảo',
          updatedAt: '1234-t6-201',
        },
        {
          id: 3,
          name: 'đăng ký ảo',
          updatedAt: '1234-t6-201',
        },
        {
          id: 4,
          name: 'đăng ký ảo',
          updatedAt: '1234-t6-201',
        },
        {
          id: 5,
          name: 'đăng ký ảo',
          updatedAt: '1234-t6-201',
        },
      ],
    };
  },
};
</script>
