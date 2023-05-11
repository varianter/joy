import type { Content } from "@prisma/client";
import { prisma } from "~/db.server";
import { Category } from "~/utils";

export async function getContent() {
  return prisma.content.findMany({ include: { tags: true } });
}

export async function getContentById(id: string) {
  return prisma.content.findUnique({
    where: { id },
    include: { tags: true },
  });
}

export async function deleteContent(id: string) {
  return prisma.content.delete({ where: { id } });
}

export async function updateContent(
  {
    id,
    title,
    description,
    url,
    featured,
    category,
    image,
    imageText,
    author,
    createdAt,
  }: Pick<
    Content,
    | "id"
    | "title"
    | "description"
    | "url"
    | "featured"
    | "category"
    | "image"
    | "imageText"
    | "author"
    | "createdAt"
  >,
  tags?: string[]
) {
  const oldTags = await prisma.content.findUnique({
    where: { id },
    select: { tags: { select: { id: true } } },
  });
  const tagsToDelete = oldTags?.tags?.filter((t) => !tags?.includes(t.id));

  return prisma.content.update({
    where: { id },
    data: {
      title,
      description,
      url,
      featured,
      category,
      image,
      imageText,
      author,
      createdAt,
      tags: {
        disconnect: tagsToDelete?.map((t) => {
          return { id: t.id };
        }),
        connect: tags?.map((t) => {
          return { id: t };
        }),
      },
    },
  });
}

export async function searchContent(search: string) {
  return prisma.content.findMany({
    where: {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { author: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { tags: { some: { text: { contains: search, mode: "insensitive" } } } },
      ],
    },
    include: { tags: true },
  });
}

export async function getNewestFeaturedContent(numberOfItems: number) {
  return prisma.content.findMany({
    where: { featured: true },
    take: numberOfItems,
    orderBy: {
      createdAt: "desc",
    },
    include: { tags: true },
  });
}

export async function getVideos() {
  return prisma.content.findMany({
    where: { category: Category.Video },
  });
}

export async function getVideo(id: string) {
  return prisma.content.findUnique({ where: { id } });
}

export async function getNumberOfVideos() {
  return prisma.content.count({
    where: { category: Category.Video },
  });
}

export function createContent(
  {
    title,
    description,
    url,
    featured,
    category,
    image,
    imageText,
    author,
  }: Pick<
    Content,
    | "title"
    | "description"
    | "url"
    | "featured"
    | "category"
    | "image"
    | "imageText"
    | "author"
  >,
  tags?: string[]
) {
  return prisma.content.create({
    data: {
      title,
      description,
      url,
      featured,
      category,
      image,
      imageText,
      author,
      tags: {
        connect: tags?.map((t) => {
          return { id: t };
        }),
      },
    },
  });
}

export async function getBlogposts() {
  return prisma.content.findMany({
    where: { category: Category.Blogpost },
  });
}

export async function getNumberOfBlogposts() {
  return prisma.content.count({
    where: { category: Category.Blogpost },
  });
}

export async function getCourses() {
  return prisma.content.findMany({
    where: { category: Category.Course },
  });
}

export async function getCourseById(id: string) {
  return prisma.content.findUnique({ where: { id } });
}

export async function getNumberOfCourses() {
  return prisma.content.count({
    where: { category: Category.Course },
  });
}

export async function getLectures() {
  return prisma.content.findMany({
    where: { category: Category.Lecture },
  });
}

export async function getNumberOfLectures() {
  return prisma.content.count({
    where: { category: Category.Lecture },
  });
}

export async function getPodcasts() {
  return prisma.content.findMany({
    where: { category: Category.Podcast },
  });
}

export async function getNumberOfPodcasts() {
  return prisma.content.count({
    where: { category: Category.Podcast },
  });
}
