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

  const result = { $each: {} };
  const validators = this.$vuelidate.validators;

  if (isRequired) {
    result.required = validators.required;
    result.minLength = validators.minLength(1);
    result.$each.required = validators.required;
  }

  if (rule.datatype === 'integer') {
    result.$each.integer = validators.integer;
  }

  if (this.$typeCheck('Array', rule.allowableValues)) {
    result.$each.in = validators.in(rule.allowableValues);
  }

  if (this.$typeCheck('Number', rule.allowableNumber)) {
    result.maxLength = validators.maxLength(rule.allowableNumber);
  }

  return result;
}
