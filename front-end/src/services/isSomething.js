export const isSomething = (item) => {
  if (typeof item === "undefined" || item === null || !item.length) {
    return false;
  } else {
    return true;
  }
};
