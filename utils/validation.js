export function generateValidatorsFromRule(rule, user = null) {
  user = user ?? this.$store.state.auth.profile;
  let isRequired = false;
  if (rule.required) {
    if (!rule.unrequiredUsers.find(({ id }) => id === user.id)) {
      isRequired = true;
    }
  } else if (rule.requiredUsers.find(({ id }) => id === user.id)) {
    isRequired = true;
  }

  let result = {};
  const validators = this.$vuelidate.validators;

  if (isRequired) {
    result.required = validators.required;
  }

  if (rule.datatype === 'integer') {
    result.integer = validators.integer;
  }

  if (this.$typeCheck('Array', rule.values)) {
    result.in = validators.in(rule.values);
  }

  if (rule.multiple) {
    result = { $each: result };
  }

  return result;
}
