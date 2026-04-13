import VendorApplicationsPanel from "@/components/vendor-applications/VendorApplicationsPanel";
import { VENDOR_APPLICATIONS_LIST } from "@/data/vendorApplicationsList";

export default function VendorApplicationsPage() {
  return <VendorApplicationsPanel rows={VENDOR_APPLICATIONS_LIST} />;
}
