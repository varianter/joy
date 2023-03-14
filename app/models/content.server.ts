import { Content, Tag } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getContent() {
  return prisma.content.findMany();
}

export async function getVideos() {
  return prisma.content.findMany({
    where: { category: { text: "Video" } },
  });
}

export async function getVideo(id: string) {
  return prisma.content.findUnique({ where: { id } });
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
    author
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
