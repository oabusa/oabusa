import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

import Index from "./pages/Index";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import AdminDashboard from "./pages/AdminDashboard";
import ProductOwnerDashboard from "./pages/ProductOwnerDashboard"; 
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeSettings from "./pages/EmployeeSettings";
import RoleTraining from "./pages/RoleTraining";
import SOPViewer from "./pages/SOPViewer";
import CreateSOP from "./pages/CreateSOP";
import SOPLibrary from "./pages/SOPLibrary";
import SOPPreview from "./pages/SOPPreview";
import RolesEmployees from "./pages/RolesEmployees";
import TrainingProgress from "./pages/TrainingProgress";
import Settings from "./pages/Settings";
import UserManager from "@/components/UserManager";


import { IS_PRE_RELEASE } from "@/config/featureFlags";


// ✅ Feature flag to control pre-release mode
// In pre-release mode, we limit the routes and hide the login button

if (IS_PRE_RELEASE) {
  console.log("Pre-release mode: routes and login button are limited");
}

function App() {
  return (
    <TooltipProvider>
      <Router>
        <Routes>
          {/* ✅ Always public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/404" element={<NotFound />} />

          {/* ✅ Conditionally available only AFTER launch */}
          {!IS_PRE_RELEASE && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/ProductOwnerDashboard" element={<ProductOwnerDashboard />} />              
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/admin-dashboard/users" element={<UserManager />} />
              <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
              <Route path="/employee-settings" element={<EmployeeSettings />} />
              <Route path="/role-training/:roleId" element={<RoleTraining />} />
              <Route path="/sop-viewer/:sopId" element={<SOPViewer />} />
              <Route path="/create-sop" element={<CreateSOP />} />
              <Route path="/sop-library" element={<SOPLibrary />} />
              <Route path="/sop-preview/:sopId" element={<SOPPreview />} />
              <Route path="/roles-employees" element={<RolesEmployees />} />
              <Route path="/training-progress" element={<TrainingProgress />} />
              <Route path="/settings" element={<Settings />} />
            </>
          )}

          {/* 🚫 Catch-all redirects to 404 */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
        <Toaster />
      </Router>
    </TooltipProvider>
  );
}

export default App;
