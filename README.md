This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/celarcm/movie-discovery-app.git
cd movie-discovery-app
```

### 2. Install Dependencies

**Note:** This project requires npm to be installed. Due to network restrictions during development, the `node_modules` folder is not included. You'll need to install dependencies:

```bash
npm install
```

### 3. Get TMDB API Key

1. Go to [The Movie Database](https://www.themoviedb.org/)
2. Create a free account
3. Navigate to Settings → API → Request an API Key
4. Choose "Developer" and fill out the form
5. Copy your API Key (v3 auth)

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your TMDB API key:

```
TMDB_API_KEY=your_actual_api_key_here
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 6. Docker

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
