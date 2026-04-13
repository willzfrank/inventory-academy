import OnboardingManagementPanel from "@/components/onboarding-management/OnboardingManagementPanel";
import { ONBOARDING_MANAGEMENT_LIST } from "@/data/onboardingManagementList";

export default function OnboardingMgmtPage() {
  return <OnboardingManagementPanel rows={ONBOARDING_MANAGEMENT_LIST} />;
}
