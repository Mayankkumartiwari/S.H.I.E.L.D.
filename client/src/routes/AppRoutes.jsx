import { Navigate, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import useAuth from "../hooks/useAuth";
import {
  LandingPage,
  DashboardPage,
  CommunityPage,
  LostFoundPage,
  AnnouncementsPage,
  CampusMapPage,
  AssistantPage,
  ProfilePage,
  AdminDashboardPage,
  ManageAnnouncementsPage,
  ManageReportsPage,
  ManageUsersPage,
  NotFoundPage,
  AccessDeniedPage,
} from "../pages/Pages";
import { LoginPage, RegisterPage, VerifyOtpPage } from "../pages/AuthPages";
import PageLoader from "../components/feedback/loaders/PageLoader";

function AppLayout({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
function ProtectedRoute({ children, admin = false }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();
  if (isLoading) return <PageLoader />;
  if (!isAuthenticated)
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  if (admin && user.role !== "admin")
    return <Navigate to="/access-denied" replace />;
  return children;
}
function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}
function GuardedLayout({ children, admin = false }) {
  return (
    <ProtectedRoute admin={admin}>
      <AppLayout>{children}</AppLayout>
    </ProtectedRoute>
  );
}
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />
      <Route path="/verify-otp" element={<VerifyOtpPage />} />
      <Route
        path="/dashboard"
        element={
          <GuardedLayout>
            <DashboardPage />
          </GuardedLayout>
        }
      />
      <Route
        path="/community"
        element={
          <GuardedLayout>
            <CommunityPage />
          </GuardedLayout>
        }
      />
      <Route
        path="/lost-found"
        element={
          <GuardedLayout>
            <LostFoundPage />
          </GuardedLayout>
        }
      />
      <Route
        path="/announcements"
        element={
          <GuardedLayout>
            <AnnouncementsPage />
          </GuardedLayout>
        }
      />
      <Route
        path="/campus-map"
        element={
          <GuardedLayout>
            <CampusMapPage />
          </GuardedLayout>
        }
      />
      <Route
        path="/assistant"
        element={
          <GuardedLayout>
            <AssistantPage />
          </GuardedLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <GuardedLayout>
            <ProfilePage />
          </GuardedLayout>
        }
      />
      <Route
        path="/admin"
        element={
          <GuardedLayout admin>
            <AdminDashboardPage />
          </GuardedLayout>
        }
      />
      <Route
        path="/admin/announcements"
        element={
          <GuardedLayout admin>
            <ManageAnnouncementsPage />
          </GuardedLayout>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <GuardedLayout admin>
            <ManageReportsPage />
          </GuardedLayout>
        }
      />
      <Route
        path="/admin/users"
        element={
          <GuardedLayout admin>
            <ManageUsersPage />
          </GuardedLayout>
        }
      />
      <Route path="/access-denied" element={<AccessDeniedPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
