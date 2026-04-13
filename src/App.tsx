import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import LoginPage from "@/app/(auth)/login/page";
import AuthenticationPage from "@/app/(auth)/authentication/page";
import DashboardPage from "@/app/(dashboard)/dashboard/page";
import VendorApplicationsPage from "@/app/(dashboard)/vendor-applications/page";
import OnboardingMgmtPage from "@/app/(dashboard)/onboarding-mgmt/page";
import PaymentMgmtPage from "@/app/(dashboard)/payment-mgmt/page";
import PerformanceEvalPage from "@/app/(dashboard)/performance-eval/page";
import TrainingMgmtPage from "@/app/(dashboard)/training-mgmt/page";
import AuditTrailPage from "@/app/(dashboard)/audit-trail/page";
import VendorProfilePage from "@/app/(dashboard)/vendors/[id]/page";
import OnboardingDetailsScreen from "@/components/onboarding-management/OnboardingDetailsScreen";
import { ONBOARDING_MANAGEMENT_LIST } from "@/data/onboardingManagementList";

function DashboardShell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isVendorDetailsRoute = pathname.startsWith("/vendors/");
  const isOnboardingDetailsRoute = pathname.startsWith("/onboarding-mgmt/");
  const isVendorApplications = pathname === "/vendor-applications";
  const isOnboardingManagement = pathname === "/onboarding-mgmt";

  return (
    <div className="min-h-screen bg-dashboard-page">
      <Sidebar />
      <div className="lg:pl-[260px]">
        <div className="pt-[72px] lg:pt-0">
          {isVendorDetailsRoute || isOnboardingDetailsRoute ? null : (
            <Header
              variant={isVendorApplications || isOnboardingManagement ? "hero" : "default"}
              title={
                isVendorApplications
                  ? "Vendor Applications"
                  : isOnboardingManagement
                    ? "Onboarding Documentation"
                    : undefined
              }
              subtitle={
                isVendorApplications
                  ? "View details of completed vendor application reviews and decision Made"
                  : isOnboardingManagement
                    ? "Manage onboarding documentation for all approved Vendors"
                    : undefined
              }
            />
          )}
          <main className="px-3 pb-6 pt-2 sm:px-6 sm:pb-8 lg:px-8 lg:pt-4">{children}</main>
        </div>
      </div>
    </div>
  );
}

function OnboardingDetailsRoute() {
  const { vendorId = "" } = useParams();
  const decodedVendorId = decodeURIComponent(vendorId);
  const row = ONBOARDING_MANAGEMENT_LIST.find((item) => item.vendorId === decodedVendorId);

  return (
    <OnboardingDetailsScreen vendorId={decodedVendorId} vendorName={row?.vendorName ?? "Vendor"} />
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/authentication" element={<AuthenticationPage />} />

      <Route
        path="/dashboard"
        element={
          <DashboardShell>
            <DashboardPage />
          </DashboardShell>
        }
      />
      <Route
        path="/vendor-applications"
        element={
          <DashboardShell>
            <VendorApplicationsPage />
          </DashboardShell>
        }
      />
      <Route
        path="/onboarding-mgmt"
        element={
          <DashboardShell>
            <OnboardingMgmtPage />
          </DashboardShell>
        }
      />
      <Route
        path="/onboarding-mgmt/:vendorId"
        element={
          <DashboardShell>
            <OnboardingDetailsRoute />
          </DashboardShell>
        }
      />
      <Route
        path="/payment-mgmt"
        element={
          <DashboardShell>
            <PaymentMgmtPage />
          </DashboardShell>
        }
      />
      <Route
        path="/performance-eval"
        element={
          <DashboardShell>
            <PerformanceEvalPage />
          </DashboardShell>
        }
      />
      <Route
        path="/training-mgmt"
        element={
          <DashboardShell>
            <TrainingMgmtPage />
          </DashboardShell>
        }
      />
      <Route
        path="/audit-trail"
        element={
          <DashboardShell>
            <AuditTrailPage />
          </DashboardShell>
        }
      />
      <Route
        path="/vendors/:id"
        element={
          <DashboardShell>
            <VendorProfilePage />
          </DashboardShell>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
