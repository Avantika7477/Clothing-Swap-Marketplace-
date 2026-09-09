# Fashion Swap

Clothing Exchange & Swap Marketplace — swap wearable clothes without buying new.

## Features

- Auth (register/login/profile)
- Clothing listings with images + filters
- Swap requests with value comparison
- Negotiation chat
- Nearby location matching
- Admin analytics panel

## Project structure

```text
client/   React + Vite + Tailwind
server/   Node + Express + MongoDB
PRD.md    Product Requirements Document
```

## Local setup

### 1. Start MongoDB
Make sure MongoDB is running locally (Windows service: `MongoDB`).

### 2. Backend

```bash
cd server
npm install
npm run seed
npm run dev
```

API: `http://localhost:5000`

### 3. Frontend

```bash
cd client
npm install
npm run dev
```

App: `http://localhost:5173`

### Env files

**server/.env**
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/clothing-swap
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173
```

**client/.env**
```env
VITE_API_URL=http://localhost:5000/api
```

## Demo login

- Admin: `admin@swap.com` / `admin123`

## Deployment (Phase 1 submission)

### Backend (Render)
1. Create a Web Service from the `server` folder
2. Set env vars: `MONGO_URI` (MongoDB Atlas), `JWT_SECRET`, `CLIENT_URL` (frontend URL), `PORT`
3. Start command: `npm start`
4. Seed once via Render shell: `node seed.js`

### Frontend (Vercel)
1. Import the `client` folder
2. Set `VITE_API_URL` to your Render API URL + `/api`
3. Build command: `npm run build`
4. Output: `dist`

### After deploy
- Update server `CLIENT_URL` to the Vercel domain
- Submit the live frontend URL for evaluation



