import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import MainLayout from './components/MainLayout';
import VerifySession from './components/common/VerifySession';
import EmailVerificationRequired from './components/guards/EmailVerificationRequired';
import ProtectedRoute from './components/guards/ProtectedRoute';
import { PublicRoute } from './components/guards/PublicRoute';
import RecentActivityPage from './features/activity/pages/RecentActivityPage';
import LoginPage from './features/auth/pages/LoginPage';
import VerifyEmailCodePage from './features/auth/pages/VerifyEmailCodePage';
import VerifyEmailPage from './features/auth/pages/VerifyEmailPage';
import ChatPage from './features/chat/pages/ChatPage';
import DashboardPage from './features/dashboard/pages/DashboardPage';
import DocumentsPage from './features/documents/pages/DocumentsPage';
import ExpensesPage from './features/expenses/pages/ExpensesPage';
import MobileLandingPage from './features/mobile/pages/MobileLandingPage';
import NotificationsPage from './features/notifications/pages/NotificationsPage';
import OnboardingPage from './features/onboarding/pages/OnboardingPage';
import ProfilePage from './features/profile/pages/ProfilePage';
import CreateProjectPage from './features/projects/pages/CreateProjectPage';
import ProjectsPage from './features/projects/pages/ProjectsPage';
import ReportsPage from './features/reports/pages/ReportsPage';
import SettingsPage from './features/settings/pages/SettingsPage';
import SubscriptionPage from './features/subscription/pages/SubscriptionPage';
import AddTaskPage from './features/tasks/pages/AddTaskPage';
import TaskDetailPage from './features/tasks/pages/TaskDetailPage';
import TasksPage from './features/tasks/pages/TasksPage';
import VendorsPage from './features/vendors/pages/VendorsPage';
import { useMobileDetect } from './hooks/useMobileDetect';



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
          <Route path="projects/create" element={<CreateProjectPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="tasks/add" element={<AddTaskPage />} />
          <Route path="tasks/:id" element={<TaskDetailPage />} />
          <Route path="expenses" element={<ExpensesPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="profile" element={<ProfilePage />} />

          <Route path="chat" element={<ChatPage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="activity" element={<RecentActivityPage />} />
          <Route path="vendors" element={<VendorsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="subscription" element={<SubscriptionPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster richColors />
    </BrowserRouter>
  );
}

export default App;
