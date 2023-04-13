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

export const getIconForCategory = (category: string) => {
  switch (category.toLowerCase()) {
    case "bloggpost":
      return "blogpost";
    case "kurs":
      return "course";
    case "video":
      return "video";
    case "podcast":
      return "podcast";
    case "foredrag":
      return "lecture";
  }
};