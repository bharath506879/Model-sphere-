# ModelSphere - AI Model Training & Deployment Platform

A full-stack web application for training and deploying machine learning models with an intuitive dashboard.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- Docker & Docker Compose (for containerized deployment)
- npm or yarn

### Installation

#### 1. Install Backend Dependencies
```bash
pip install -r requirements.txt
```

#### 2. Install Frontend Dependencies
```bash
npm install
```

### Running Locally

#### Option A: Run Both Services Separately

**Terminal 1 - Backend:**
```bash
python backend.py
```
The API will be available at `http://127.0.0.1:8000`

**Terminal 2 - Frontend:**
```bash
npm start
```
The app will open at `http://localhost:3000`

#### Option B: Run with Docker Compose
```bash
docker-compose up --build
```
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## 📁 Project Structure

```
model sphere/
├── backend.py              # FastAPI backend server
├── ModelSphereApp.jsx      # React frontend application
├── index.js               # React entry point
├── index.html             # HTML template
├── index.css              # Global styles
├── tailwind.config.js     # Tailwind CSS config
├── postcss.config.js      # PostCSS config
├── package.json           # Frontend dependencies
├── requirements.txt       # Backend dependencies
├── docker-compose.yml     # Docker composition
├── Dockerfile.backend     # Backend container config
├── Dockerfile.frontend    # Frontend container config
├── README.md             # This file
└── uploads/              # Uploaded datasets directory
```

## 🔧 Configuration

### Backend Configuration
Edit `backend.py` to modify:
- Host: Change `127.0.0.1` to `0.0.0.0` for remote access
- Port: Default is `8000`
- CORS: Allowed origins are set to `["*"]` for development

### Frontend Configuration
- API Base URL is set to `http://127.0.0.1:8000` in `ModelSphereApp.jsx`
- For production, update `API_BASE_URL` to your backend URL

## 🎯 Features

### Authentication
- User login with email and password
- JWT token-based authentication (demo)
- Session management with localStorage

### Dataset Management
- Upload CSV or JSON files
- Automatic data validation
- File preview and statistics

### Model Training
- Multiple algorithms:
  - Logistic Regression
  - K-Nearest Neighbors
  - Decision Tree
  - Support Vector Machine
  - Random Forest
  - Fairness & Unlearning Protocol

### Model Evaluation
- Confusion matrix visualization
- Classification report with precision, recall, F1-score
- Accuracy metrics
- Privacy score tracking

### Dashboard Monitoring
- Real-time metrics display
- CPU and system load monitoring
- Request tracking
- Privacy audit logs

## 📊 API Endpoints

### Authentication
- `POST /api/login` - User login

### Data Management
- `POST /api/upload` - Upload dataset file

### Model Training
- `POST /api/train` - Train model with specified algorithm

### Monitoring
- `GET /api/metrics` - Get system metrics

## 🐳 Docker Deployment

### Build Images
```bash
docker-compose build
```

### Run Containers
```bash
docker-compose up
```

### Stop Containers
```bash
docker-compose down
```

## ☁️ Cloud Deployment

### Heroku
1. Create `Procfile` in root:
```
web: python backend.py
```

2. Deploy:
```bash
heroku create
git push heroku main
```

### AWS/GCP/Azure
1. Push Docker images to container registry
2. Deploy using container orchestration (ECS, GKE, ACI)

## 🔐 Security Considerations

For production:
1. Replace hardcoded credentials
2. Use environment variables for sensitive data
3. Enable HTTPS
4. Implement proper JWT validation
5. Add rate limiting
6. Enable CORS properly with specific origins
7. Add input validation and sanitization
8. Use secret management services

## 📝 Environment Variables

Create `.env` file:
```
REACT_APP_API_URL=http://your-backend-url
REACT_APP_ENV=production
```

## 🐛 Troubleshooting

### "Connection refused" error
- Ensure backend is running on correct port
- Check firewall settings
- Verify API_BASE_URL in frontend

### "Module not found" errors
- Run `npm install` for frontend
- Run `pip install -r requirements.txt` for backend

### Port already in use
- Change port in backend.py: `uvicorn.run(app, port=8001)`
- Change port for frontend: `PORT=3001 npm start`

## 📚 Technology Stack

**Frontend:**
- React 18
- React Router v6
- Axios
- Tailwind CSS
- Lucide Icons

**Backend:**
- FastAPI
- Uvicorn
- Pandas
- Scikit-learn
- joblib

## 📄 License

MIT

## 👨‍💻 Support

For issues and questions, please refer to the documentation or create an issue in the repository.
