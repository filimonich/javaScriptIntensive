let counter = 0;

export default () => ++counter;

export const double = () => {
  counter *= 2;
  return counter;
};

export const reset = () => {
  counter = 0;
  return counter;
};
