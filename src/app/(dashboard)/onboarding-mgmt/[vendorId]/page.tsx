import OnboardingDetailsScreen from "@/components/onboarding-management/OnboardingDetailsScreen";
import { ONBOARDING_MANAGEMENT_LIST } from "@/data/onboardingManagementList";

type OnboardingDetailsPageProps = {
  params: Promise<{
    vendorId: string;
  }>;
};

export default async function OnboardingDetailsPage({
  params,
}: OnboardingDetailsPageProps) {
  const { vendorId } = await params;
  const decodedVendorId = decodeURIComponent(vendorId);

  const row = ONBOARDING_MANAGEMENT_LIST.find((item) => item.vendorId === decodedVendorId);

  return (
    <OnboardingDetailsScreen
      vendorId={decodedVendorId}
      vendorName={row?.vendorName ?? "Vendor"}
    />
  );
}
