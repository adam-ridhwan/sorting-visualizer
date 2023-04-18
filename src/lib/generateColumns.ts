export const generateColumns = (count: number) => {
  let columns = [];
  for (let i = 0; i < count; i++) {
    columns.push(i + 1);
  }
  return columns;
};
