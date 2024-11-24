export const compactNumber = (value?: string | number) => {
  const newValue = Number(value || 0);
  const formatter = new Intl.NumberFormat("id-ID", { notation: "compact" });
  return formatter.format(newValue);
};
