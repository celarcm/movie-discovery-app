This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker

Build and run with Docker:

```bash
# Build the image
docker build -t movie-discovery-app .

# Run (pass your TMDB API key)
docker run -p 3000:3000 -e TMDB_API_KEY=your_api_key movie-discovery-app
```

Or use Docker Compose (set `TMDB_API_KEY` in your environment or a `.env` file):

```bash
docker compose up --build
```

The app will be available at [http://localhost:3000](http://localhost:3000).
