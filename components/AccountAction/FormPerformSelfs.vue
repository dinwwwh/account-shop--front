<template>
  <div>
    <ul class="space-y-4">
      <li
        v-for="accountAction in customizedAccountActions"
        :key="accountAction.id"
      >
        <div
          class="bg-white rounded-md shadow-sm py-4 px-6 border-solid"
          :class="{
            'border border-gray-500': !(isInvalid(accountAction) && isTouched),
            'border-2 border-red-500': isInvalid(accountAction) && isTouched,
          }"
        >
          <HeadingBase3>
            {{ accountAction.name }}
            <span
              v-if="isRequired(accountAction)"
              class="text-sm text-gray-500"
            >
              (Bắt buộc)
            </span>
          </HeadingBase3>
          <p class="texts-sm text-gray-600">
            {{ accountAction.description }}
          </p>
          <!-- Actions -->
          <div class="flex flex-row-reverse items-center gap-4 mt-4">
            <template v-if="!accountAction.isDone">
              <ButtonPrimary
                theme="green"
                @click="
                  performedAccountActions[`${accountAction.id}`] = {
                    isDone: true,
                  };
                  accountAction.isDone = true;
                "
              >
                Xác nhận đã hoàn thành
              </ButtonPrimary>
            </template>
            <template v-else>
              <ButtonPrimary
                theme="red"
                @click="
                  performedAccountActions[`${accountAction.id}`] = {
                    isDone: false,
                  };
                  accountAction.isDone = false;
                "
              >
                Hoàn tác
              </ButtonPrimary>
            </template>
            <a
              v-if="accountAction.videoPath"
              :href="accountAction.videoPath"
              target="_black"
            >
              <ButtonPrimary> Xem video hướng dẫn </ButtonPrimary>
            </a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import typeCheck from 'type-check';

export default {
  model: {
    prop: 'model',
    event: 'change',
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    accountActions: {
      type: Array,
      required: true,
      validator(accountActions) {
        return !accountActions.some(({ rule }) => !typeCheck('Object', rule));
      },
    },
  },
  data() {
    return {
      customizedAccountActions: [],
      isTouched: false,
    };
  },
  computed: {
    performedAccountActions: {
      get() {
        return this.model;
      },
      set(val) {
        this.$emit('change', val);
      },
    },
    // Central panel
    panel() {
      return {
        customizedAccountActions: this.customizedAccountActions,
        check: () => {
          this.isTouched = true;

          for (const accountAction of this.customizedAccountActions) {
            if (this.isInvalid(accountAction)) return { isInvalid: true };
          }

          return {
            isInvalid: false,
          };
        },
      };
    },
  },
  created() {
    this.$emit('emit-panel', this.panel);
    this.generateCustomizedAccountActions();
  },
  methods: {
    isRequired(accountAction) {
      const rule = accountAction.rule;
      const user = this.$store.state.auth.profile;
      let isRequired = false;
      if (rule.required) {
        if (!rule.unrequiredUsers.find(({ id }) => id === user.id)) {
          isRequired = true;
        }
      } else if (rule.requiredUsers.find(({ id }) => id === user.id)) {
        isRequired = true;
      }
      return isRequired;
    },
    isInvalid(accountAction) {
      if (this.isRequired(accountAction) && !accountAction.isDone) return true;
      return false;
    },
    // we need this method because can't watch performedAccountActions change
    generateCustomizedAccountActions() {
      this.customizedAccountActions = this.accountActions.map(
        (accountAction) => ({
          ...accountAction,
          isDone: !!this.performedAccountActions[`${accountAction.id}`],
        })
      );
    },
  },
};
</script>
