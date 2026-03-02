import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import JobsPage from "./pages/JobsPage";
import BidsPage from "./pages/BidsPage";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <JobsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs/:jobId"
            element={
              <ProtectedRoute allowedRoles={['admin', 'contractor']}>
                <BidsPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;