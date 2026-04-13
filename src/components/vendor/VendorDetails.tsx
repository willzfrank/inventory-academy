import {
  vendorProfileCardClass,
  vendorProfileFieldRowClass,
  vendorProfileLabelClass,
  vendorProfileSectionTitleClass,
  vendorProfileValueClass,
} from "@/components/vendor/vendorProfileUi";

export default function VendorDetails() {
  return (
    <section className={vendorProfileCardClass}>
      <h3 className={vendorProfileSectionTitleClass}>Vendor Details</h3>
      <div className="mt-4 grid grid-cols-1 gap-x-12 gap-y-3 md:grid-cols-2">
        <div className="min-w-0 space-y-3">
          <p className={vendorProfileFieldRowClass}>
            <span className={vendorProfileLabelClass}>Vendor Name:</span>
            <span className={vendorProfileValueClass}>TechSkills Training Ltd</span>
          </p>
          <p className={vendorProfileFieldRowClass}>
            <span className={vendorProfileLabelClass}>Vendor ID:</span>
            <span className={vendorProfileValueClass}>VEN-2026-001</span>
          </p>
          <p className={vendorProfileFieldRowClass}>
            <span className={vendorProfileLabelClass}>Email:</span>
            <span className={vendorProfileValueClass}>Micheal.johnson@techskills.com</span>
          </p>
          <p className={vendorProfileFieldRowClass}>
            <span className={vendorProfileLabelClass}>Years of Experience:</span>
            <span className={vendorProfileValueClass}>12 years</span>
          </p>
        </div>
        <div className="min-w-0 space-y-3">
          <p className={vendorProfileFieldRowClass}>
            <span className={vendorProfileLabelClass}>Contact Person:</span>
            <span className={vendorProfileValueClass}>Micheal Johnson</span>
          </p>
          <p className={vendorProfileFieldRowClass}>
            <span className={vendorProfileLabelClass}>Phone Number:</span>
            <span className={vendorProfileValueClass}>+2341 80 810 4100</span>
          </p>
        </div>
      </div>
    </section>
  );
}
