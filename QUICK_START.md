# 🚀 ModelSphere - Quick Reference

## Start Application

### Windows
```bash
cd "c:\Users\bhara\OneDrive\ドキュメント\model sphere"
start.bat
```

### macOS/Linux
```bash
cd ~/Documents/"model sphere"
./start.sh
```

---

## Access URLs
- Frontend: http://localhost:3000
- API: http://127.0.0.1:8000
- Docs: http://127.0.0.1:8000/docs

---

## Login Credentials
- Email: Any email (e.g., admin@modelsphere.ai)
- Password: Any 6+ character password

---

## Test Data
File: sample_data.csv (in project folder)

---

## Manual Start (Separate Terminals)

**Terminal 1 - Backend:**
```bash
cd "c:\Users\bhara\OneDrive\ドキュメント\model sphere"
python backend.py
```

**Terminal 2 - Frontend:**
```bash
cd "c:\Users\bhara\OneDrive\ドキュメント\model sphere"
npm start
```

---

## Docker Start
```bash
cd "c:\Users\bhara\OneDrive\ドキュメント\model sphere"
docker-compose up --build
```

---

## Installation Status
✅ Backend Dependencies: Installed  
✅ Frontend Dependencies: Installed  
✅ Configuration Files: Created  
✅ Startup Scripts: Created  
✅ Documentation: Complete  
✅ Sample Data: Available  

---

## Files Created (19 total)

1. backend.py
2. ModelSphereApp.jsx
3. index.js
4. index.html
5. index.css
6. package.json
7. requirements.txt
8. tailwind.config.js
9. postcss.config.js
10. .gitignore
11. docker-compose.yml
12. Dockerfile.backend
13. Dockerfile.frontend
14. start.bat
15. start.sh
16. README.md
17. DEPLOYMENT.md
18. SETUP_COMPLETE.md
19. sample_data.csv

---

## Common Commands

| Task | Command |
|------|---------|
| Start App | `start.bat` (Windows) or `./start.sh` (Mac/Linux) |
| Backend Only | `python backend.py` |
| Frontend Only | `npm start` |
| Docker | `docker-compose up --build` |
| Install Backend Deps | `pip install -r requirements.txt` |
| Install Frontend Deps | `npm install` |
| View API Docs | http://127.0.0.1:8000/docs |
| Build Frontend | `npm run build` |

---

## Ports Used
- Frontend: 3000
- Backend: 8000

---

## Troubleshooting

**Backend not responding?**
```bash
python backend.py
```

**Frontend not loading?**
```bash
npm install
npm start
```

**Port in use?**
- Windows: `netstat -ano | findstr :8000`
- Mac/Linux: `lsof -i :8000`

---

**🎉 Ready to deploy!**

