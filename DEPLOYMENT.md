# Deployment Guide for ModelSphere

## Local Development Setup

### Windows

**Step 1: Install Python and Node.js**
- Download Python 3.11+ from python.org
- Download Node.js 18+ from nodejs.org

**Step 2: Navigate to project directory**
```powershell
cd "c:\Users\bhara\OneDrive\ドキュメント\model sphere"
```

**Step 3: Install dependencies**
```powershell
# Backend
pip install -r requirements.txt

# Frontend
npm install
```

**Step 4: Run the application**

Open two PowerShell windows:

**Window 1 - Backend:**
```powershell
python backend.py
```

**Window 2 - Frontend:**
```powershell
npm start
```

Access the application at `http://localhost:3000`

---

## Docker Deployment (Recommended for Production)

### Prerequisites
- Docker Desktop installed
- Docker Compose included with Docker Desktop

### Steps

**Step 1: Build and run containers**
```bash
docker-compose up --build
```

**Step 2: Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

**Step 3: Stop containers**
```bash
docker-compose down
```

---

## Cloud Deployment Options

### Option 1: Heroku (Free Tier Available)

**Backend Deployment:**
1. Create Heroku account at heroku.com
2. Install Heroku CLI
3. Create `Procfile` in root:
```
web: python -m uvicorn backend:app --host 0.0.0.0 --port $PORT
```
4. Deploy:
```bash
heroku login
heroku create your-app-name
git push heroku main
```

**Frontend Deployment:**
1. Deploy to Vercel, Netlify, or GitHub Pages
2. Update API_BASE_URL to your Heroku backend URL

### Option 2: AWS (Elastic Beanstalk)

**Backend:**
1. Create Elastic Beanstalk application
2. Deploy using AWS CLI:
```bash
eb create modelsphere-env
eb deploy
```

**Frontend:**
1. Use S3 + CloudFront for static hosting
2. Update backend URL in environment

### Option 3: Google Cloud (Cloud Run + App Engine)

**Backend (Cloud Run):**
```bash
gcloud run deploy modelsphere-backend --source . --platform managed
```

**Frontend (App Engine):**
```bash
gcloud app deploy
```

### Option 4: Azure Container Instances

**Deploy containers:**
```bash
az container create --resource-group myResourceGroup \
  --name modelsphere --image myimage:latest --ports 8000 3000
```

---

## Environment Configuration

### Development (.env)
```
REACT_APP_API_URL=http://127.0.0.1:8000
REACT_APP_ENV=development
```

### Production (.env.production)
```
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_ENV=production
```

---

## Security Checklist

Before deploying to production:

- [ ] Enable HTTPS/SSL
- [ ] Set secure CORS origins (not *)
- [ ] Implement proper authentication (replace demo JWT)
- [ ] Add rate limiting
- [ ] Enable input validation
- [ ] Use environment variables for secrets
- [ ] Enable CSRF protection
- [ ] Add request logging
- [ ] Setup monitoring and alerts
- [ ] Regular security audits
- [ ] Database encryption (when applicable)
- [ ] API key rotation mechanism

---

## Monitoring & Maintenance

### Logs
```bash
# Docker logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Heroku logs
heroku logs --tail
```

### Metrics
- Use CloudWatch (AWS), Stackdriver (GCP), or Azure Monitor
- Monitor CPU, memory, and request latency
- Setup alerts for errors and performance issues

### Backups
- Regular database backups
- Keep model files in version control
- Archive uploaded datasets

---

## Performance Optimization

### Frontend
- Enable gzip compression
- Minify CSS/JS
- Use CDN for static assets
- Implement lazy loading

### Backend
- Cache model predictions
- Implement request caching
- Use connection pooling
- Monitor database queries

---

## Troubleshooting

### Port conflicts
```bash
# Find process using port
netstat -ano | findstr :8000  # Windows
lsof -i :8000  # macOS/Linux

# Kill process
taskkill /PID <PID> /F  # Windows
kill <PID>  # macOS/Linux
```

### CORS errors
- Verify frontend and backend URLs match
- Check CORS configuration in backend.py
- Ensure API is running before starting frontend

### Module import errors
- Reinstall dependencies: `pip install -r requirements.txt`
- Clear npm cache: `npm cache clean --force && npm install`

---

## Next Steps

1. Configure production database
2. Implement user authentication system
3. Add model versioning
4. Setup CI/CD pipeline
5. Implement data persistence
6. Add email notifications
7. Create admin dashboard
8. Setup automated backups

