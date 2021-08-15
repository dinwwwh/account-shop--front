<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  v-for="field in fields"
                  :key="field"
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  <template v-if="field === 'game/username'">
                    game/username
                  </template>
                  <template v-else-if="field === 'price/cost'">
                    price/cost
                  </template>
                  <template v-else-if="field === 'sold-price'">
                    sold price
                  </template>
                  <template v-else-if="field === 'sold-at'"> sold at </template>
                  <template v-else-if="field === 'status'"> status </template>
                  <template v-else-if="field === 'owner'"> owner </template>
                  <template v-else-if="field === 'actions'">
                    <span class="sr-only">actions</span>
                  </template>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <!-- Items -->
              <AccountTableItem
                v-for="account in accounts"
                :key="account.id"
                :account="account"
                :fields="fields"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Case: empty accounts -->
    <div v-if="!accounts.length" class="mt-4">
      <p
        class="
          font-extralight
          tracking-widest
          text-gray-400 text-lg text-center
        "
      >
        Không tìm thấy tài khoản nào
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    accounts: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
      default: () => [
        'game/username',
        'price/cost',
        'status',
        'owner',
        'actions',
      ],
    },
  },
};
</script>
