# Fashion Swap — Deployment Guide

Final evaluation requires a **live deployed link**. Use this checklist.

## Prerequisites

1. GitHub account  
2. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) free cluster  
3. [Render](https://render.com) account (backend)  
4. [Vercel](https://vercel.com) account (frontend)  
5. Push this project to a GitHub repository  

---

## Step 1 — MongoDB Atlas

1. Create a free cluster  
2. Database Access → create user + password  
3. Network Access → allow `0.0.0.0/0` (for student deploy)  
4. Connect → Drivers → copy connection string, e.g.  
   `mongodb+srv://USER:PASS@cluster0.xxxxx.mongodb.net/fashion-swap?retryWrites=true&w=majority`

---

## Step 2 — Deploy API on Render

1. New → Web Service → connect GitHub repo  
2. Settings:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
3. Environment variables:

| Key | Value |
|---|---|
| `MONGO_URI` | Atlas connection string |
| `JWT_SECRET` | long random string |
| `CLIENT_URL` | your Vercel URL (update after Step 3) |
| `NODE_ENV` | `production` |

4. Deploy → wait for live URL, e.g. `https://fashion-swap-api.onrender.com`
5. Open Render Shell → run: `node seed.js`
6. Test: `https://YOUR-API.onrender.com/api/health`

---

## Step 3 — Deploy Client on Vercel

1. New Project → import GitHub repo  
2. Settings:
   - **Root Directory:** `client`
   - Framework: Vite  
3. Environment variable:

| Key | Value |
|---|---|
| `VITE_API_URL` | `https://YOUR-API.onrender.com/api` |

4. Deploy  
5. Copy frontend URL, e.g. `https://fashion-swap.vercel.app`

---

## Step 4 — Connect frontend ↔ backend

1. In Render, set `CLIENT_URL` = your Vercel URL  
2. Redeploy API  
3. Open the Vercel site and login with:
   - Admin: `admin@swap.com` / `admin123`

---

## Step 5 — Submit

Submit the **Vercel live link** for evaluation.

Also keep:
- `PRD.md`
- Demo credentials
- Short note that Mongo was seeded

---

## Local smoke test before deploy

```bash
# Start MongoDB service (Admin PowerShell)
Start-Service MongoDB

cd server
npm run seed
npm run dev

# other terminal
cd client
npm run dev
```
