# Application Tracker

Full-stack job application tracker built with a Vite + React frontend, an Express API, and PostgreSQL for persistence.

## Features

- Create and view job applications with company, role, status, notes, salary, and link details.
- Status analytics displayed in the dashboard header.
- Shared Zod schema keeps frontend form types and backend validation in sync.
- Prisma ORM manages the Postgres schema, migrations, and seed data.

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, TypeScript
- **Backend:** Node.js, Express 5, Prisma 6, Zod
- **Database:** PostgreSQL 16 (or compatible)

## Prerequisites

- Node.js 18+
- npm 9+
- PostgreSQL running locally (or a connection string to a hosted instance)

## Project Structure

```
application-tracker/
├── src/                 # React app
├── server/              # Express API + Prisma
├── shared/              # Shared Zod schema & types
└── prisma/              # Database migrations (generated under server/)
```

## Setup

1. **Clone and install**

   ```bash
   git clone https://github.com/your-username/application-tracker.git
   cd application-tracker
   npm install
   ```

2. **Install server dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Configure environment**
   Copy `server/.env.example` (if present) or create `server/.env` with your database URL:

   ```ini
   DATABASE_URL="postgresql://<user>:<password>@localhost:5432/application_tracker?schema=public"
   PORT=4000
   ```

4. **Create the database**

   ```bash
   createdb application_tracker
   ```

   Ensure the user in `DATABASE_URL` owns the database or has full privileges on the `public` schema.

5. **Run migrations & seed data**
   ```bash
   cd server
   npx prisma migrate dev --name init-applications
   npx prisma db seed
   ```

## Development

Open two terminals:

1. **API server**

   ```bash
   cd server
   npm run dev
   ```

   Runs Express on `http://localhost:4000` with live reload (`tsx watch`).

2. **Frontend**
   ```bash
   cd application-tracker  # project root
   npm run dev
   ```
   Vite serves the app on `http://localhost:5173` and proxies `/api` requests to the Express server.

Visit `http://localhost:5173` to use the application. Submitting the form triggers `POST /api/applications` and newly created records appear immediately.

## Available Scripts

- `npm run dev` (root): start the Vite frontend.
- `npm run dev` (server/): start the Express API in watch mode.
- `npm run build` (root): build the React app.
- `npm run build` (server/): type-check the API.
- `npx prisma migrate dev` (server/): apply migrations.
- `npx prisma db seed` (server/): seed the database.

## Troubleshooting

- **Cannot connect to database:** verify Postgres is running, credentials are correct, and the user has access to the database.
- **Path alias errors (`@shared/...`):** restart Vite and ensure `vite.config.ts` includes the alias pointing to the `shared/` directory.
- **Prisma client errors:** rerun `npx prisma generate` inside `server/` after schema changes.

## Contributing

Issues and pull requests are welcome! Before submitting a PR, ensure linting passes and tests (if added) succeed.

## License

MIT
