<template>
  <NuxtLink
    :to="{ name: 'game-id', params: { id: game.id } }"
    class="block hover:bg-gray-50"
  >
    <div class="px-4 py-4 flex items-center sm:px-6">
      <div class="flex-shrink-0">
        <img
          class="h-12 w-12 rounded-full"
          :src="game.imagePath"
          alt="avatar"
        />
      </div>
      <div
        class="min-w-0 flex-1 px-4 sm:flex sm:items-center sm:justify-between"
      >
        <div class="truncate">
          <div class="flex text-sm">
            <p class="font-medium text-indigo-600 truncate">
              {{ game.name }}
            </p>
            <p class="ml-1 flex-shrink-0 font-normal text-gray-500">
              ({{ game.publisherName }})
            </p>
          </div>
          <div class="mt-2 flex">
            <div class="flex items-center text-sm text-gray-500">
              <!-- Heroicon name: solid/calendar -->
              <svg
                class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                />
              </svg>
              <p>
                Cập nhật lần cuối
                <time datetime="2020-01-07">
                  {{ $moment.fromNow(game.updatedAt) }}
                </time>
              </p>
            </div>
          </div>
        </div>
        <!-- <div class="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
            <div class="flex overflow-hidden -space-x-1">
              <img
                class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=NiNLTWFfPJ&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Whitney Francis"
              />

              <img
                class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixqx=NiNLTWFfPJ&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Leonard Krasner"
              />

              <img
                class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixqx=NiNLTWFfPJ&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Floyd Miles"
              />
            </div>
          </div> -->
      </div>
      <div class="ml-5 flex-shrink-0">
        <!-- Heroicon name: solid/chevron-right -->
        <svg
          class="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    // game object used to render
    game: {
      type: Object,
      required: true,
    },
  },
};
</script>
