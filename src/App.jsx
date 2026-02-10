import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./Create"
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import FormView from "./FormView";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Create/>} />
       <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Dashboard/>} />
        <Route path="/form/:formId" element={<FormView />} />
      </Routes>
    </BrowserRouter>
  );
}
