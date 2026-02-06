# Backend Deployment Guide - Railway

## Problem
Frontend deployed on Netlify can't reach backend running locally (127.0.0.1:8000).

## Solution
Deploy backend to Railway (free tier available, very easy).

---

## 🚀 Deploy Backend to Railway in 5 Minutes

### Step 1: Go to Railway.app
1. Visit https://railway.app
2. Click "Start New Project"
3. Select "Deploy from GitHub"
4. Connect your GitHub account
5. Select repository: `bharath506879/Model-sphere-`

### Step 2: Configure on Railway
1. Railway auto-detects Python project
2. Click "Deploy"
3. Wait for build to complete (~2-3 minutes)

### Step 3: Get Backend URL
1. Go to your Railway project
2. Click on the backend service
3. Copy the URL (looks like: `https://model-sphere-backend-xxxxx.railway.app`)

### Step 4: Update Netlify
1. Go to your Netlify site settings
2. Go to **Build & Deploy** → **Environment**
3. Add new environment variable:
   - Key: `REACT_APP_API_URL`
   - Value: `https://your-railway-url/api`
4. Click "Save"
5. Go to **Deploys** and trigger **Deploy site** (manual deploy)

### Step 5: Test Upload
1. Go to your Netlify frontend URL
2. Try uploading a CSV file
3. Should work now! ✓

---

## Alternative Platforms

If Railway doesn't work, try:

### Heroku (Deprecated but still works)
- Add Procfile (already done ✓)
- Push to Heroku: `git push heroku main`
- Get URL and update Netlify

### Render
1. Go to render.com
2. New → Web Service
3. Connect GitHub repo
4. Build Command: `pip install -r requirements.txt`
5. Start Command: `python backend.py`
6. Add environment: `PORT=8000`

### AWS/Google Cloud
- More complex but better for production
- Requires credit card

---

## Troubleshooting

**Still getting "Backend connection failed"?**
1. Make sure `REACT_APP_API_URL` is set in Netlify
2. Check it includes `/api` at the end
3. Redeploy Netlify site after setting variable
4. Check CORS is enabled in backend (✓ already enabled)

**Backend not responding?**
1. Check Railway logs for errors
2. Verify Procfile exists
3. Verify backend.py imports work
4. Check PORT environment variable

---

## Current Setup
✓ Procfile created (web: python backend.py)
✓ Backend supports PORT environment variable
✓ Frontend uses REACT_APP_API_URL env variable
✓ CORS already enabled for all origins

Just deploy to Railway and update the Netlify env variable!
