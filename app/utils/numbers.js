import isNumber from 'is-number';

export const roundNumber = (value, digits = 1) => {
  const parsed = parseFloat(value);
  const factor = 10 ** Math.min(digits, 3);
  return isNumber(parsed) && Math.round(value * factor) / factor;
};

export const formatNumber = (value, intl, digits = 0) =>
  intl.formatNumber(roundNumber(value, digits));

export const formatAreaRelative = (value, intl) => {
  if (value < 0.01) {
    return formatNumber(value * 100, intl, 2);
  }
  if (value < 0.001) {
    return formatNumber(value * 100, intl, 3);
  }
  if (value < 0.0001) {
    return formatNumber(value * 100, intl, 4);
  }
  return formatNumber(value * 100, intl, 1);
};

export default { isNumber };
