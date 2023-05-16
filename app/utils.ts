import type { Content, Tag } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";

export function validateExample(tall1: number, tall2: number) {
  return tall1 + tall2;
}

export const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString("nb-NO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

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

export const getIconForCategory = (category: string, isActive?: boolean) => {
  switch (category) {
    case Category.Blogpost:
      if (isActive) return "blogpost_dark";
      return "blogpost";
    case Category.Lecture:
      if (isActive) return "lecture_dark";
      return "lecture";
    case Category.Course:
      if (isActive) return "course_dark";
      return "course";
    case Category.Video:
      if (isActive) return "video_dark";
      return "video";
    case Category.Podcast:
      if (isActive) return "podcast_dark";
      return "podcast";
  }
};

export const getButtonText = (category: string) => {
  switch (category) {
    case Category.Blogpost:
      return "Les bloggpost";
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

export const separateFeaturedAndOtherContent = (
  allContent: SerializeFrom<(Content & { tags?: Tag[] })[]>
) => {
  const featured = allContent.filter((content) => content.featured).slice(0, 2);
  const other = allContent.filter((content) => !featured.includes(content));

  return [featured, other];
};
