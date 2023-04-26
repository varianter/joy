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

export enum Category {
  Blogpost = "Bloggpost",
  Course = "Kurs",
  Video = "Video",
  Podcast = "Podcast",
  Lecture = "Foredrag",
}

export const CATEGORIES = [
  Category.Blogpost,
  Category.Course,
  Category.Video,
  Category.Podcast,
  Category.Lecture,
];
