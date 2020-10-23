import isNumber from 'is-number';

export const roundNumber = (value, digits = 1) => {
  const parsed = parseFloat(value);
  const factor = 10 ** Math.min(digits, 3);
  return isNumber(parsed) && Math.round(value * factor) / factor;
};

export const formatNumber = (value, intl, digits = 0) =>
  intl.formatNumber(roundNumber(value, digits));

export default { isNumber };
