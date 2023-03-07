import { prisma } from "~/db.server";

export async function getBlogposts() {
  return prisma.blogposts.findMany();
}

export async function getBlogpost(id: string) {
  return prisma.blogposts.findUnique({ where: { id } });
}
