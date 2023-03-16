export function validateExample(tall1: number, tall2: number) {
  return tall1 + tall2;
}

export const isValidUrl = (str: string) => {
  try {
    new URL(str);
    return true;
  } catch (err) {
    return false;
  }
};

