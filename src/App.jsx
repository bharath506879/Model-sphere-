import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  HashRouter as Router, 
  Routes, 
  Route, 
  Navigate, 
  useNavigate, 
  Link 
} from 'react-router-dom';
import { 
  Activity, 
  Upload, 
  Server, 
  Cpu, 
  ShieldCheck, 
  Play, 
  LogOut, 
  User, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Loader2,
  Database,
  BarChart2,
  Grid
} from 'lucide-react';

/**
 * --- API LAYER ---
 * Connected to local backend at http://127.0.0.1:8000
 */
const API_BASE_URL = "http://127.0.0.1:8000/api";

const api = {
  login: async (email, password) => {
    const { data } = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return data;
  },
  upload: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    // Standard multipart/form-data upload
    const { data } = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  },
  train: async (algo) => {
    const { data } = await axios.post(`${API_BASE_URL}/train`, { algo });
    return data;
  },
  getMetrics: async () => {
    const { data } = await axios.get(`${API_BASE_URL}/metrics`);
    return data;
  }
};

/**
 * --- UI COMPONENTS ---
 */

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgClass = type === 'error' ? 'bg-red-500' : 'bg-green-600';

  return (
    <div className={`fixed top-4 right-4 ${bgClass} text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-3 animate-fade-in-down z-50`}>
      {type === 'error' ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
      <span className="font-medium">{message}</span>
    </div>
  );
};

const Card = ({ title, icon: Icon, children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col ${className}`}>
    <div className="px-6 py-4 border-b border-slate-50 flex items-center gap-2 bg-slate-50/50">
      {Icon && <Icon className="text-blue-600" size={18} />}
      <h3 className="font-semibold text-slate-700">{title}</h3>
    </div>
    <div className="p-6 flex-1">
      {children}
    </div>
  </div>
);

const Header = ({ user, onLogout }) => (
  <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
          M
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
          ModelSphere
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200">
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm">
            {user?.avatar || "U"}
          </div>
          <span className="text-sm font-medium text-slate-700 hidden sm:block">{user?.name}</span>
        </div>
        <button 
          onClick={onLogout}
          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  </header>
);

const Login = ({ setAuth, showToast }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await api.login(formData.email, formData.password);
      // Assuming backend returns { token, user }
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setAuth(data.user);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.detail || 'Login failed - Check connection', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Activity className="text-white" size={28} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Welcome Back</h2>
          <p className="text-blue-100 text-sm">Sign in to manage your AI models</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              placeholder="admin@modelsphere.ai"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
          </button>
          
          <div className="text-center text-sm text-slate-500">
            Don't have an account? <a href="#" className="text-blue-600 font-medium hover:underline">Register</a>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Results Components ---

const ConfusionMatrix = ({ matrix, classes }) => {
  if (!matrix || !classes) return null;
  return (
    <div className="flex flex-col items-center">
      <h4 className="text-sm font-semibold text-slate-600 mb-4">Confusion Matrix</h4>
      <div className="grid grid-cols-4 gap-1 text-xs">
        {/* Header Row */}
        <div className="flex items-center justify-center font-bold text-slate-400 p-2">Actual \ Pred</div>
        {classes.map((cls, i) => (
          <div key={i} className="flex items-center justify-center font-bold text-slate-600 bg-slate-100 rounded p-2">
            {cls.substring(0, 4)}
          </div>
        ))}

        {/* Matrix Rows */}
        {matrix.map((row, i) => (
          <React.Fragment key={i}>
            <div className="flex items-center justify-center font-bold text-slate-600 bg-slate-100 rounded p-2">
              {classes[i] ? classes[i].substring(0, 4) : `C${i}`}
            </div>
            {row.map((val, j) => {
              // Determine intensity of cell color based on value
              const intensity = val === 0 ? 'bg-slate-50 text-slate-300' 
                : val < 10 ? 'bg-blue-100 text-blue-700' 
                : 'bg-blue-600 text-white';
              return (
                <div key={`${i}-${j}`} className={`${intensity} flex items-center justify-center p-3 rounded font-bold transition-all`}>
                  {val}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const ClassificationReport = ({ report }) => {
  if (!report) return null;
  return (
    <div className="w-full overflow-x-auto">
      <h4 className="text-sm font-semibold text-slate-600 mb-3">Classification Report</h4>
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50">
          <tr>
            <th className="px-3 py-2">Class</th>
            <th className="px-3 py-2">Precision</th>
            <th className="px-3 py-2">Recall</th>
            <th className="px-3 py-2">F1-Score</th>
          </tr>
        </thead>
        <tbody>
          {report.map((row, i) => (
            <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
              <td className="px-3 py-2 font-medium text-slate-700">{row.class}</td>
              <td className="px-3 py-2 text-slate-600">{row.precision}</td>
              <td className="px-3 py-2 text-slate-600">{row.recall}</td>
              <td className="px-3 py-2 text-slate-600">{row.f1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const EvaluationSection = ({ modelData }) => {
  if (!modelData || !modelData.confusionMatrix) return null;

  return (
    <Card title="Model Evaluation" icon={BarChart2} className="col-span-full mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ConfusionMatrix matrix={modelData.confusionMatrix} classes={modelData.classes} />
        <ClassificationReport report={modelData.report} />
      </div>
    </Card>
  );
};

// --- Dashboard Components ---

const DatasetUpload = ({ onUpload, uploading }) => (
  <Card title="Dataset Ingestion" icon={Database}>
    <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:border-blue-400 hover:bg-blue-50/50 transition-colors cursor-pointer group">
      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {uploading ? <Loader2 className="animate-spin" /> : <Upload />}
      </div>
      <h4 className="font-medium text-slate-700">Upload CSV or JSON</h4>
      <p className="text-sm text-slate-500 mt-1 mb-4">Drag and drop or click to browse</p>
      <input 
        type="file" 
        className="hidden" 
        id="file-upload" 
        onChange={onUpload} 
        disabled={uploading}
      />
      <label 
        htmlFor="file-upload" 
        className={`px-4 py-2 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50 cursor-pointer ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
      >
        Select File
      </label>
    </div>
  </Card>
);

const TrainingPanel = ({ file, onTrain, isTraining, modelData }) => (
  <Card title="Model Training" icon={Activity}>
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Target Algorithm</label>
        <select 
          id="algo-select"
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 outline-none"
        >
          <option value="Logistic Regression">Logistic Regression</option>
          <option value="K-Nearest Neighbors">K-Nearest Neighbors (KNN)</option>
          <option value="Decision Tree">Decision Tree Classifier</option>
          <option value="Support Vector Machine">Support Vector Machine (SVM)</option>
          <option value="Random Forest">Random Forest Classifier</option>
          <option value="Unlearning Protocol">Fairness & Unlearning Protocol</option>
        </select>
      </div>

      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-500">Active Dataset</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${file ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-500'}`}>
            {file ? 'Ready' : 'Missing'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-slate-400" />
          <span className="font-medium text-slate-700 truncate">
            {file ? file.filename : "No file selected"}
          </span>
        </div>
      </div>

      <button
        onClick={() => onTrain(document.getElementById('algo-select').value)}
        disabled={!file || isTraining}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isTraining ? (
          <>
            <Loader2 className="animate-spin" size={18} /> Training Model...
          </>
        ) : (
          <>
            <Play size={18} /> Start Training
          </>
        )}
      </button>
    </div>
  </Card>
);

const MetricsGrid = ({ metrics, modelData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Requests</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{metrics.requests?.toLocaleString() || 0}</h3>
        </div>
        <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Server size={20} /></div>
      </div>
      <div className="mt-4 flex items-center text-xs text-green-600">
        <Activity size={12} className="mr-1" /> Live
      </div>
    </div>

    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">System Load</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{metrics.cpu || "0%"}</h3>
        </div>
        <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><Cpu size={20} /></div>
      </div>
      <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden">
        <div className="bg-purple-500 h-full rounded-full" style={{ width: metrics.cpu || "0%" }}></div>
      </div>
    </div>

    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Model Accuracy</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">
            {modelData ? modelData.accuracy : "--%"}
          </h3>
        </div>
        <div className="p-2 bg-green-50 rounded-lg text-green-600"><CheckCircle size={20} /></div>
      </div>
      <p className="mt-4 text-xs text-slate-500">
        Status: <span className="font-medium text-slate-700">{modelData ? modelData.status : "Idle"}</span>
      </p>
    </div>

    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Unlearning Audits</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{metrics.privacy_audits || 0}</h3>
        </div>
        <div className="p-2 bg-orange-50 rounded-lg text-orange-600"><ShieldCheck size={20} /></div>
      </div>
      <p className="mt-4 text-xs text-slate-500">
        Privacy Score: <span className="font-medium text-slate-700">{modelData?.privacyScore || "N/A"}</span>
      </p>
    </div>
  </div>
);

const Dashboard = ({ user, onLogout, showToast }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [training, setTraining] = useState(false);
  const [modelData, setModelData] = useState(null);
  const [metrics, setMetrics] = useState({ requests: 0, cpu: "0%", memory: "0", privacy_audits: 0 });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await api.getMetrics();
        setMetrics(data);
      } catch (error) {
        console.error("Failed to fetch metrics:", error);
      }
    };
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setUploading(true);
    try {
      const response = await api.upload(selectedFile);
      setFile(response);
      showToast("Dataset uploaded successfully", "success");
    } catch (error) {
      console.error(error);
      showToast("Upload failed - check backend connection", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleTrain = async (algo) => {
    setTraining(true);
    try {
      const result = await api.train(algo);
      setModelData(result);
      showToast(`Model trained using ${algo}`, "success");
    } catch (error) {
      console.error(error);
      showToast("Training failed - check backend connection", "error");
    } finally {
      setTraining(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Header user={user} onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Operational Dashboard</h1>
          <p className="text-slate-500">Monitor deployments and manage training pipelines</p>
        </div>

        <MetricsGrid metrics={metrics} modelData={modelData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card title="Performance History" icon={Activity} className="min-h-[300px]">
              <div className="h-64 flex items-end justify-between gap-2 px-4 pb-4 border-b border-slate-100 border-dashed relative">
                 {[40, 65, 45, 80, 55, 90, 70, 85].map((h, i) => (
                   <div key={i} className="w-full bg-blue-100 hover:bg-blue-200 rounded-t-sm transition-all relative group" style={{ height: `${h}%` }}>
                     <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded pointer-events-none">
                       {h}%
                     </div>
                   </div>
                 ))}
                 <div className="absolute top-1/2 left-0 right-0 border-t border-slate-200 border-dashed opacity-50"></div>
              </div>
              <div className="flex justify-between mt-4 text-xs text-slate-400 px-4">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
              </div>
            </Card>

            {/* New Evaluation Section rendered after training */}
            {modelData && <EvaluationSection modelData={modelData} />}
          </div>

          <div className="space-y-6">
            <DatasetUpload onUpload={handleUpload} uploading={uploading} />
            <TrainingPanel 
              file={file} 
              onTrain={handleTrain} 
              isTraining={training} 
              modelData={modelData}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const triggerToast = (message, type) => {
    setToast({ message, type });
  };

  return (
    <Router>
      <div className="font-sans text-slate-800 bg-slate-50 min-h-screen">
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
        
        <Routes>
          <Route 
            path="/login" 
            element={!user ? <Login setAuth={setUser} showToast={triggerToast} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard user={user} onLogout={handleLogout} showToast={triggerToast} /> : <Navigate to="/login" />} 
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}