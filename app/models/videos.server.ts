import { Videos } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getVideos() {
  return prisma.videos.findMany();
}

export async function getVideo(id: string) {
  return prisma.videos.findUnique({ where: { id } });
}

export async function getNumVideos() {
  return prisma.videos.count();
}

export function createVideo({
  title,
  description,
  youtubeid,
  suggested,
}: Pick<Videos, "title" | "description" | "youtubeid" | "suggested">) {
  return prisma.videos.create({
    data: {
      title,
      description,
      youtubeid,
      suggested,
    },
  });
}
