import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <Routes>
        
        <Route path="/" element={<Navigate to="/login" replace />} />

       
        <Route path="/login" element={<Login />} />

      
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

       
        <Route
          path="/unauthorized"
          element={
            <div className="min-h-screen flex items-center justify-center">
              <h1 className="text-2xl font-bold text-red-600">
                Unauthorized Access
              </h1>
            </div>
          }
        />

     
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
