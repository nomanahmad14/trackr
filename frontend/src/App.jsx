import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import AddApplication from "./pages/AddApplication";
import EditApplication from "./pages/EditApplication";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const { token } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/dashboard" replace /> : <Register />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications/new"
          element={
            <ProtectedRoute>
              <AddApplication />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications/edit/:id"
          element={
            <ProtectedRoute>
              <EditApplication />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;