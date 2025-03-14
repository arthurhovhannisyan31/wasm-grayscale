export const stopImmediatePropagation = (
  e: UIEvent,
): void => {
  e.preventDefault();
  e.stopPropagation();
};
