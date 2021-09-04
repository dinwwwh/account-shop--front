<template>
  <tr>
    <td
      v-for="field in fields"
      :key="field"
      class="px-6 py-4 whitespace-nowrap"
    >
      <!-- KEY -->
      <span v-if="field === 'key'" class="text-sm text-gray-900">
        {{ config.key }}
      </span>

      <!-- DATA -->
      <span v-else-if="field === 'data'" class="text-sm text-gray-600 truncate">
        {{ constraintLength(config.data, 20) }}
      </span>

      <!-- DESCRIPTION -->
      <span
        v-else-if="field === 'description'"
        class="text-sm text-gray-600 truncate"
      >
        {{ constraintLength(config.description, 20) }}
      </span>

      <!-- DESCRIPTION -->
      <span
        v-else-if="field === 'structure-description'"
        class="text-sm text-gray-600 truncate"
      >
        {{ constraintLength(config.structureDescription, 20) }}
      </span>

      <!-- ACTIONS -->
      <div v-else-if="field === 'actions'">
        <ConfigTableActions :config="config" />
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
  },
  methods: {
    constraintLength(data, length) {
      let str = String(data);
      if (length < str.length) {
        str = str.slice(length) + '...';
      }
      return str;
    },
  },
};
</script>
