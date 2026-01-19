import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import AdminLogin from './pages/admin/Login';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Contacts from './pages/admin/Contacts';
import Projects from './pages/admin/Projects';
import Subscribers from './pages/admin/Subscribers';
import Admins from './pages/admin/Admins';
import Profile from './pages/admin/Profile';
import Blogs from './pages/admin/Blogs';
import Blog from './pages/Blog';
import WebDevelopmentDemo from './pages/demos/WebDevelopmentDemo';
import MobileAppsDemo from './pages/demos/MobileAppsDemo';
import CloudSolutionsDemo from './pages/demos/CloudSolutionsDemo';
import UIUXDesignDemo from './pages/demos/UIUXDesignDemo';
import PerformanceOptimizationDemo from './pages/demos/PerformanceOptimizationDemo';
import SecurityMaintenanceDemo from './pages/demos/SecurityMaintenanceDemo';
import ECommerceDemo from './pages/demos/ECommerceDemo';
import FinTechDashboardDemo from './pages/demos/FinTechDashboardDemo';
import TaskManagementDemo from './pages/demos/TaskManagementDemo';
import RealEstateDemo from './pages/demos/RealEstateDemo';
import HealthcareAppDemo from './pages/demos/HealthcareAppDemo';
import SocialMediaDemo from './pages/demos/SocialMediaDemo';
import AICRMDemo from './pages/demos/AICRMDemo';
import LMSDemo from './pages/demos/LMSDemo';
import FoodDeliveryDemo from './pages/demos/FoodDeliveryDemo';
import FitnessTrackingDemo from './pages/demos/FitnessTrackingDemo';
import CloudMigrationDemo from './pages/demos/CloudMigrationDemo';
import ELearningUIDemo from './pages/demos/ELearningUIDemo';
import ECommercePerformanceDemo from './pages/demos/PerformanceOptimizationDemo';
import BankingSecurityDemo from './pages/demos/BankingSecurityDemo';
import TravelBookingDemo from './pages/demos/TravelBookingDemo';
import IoTDashboardDemo from './pages/demos/IoTDashboardDemo';
import HealthcareUIDemo from './pages/demos/HealthcareUIDemo';
import APIPerformanceDemo from './pages/demos/APIPerformanceDemo';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Blog />} />
          
          {/* Demo Routes - Services */}
          <Route path="/demo/web-development" element={<WebDevelopmentDemo />} />
          <Route path="/demo/mobile-apps" element={<MobileAppsDemo />} />
          <Route path="/demo/cloud-solutions" element={<CloudSolutionsDemo />} />
          <Route path="/demo/ui-ux-design" element={<UIUXDesignDemo />} />
          <Route path="/demo/performance-optimization" element={<PerformanceOptimizationDemo />} />
          <Route path="/demo/security-maintenance" element={<SecurityMaintenanceDemo />} />
          
          {/* Demo Routes - Projects */}
          <Route path="/demo/ecommerce-platform" element={<ECommerceDemo />} />
          <Route path="/demo/fintech-dashboard" element={<FinTechDashboardDemo />} />
          <Route path="/demo/task-management" element={<TaskManagementDemo />} />
          <Route path="/demo/real-estate-portal" element={<RealEstateDemo />} />
          <Route path="/demo/healthcare-app" element={<HealthcareAppDemo />} />
          <Route path="/demo/social-media-platform" element={<SocialMediaDemo />} />
          <Route path="/demo/ai-powered-crm" element={<AICRMDemo />} />
          <Route path="/demo/learning-management-system" element={<LMSDemo />} />
          <Route path="/demo/food-delivery-app" element={<FoodDeliveryDemo />} />
          <Route path="/demo/fitness-tracking-app" element={<FitnessTrackingDemo />} />
          <Route path="/demo/cloud-migration-solution" element={<CloudMigrationDemo />} />
          <Route path="/demo/e-learning-platform-ui" element={<ELearningUIDemo />} />
          <Route path="/demo/ecommerce-performance-optimization" element={<ECommercePerformanceDemo />} />
          <Route path="/demo/banking-security-system" element={<BankingSecurityDemo />} />
          <Route path="/demo/travel-booking-platform" element={<TravelBookingDemo />} />
          <Route path="/demo/iot-dashboard" element={<IoTDashboardDemo />} />
          <Route path="/demo/healthcare-ui-redesign" element={<HealthcareUIDemo />} />
          <Route path="/demo/api-performance-optimization" element={<APIPerformanceDemo />} />
          
          {/* Admin Login - Public */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Protected Admin Routes with Layout */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/contacts"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Contacts />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/projects"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Projects />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/subscribers"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Subscribers />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/admins"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Admins />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Profile />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blogs"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Blogs />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          
          {/* Admin redirect - catch all other admin routes */}
          <Route path="/admin/*" element={<Navigate to="/admin/login" replace />} />
          
          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
