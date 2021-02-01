export const roundToHundreths = num => {
  return num.toFixed(2);
};

const sign = num => {
  return num >= 0 ? `+${num}` : `${num}`;
};

export const calculateChange = (current, start) => {
  const change = roundToHundreths(current - start);
  return sign(change);
};

export const capitalize = str => {
  return `${str.charAt().toUpperCase()}${str.slice(1)}`;
};
