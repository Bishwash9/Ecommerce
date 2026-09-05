# Docker setup

The Compose stack runs the customer-facing Next.js app, the Express API, and MongoDB.

## Configure

The backend already uses `apps/backend/.env`. If that file is missing, create it from the example and replace every placeholder with a real secret or Cloudinary credential:

```sh
cp apps/backend/.env.example apps/backend/.env
```

Optionally copy the root example to customize ports, local MongoDB credentials, or public URLs:

```sh
cp .env.example .env
```

## Run

```sh
docker compose up --build
```

Open the customer frontend at <http://localhost:3000>. The API is available at <http://localhost:5001/api>, and MongoDB is exposed on port `27017`.

Stop the containers without removing stored database data:

```sh
docker compose down
```

To also delete the MongoDB volume and all of its data, explicitly run `docker compose down --volumes`.
