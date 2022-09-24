// @ts-nocheck
module.exports = (string) => {
  const ucFirstChar = string.charAt(0).toUpperCase() + string.slice(1);

  return ucFirstChar;
};
