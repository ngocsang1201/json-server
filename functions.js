export const randomNumber = (min, max) => {
  return Math.trunc(Math.random() * (max - min + 1) + min);
};
