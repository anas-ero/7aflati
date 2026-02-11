import { Routes, Route } from "react-router-dom"
import App from "./App"
import  Login  from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import Signup from "./pages/SignUp"

export default function Root() {
  return (
    <Routes>
      {/* Public marketing app */}
      <Route path="/" element={<App />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      

      {/* Protected */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute >
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
