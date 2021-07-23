import formatNumber from 'format-number';

export function rand(min, max) {
  return min + Math.round(Math.random() * (max - min));
}

export function format(number) {
  return formatNumber()(number);
}
