<template>
  <div>
    <FrameBox>
      <AccountTypeForm :account-type="accountType">
        <template #title> Thông tin kiểu tài khoản </template>
        <template #description> </template>
        <template #actions>
          <div class="flex flex-row-reverse">
            <ButtonPrimary>Cập nhật</ButtonPrimary>
          </div>
        </template>
      </AccountTypeForm>

      <!-- List account infos -->
      <div class="mt-8">
        <div class="flex items-center justify-between mb-4">
          <HeadingBase3>Danh sách thông tin tài khoản</HeadingBase3>
          <SearchWithSort placeholder="Search..."></SearchWithSort>
        </div>

        <AccountInfoList :account-infos="accountInfos" />
        <PaginationCenteredNumbers
          v-model="currentAccountInfoPage"
          class="mt-4"
          :last-page="5"
        />
      </div>

      <!-- List account actions -->
      <div class="mt-16">
        <div class="flex items-center justify-between mb-4">
          <HeadingBase3>Danh sách hành động tài khoản</HeadingBase3>
          <SearchWithSort placeholder="Search..."></SearchWithSort>
        </div>

        <AccountActionList :account-actions="accountActions" />
        <PaginationCenteredNumbers
          v-model="currentAccountActionPage"
          class="mt-4"
          :last-page="8"
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
      currentAccountActionPage: 3,
      currentAccountInfoPage: 3,
      accountType: {},
      accountInfos: [
        {
          id: 1,
          name: 'Số điện thoại',
          updatedAt: '1234-t6-201',
        },
        {
          id: 2,
          name: 'Địa chỉ',
          updatedAt: '1234-t6-201',
        },
        {
          id: 3,
          name: 'ready',
          updatedAt: '1234-t6-201',
        },
        {
          id: 4,
          name: ':))',
          updatedAt: '1234-t6-201',
        },
        {
          id: 5,
          name: 'bilibiligameing',
          updatedAt: '1234-t6-201',
        },
      ],
      accountActions: [
        {
          id: 1,
          name: 'Đổi số điện thoại',
          updatedAt: '1234-t6-201',
        },
        {
          id: 2,
          name: 'Đổi email',
          updatedAt: '1234-t6-201',
        },
        {
          id: 3,
          name: 'ready',
          updatedAt: '1234-t6-201',
        },
        {
          id: 4,
          name: ':))',
          updatedAt: '1234-t6-201',
        },
        {
          id: 5,
          name: 'bilibiligameing',
          updatedAt: '1234-t6-201',
        },
      ],
    };
  },
};
</script>
