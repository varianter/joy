import type { Content, Tag } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";

export function validateExample(tall1: number, tall2: number) {
  return tall1 + tall2;
}

export const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString("nb");

export const isValidUrl = (str: string) => {
  try {
    new URL(str);
    return true;
  } catch (err) {
    return false;
  }
};

export enum Category {
  Blogpost = "Bloggpost",
  Course = "Kurs",
  Video = "Video",
  Podcast = "Podkast",
  Lecture = "Foredrag",
}

export const CATEGORIES = [
  Category.Blogpost,
  Category.Course,
  Category.Video,
  Category.Podcast,
  Category.Lecture,
];

export const getIconForCategory = (category: string) => {
  switch (category) {
    case Category.Blogpost:
      return "blogpost";
    case Category.Course:
      return "course";
    case Category.Video:
      return "video";
    case Category.Podcast:
      return "podcast";
    case Category.Lecture:
      return "lecture";
  }
};

export const getButtonText = (category: string) => {
  switch (category) {
    case Category.Blogpost:
      return "Les artikkel";
    case Category.Video:
      return "Se video";
    case Category.Podcast:
      return "Hør podkast";
    case Category.Course:
      return "Se kurs";
    case Category.Lecture:
      return "Se foredrag";
    default:
      return "";
  }
};

export const separateFeaturedAndOtherContent = (allContent: SerializeFrom<(Content & { tags?: Tag[]})[]>) => {
  const featured = allContent.filter((content) => content.featured).slice(0, 3);
  const other = allContent.filter((content) => !featured.includes(content))

  return [featured, other];
}
