# Joy - en hub for læreglede

Vi i Variant lager og holder en del kurs og foredrag i flere sammenhenger. Vi har noen bloggposter her, noen YouTube-videoer der og noen foredrag en annen plass. Vi har læringsmateriell på vår nettside, på bloggen vår, på YouTube, på konferansesider og en del på våre interne kanaler som Docs og Slack. Med denne huben ønsker vi å samle dette. Denne huben skal være åpen for både varianter og ikke-varianter.

Laget med Remix Indie Stack. Les mer om [Remix Stacks](https://remix.run/stacks).

## Hvordan kjøre opp prosjektet

- Last ned koden (clone-knapp i Github)
- Lag en kopi av .env.example-filen, og kall den .env
- Legg til miljøvariabler i .env-filen (spør noen Varianter om de riktige verdiene)
- Kjør `npm install` for å installere pakker
- Kjør `npx prisma generate` for å generere typer
- Kjør `npm run dev` for å kjøre opp lokalt
- Nå skal prosjektet vises på `http://localhost:3000`

## What's in the stack

Vi har brukt Remix sitt forhåndsvalg for oppsett, men har gjort noen justeringer.

- ~~Production-ready [SQLite Database](https://sqlite.org)~~ Vi bruker [CockroachDB](https://www.cockroachlabs.com/) isteden
- [GitHub Actions](https://github.com/features/actions) for linting
- ~~Email/Password Authentication with [cookie-based sessions](https://remix.run/docs/en/v1/api/remix#createcookiesessionstorage)~~ Vi bruker Microsoft sin autentisering med Variant-eposter.
- Database ORM med [Prisma](https://prisma.io)
- Styling med [Tailwind](https://tailwindcss.com/)
- ~~Local third party request mocking with [MSW](https://mswjs.io)~~
- ~~Unit testing with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com)~~
- Kodeformattering med [Prettier](https://prettier.io)
- Linting med [ESLint](https://eslint.org)
- Statiske typer med [TypeScript](https://typescriptlang.org)
- Deployment med [Vercel](https://vercel.com/)
