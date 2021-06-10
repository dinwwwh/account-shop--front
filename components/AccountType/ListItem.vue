<template>
  <li>
    <NuxtLink
      :to="`/account-type/${accountType.id}`"
      class="block hover:bg-gray-50"
    >
      <div class="px-4 py-4 sm:px-6">
        <div class="flex items-center justify-between">
          <p class="text-sm font-medium text-indigo-600 truncate">
            {{ accountType.name }}
          </p>
          <div class="ml-2 flex-shrink-0 flex">
            <p
              class="
                px-2
                inline-flex
                text-xs
                leading-5
                font-semibold
                rounded-full
                bg-green-100
                text-green-800
              "
            >
              Full-time
            </p>
          </div>
        </div>
        <div class="mt-2 sm:flex sm:justify-between">
          <div class="sm:flex">
            <p class="flex items-center text-sm text-gray-500">
              <!-- Heroicon name: solid/users -->
              <IconUsers class="size-lg mr-1.5 text-gray-400" />
              Engineering
            </p>
            <p
              class="
                mt-2
                flex
                items-center
                text-sm text-gray-500
                sm:mt-0 sm:ml-6
              "
            >
              <IconLocationMarker class="size-lg mr-1.5 text-gray-400" />
              Remote
            </p>
          </div>
          <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
            <IconCalendarEdit class="mr-1.5 size-lg text-gray-400" />
            <p>
              Cập nhật lần cuối
              <time datetime="2020-01-07">{{
                $moment.fromNow(accountType.updatedAt)
              }}</time>
            </p>
          </div>
        </div>
      </div>
    </NuxtLink>
  </li>
</template>

<script>
export default {
  props: {
    // accountType object used to render
    accountType: {
      type: Object,
      required: true,
    },
  },
};
</script>
