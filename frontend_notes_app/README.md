# Ocean Notes – React Frontend

A lightweight personal notes app with a modern Ocean Professional theme. Create, edit, tag, search, and organize notes. Notes persist locally in your browser (localStorage). No backend required.

## Features
- Sidebar with search, tag filters, and note list
- Editor with title, content, tags, and pin/unpin
- CRUD on notes with smooth transitions
- Tagging and quick filters
- Persisted via localStorage with demo notes on first run
- Responsive layout: header, sidebar, main editor
- Ocean Professional theme with light/dark toggle

## Getting Started
From this directory:

- `npm start` – starts development server at http://localhost:3000
- `npm test` – runs tests
- `npm run build` – builds production bundle

## Environment Variables
Reads optional values from `.env`:
- `REACT_APP_API_BASE`, `REACT_APP_BACKEND_URL`, `REACT_APP_FRONTEND_URL`, `REACT_APP_WS_URL`, `REACT_APP_NODE_ENV`, `REACT_APP_NEXT_TELEMETRY_DISABLED`, `REACT_APP_ENABLE_SOURCE_MAPS`, `REACT_APP_PORT`

No backend is required to run the app.

## Notes Storage
Notes are stored in `localStorage` under `notes_app_notes`. To reset the app, clear site data in your browser devtools.
