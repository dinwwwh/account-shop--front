<template>
  <tr>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center">
        <div class="flex-shrink-0 h-10 w-10">
          <img
            class="h-10 w-10 rounded-full"
            :src="game.representativeImage.path"
          />
        </div>
        <div class="ml-4">
          <div class="text-sm font-medium text-gray-900">
            {{ game.name }}
            <span class="text-xs font-normal">
              ({{ game.publisherName }})
            </span>
          </div>
          <div class="text-sm text-gray-500">{{ account.username }}</div>
        </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="text-sm text-gray-900">
        {{ formatNumber()(account.price) }}đ
      </div>
      <div class="text-sm text-gray-500">
        {{ formatNumber()(account.cost) }}đ
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <span
        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
        :class="getClassNameByStatusCode(account.statusCode)"
      >
        {{ getStatusCodeMeaning(account.statusCode) }}
      </span>
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {{ creator.name }}
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <!-- Link to view detail account -->
      <NuxtLink
        :to="{
          name: 'account-id',
          params: {
            id: account.id,
          },
        }"
        class="text-gray-600 hover:text-indigo-600"
      >
        <IconEye class="size-xl" />
      </NuxtLink>
    </td>
  </tr>
</template>

<script>
import { typeCheck } from 'type-check';
import formatNumber from 'format-number';
import {
  getStatusCodeMeaning,
  getClassNameByStatusCode,
} from '~/utils/status-code';

export default {
  props: {
    account: {
      type: Object,
      required: true,
      validator(account) {
        return typeCheck('Object', account.accountType.game);
      },
    },
  },
  computed: {
    game() {
      const rootGame = this.account.accountType.game;
      const representativeImage =
        this.account.accountType.game.representativeImage ?? {};

      return {
        ...rootGame,
        representativeImage,
      };
    },
    creator() {
      return this.account.creator ?? {};
    },
  },
  methods: {
    formatNumber,
    getStatusCodeMeaning,
    getClassNameByStatusCode,
  },
};
</script>
