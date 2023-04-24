import type { Content } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getContent() {
  return prisma.content.findMany({ include: { tags: true, category: true } });
}

export async function getContentById(id: string) {
  return prisma.content.findUnique({
    where: { id },
    include: { tags: true, category: true },
  });
}

export async function deleteContent(id: string) {
  return prisma.content.delete({ where: { id } });
}

export function updateContent(
  {
    id,
    title,
    description,
    url,
    featured,
    categoryId,
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
    | "categoryId"
    | "image"
    | "imageText"
    | "author"
    | "createdAt"
  >,
  tags?: string[]
) {
  return prisma.content.update({
    where: { id },
    data: {
      title,
      description,
      url,
      featured,
      categoryId,
      image,
      imageText,
      author,
      createdAt,
      tags: {
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

export async function getNewestContent(numberOfItems: number) {
  return prisma.content.findMany({
    take: numberOfItems,
    orderBy: {
      createdAt: "desc",
    },
    include: { tags: true, category: true },
  });
}

export async function getVideos() {
  return prisma.content.findMany({
    where: { category: { text: "Video" } },
  });
}

export async function getVideo(id: string) {
  return prisma.content.findUnique({ where: { id } });
}

export async function getNumVideos() {
  return prisma.content.count({
    where: { category: { text: "Video" } },
  });
}

export function createContent(
  {
    title,
    description,
    url,
    featured,
    categoryId,
    image,
    imageText,
    author,
  }: Pick<
    Content,
    | "title"
    | "description"
    | "url"
    | "featured"
    | "categoryId"
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
      categoryId,
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
    where: { category: { text: "Bloggpost" } },
  });
}

export async function getNumBlogposts() {
  return prisma.content.count({
    where: { category: { text: "Bloggpost" } },
  });
}

export async function getCourses() {
  return prisma.content.findMany({
    where: { category: { text: "Kurs" } },
  });
}

export async function getCourse(id: string) {
  return prisma.content.findUnique({ where: { id } });
}

export async function getNumCourses() {
  return prisma.content.count({
    where: { category: { text: "Kurs" } },
  });
}

export async function getLectures() {
  return prisma.content.findMany({
    where: { category: { text: "Foredrag" } },
  });
}

export async function getNumLectures() {
  return prisma.content.count({
    where: { category: { text: "Foredrag" } },
  });
}
