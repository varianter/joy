import { Content, Tag } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getContent() {
  return prisma.content.findMany();
}

export async function getNumNewestContent(numItems: number) {
  return prisma.content.findMany({
    take: numItems,
    orderBy: {
      createdAt: "desc",
    },
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
    suggested,
    categoryId,
    image,
    imageText,
    author,
  }: Pick<
    Content,
    | "title"
    | "description"
    | "url"
    | "suggested"
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
      suggested,
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
