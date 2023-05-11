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

export async function getContentByIdWithImageData(id: string) {
  return prisma.content.findUnique({
    where: { id },
    include: { tags: true, imageData: true },
  });
}

export async function getImage(id: string) {
  return prisma.imageData.findUnique({
    where: { contentId: id },
  });
}

export async function deleteContent(id: string) {
  return prisma.content.delete({ where: { id } });
}

type UpdateContentItem = Pick<
  Content,
  | "id"
  | "title"
  | "description"
  | "url"
  | "featured"
  | "category"
  | "imageText"
  | "author"
  | "createdAt"
> & { image: string };

export async function updateContent(
  { id, image, ...content }: UpdateContentItem,
  tags?: string[]
) {
  const oldTags = await prisma.content.findUnique({
    where: { id },
    select: { tags: { select: { id: true } } },
  });
  const tagsToDelete = oldTags?.tags?.filter((t) => !tags?.includes(t.id));

  return prisma.content.update({
    where: { id: id },
    data: {
      ...content,
      imageData: {
        update: { dataUrl: image },
      },
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

type CreateContentItem = Pick<
  Content,
  | "title"
  | "description"
  | "url"
  | "featured"
  | "category"
  | "imageText"
  | "author"
> & { image: string };
export function createContent(
  { image, ...content }: CreateContentItem,
  tags?: string[]
) {
  return prisma.content.create({
    data: {
      ...content,
      imageData: {
        create: { dataUrl: image },
      },
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
