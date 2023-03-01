import { prisma } from "~/db.server";

export async function getVideos() {
  return prisma.videos.findMany();
}

export async function getVideo(id: string) {
  return prisma.videos.findUnique({ where: { id } });
}
