import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  const posts = [
    {
      slug: "my-first-post",
      title: "My First Post",
      markdown: `
# This is my first post

Isn't it great?
    `.trim(),
    },
    {
      slug: "90s-mixtape",
      title: "A Mixtape I Made Just For You",
      markdown: `
# 90s Mixtape

- I wish (Skee-Lo)
- This Is How We Do It (Montell Jordan)
- Everlong (Foo Fighters)
- Ms. Jackson (Outkast)
- Interstate Love Song (Stone Temple Pilots)
- Killing Me Softly With His Song (Fugees, Ms. Lauryn Hill)
- Just a Friend (Biz Markie)
- The Man Who Sold The World (Nirvana)
- Semi-Charmed Life (Third Eye Blind)
- ...Baby One More Time (Britney Spears)
- Better Man (Pearl Jam)
- It's All Coming Back to Me Now (Céline Dion)
- This Kiss (Faith Hill)
- Fly Away (Lenny Kravits)
- Scar Tissue (Red Hot Chili Peppers)
- Santa Monica (Everclear)
- C'mon N' Ride it (Quad City DJ's)
    `.trim(),
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  const videos = [
    {
      id: randomUUID(),
      title: "Lyntale: Sarah Serussi - Introduksjon til API",
      description:
        "Hva er et API? Hvordan brukes det? Hva er GET, POST og PUT?! I denne lyntalen gir Sarah deg en introduksjon til nettopp dette, med gode forklaringer og ekte eksempler ved bruk av Spotifys API.",
      uri: "n5Ik3vwIrFk",
    },
    {
      id: randomUUID(),
      title: "Lyntale: Vikas Gupta - Introduksjon til Interaksjonsdesign",
      description:
        "I denne videoen gir Vikas deg en introduksjon til interaksjonsdesign. Gjennom en historie i flere akter forklarer han hvordan interaksjonsdesign kan introduseres i en organisasjon.",
      uri: "unZ5ksYj2r0",
    },
    {
      id: randomUUID(),
      title: "Lyntale: Marius Krakeli - Introduksjon til CSS",
      description:
        "Det er bare fantasien som setter grenser for hva man kan lage med CSS. I denne lyntalen forklarer Marius forholdet mellom HTML og CSS og han viser hvordan man kan komme i gang med enkel layout ved hjelp av CSS Grid. I tillegg forsøker han seg på litt mer avansert CSS i håp om å inspirere til videre læring.",
      uri: "mnMnXED2Ro4",
    },
  ];

  for (const video of videos) {
    await prisma.videos.upsert({
      where: { id: video.id },
      update: video,
      create: video,
    });
  }

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
