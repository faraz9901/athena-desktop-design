import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import MainLayout from './components/MainLayout';
import VerifySession from './components/common/VerifySession';
import EmailVerificationRequired from './components/guards/EmailVerificationRequired';
import ProtectedRoute from './components/guards/ProtectedRoute';
import { PublicRoute } from './components/guards/PublicRoute';
import LoginPage from './features/auth/pages/LoginPage';
import VerifyEmailCodePage from './features/auth/pages/VerifyEmailCodePage';
import VerifyEmailPage from './features/auth/pages/VerifyEmailPage';
import OnboardingPage from './features/onboarding/pages/OnboardingPage';
import { useMobileDetect } from './hooks/useMobileDetect';
import MobileLandingPage from './pages/MobileLandingPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import LaborPage from './pages/labor/LaborPage';
import MaterialsPage from './pages/materials/MaterialsPage';
import ProjectsPage from './pages/projects/ProjectsPage';

function App() {
  const isMobile = useMobileDetect();

  if (isMobile) {
    return <MobileLandingPage />;
  }

  return (
    <BrowserRouter>
      <VerifySession />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />


        <Route path="/verify-email" element={
          <ProtectedRoute>
            <VerifyEmailPage />
          </ProtectedRoute>
        } />

        <Route path="/verify-email/code" element={
          <ProtectedRoute>
            <VerifyEmailCodePage />
          </ProtectedRoute>
        } />


        <Route path="/onboarding" element={
          <ProtectedRoute>
            <OnboardingPage />
          </ProtectedRoute>
        } />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <EmailVerificationRequired>
                {/* <OnboardingRequired> */}
                <MainLayout />
                {/* </OnboardingRequired> */}
              </EmailVerificationRequired>
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="materials" element={<MaterialsPage />} />
          <Route path="labor" element={<LaborPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster richColors />
    </BrowserRouter>
  );
}

export default App;
