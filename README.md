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

- Production-ready [SQLite Database](https://sqlite.org)
- [GitHub Actions](https://github.com/features/actions) for running tests and linting
- Email/Password Authentication with [cookie-based sessions](https://remix.run/docs/en/v1/api/remix#createcookiesessionstorage)
- Database ORM with [Prisma](https://prisma.io)
- Styling with [Tailwind](https://tailwindcss.com/)
- Local third party request mocking with [MSW](https://mswjs.io)
- Unit testing with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)

Not a fan of bits of the stack? Fork it, change it, and use `npx create-remix --template your/repo`! Make it your own.

## Development

- This step only applies if you've opted out of having the CLI install dependencies for you:

  ```sh
  npx remix init
  ```

- Initial setup: _If you just generated this project, this step has been done for you._

  ```sh
  npm run setup
  ```

- Start dev server:

  ```sh
  npm run dev
  ```

This starts your app in development mode, rebuilding assets on file changes.

The database seed script creates a new user with some data you can use to get started:

- Email: `rachel@remix.run`
- Password: `racheliscool`

### Relevant code:

This is a pretty simple note-taking app, but it's a good example of how you can build a full stack app with Prisma and Remix. The main functionality is creating users, logging in and out, and creating and deleting notes.

- creating users, and logging in and out [./app/models/user.server.ts](./app/models/user.server.ts)
- user sessions, and verifying them [./app/session.server.ts](./app/session.server.ts)
- creating, and deleting notes [./app/models/note.server.ts](./app/models/note.server.ts)

## GitHub Actions

We use GitHub Actions for continuous integration.

## Testing

### Vitest

For lower level tests of utilities and individual components, we use `vitest`. We have DOM-specific assertion helpers via [`@testing-library/jest-dom`](https://testing-library.com/jest-dom).

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete. To run type checking across the whole project, run `npm run typecheck`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save. There's also a `npm run format` script you can run to format all files in the project.
