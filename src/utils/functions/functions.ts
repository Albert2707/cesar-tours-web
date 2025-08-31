export const generateTimeOptions = () => {
  const options = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 5) {
      const hour = h.toString().padStart(2, "0");
      const minute = m.toString().padStart(2, "0");
      options.push({
        value: `${hour}:${minute}`,
        label: `${hour}:${minute}`,
      });
    }
  }
  return options;
};

export const translateCountry = (
  arr: string,
  textToBeReplace: string,
  textToReplace: string
): string => {
  return arr
    .split(",")
    .map((e) => {
      if (e === textToBeReplace) return textToReplace;
      return e;
    })
    .join(",");
};
