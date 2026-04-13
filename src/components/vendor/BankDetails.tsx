import {
  vendorProfileCardClass,
  vendorProfileFieldRowClass,
  vendorProfileLabelClass,
  vendorProfileSectionTitleClass,
  vendorProfileValueClass,
} from "@/components/vendor/vendorProfileUi";

export default function BankDetails() {
  return (
    <section className={vendorProfileCardClass}>
      <h3 className={vendorProfileSectionTitleClass}>Bank &amp; Payment Details</h3>
      <div className="mt-4 grid grid-cols-1 gap-x-12 gap-y-3 md:grid-cols-2">
        <div className="min-w-0 space-y-3">
          <p className={vendorProfileFieldRowClass}>
            <span className={vendorProfileLabelClass}>Bank Name:</span>
            <span className={vendorProfileValueClass}>Sterling Bank PLC</span>
          </p>
          <p className={vendorProfileFieldRowClass}>
            <span className={vendorProfileLabelClass}>Account Number:</span>
            <span className={vendorProfileValueClass}>0123456789</span>
          </p>
        </div>
        <div className="min-w-0 space-y-3">
          <p className={vendorProfileFieldRowClass}>
            <span className={vendorProfileLabelClass}>Account Name:</span>
            <span className={vendorProfileValueClass}>TechSkills Training Limited</span>
          </p>
          <p className={vendorProfileFieldRowClass}>
            <span className={vendorProfileLabelClass}>Swift Code:</span>
            <span className={vendorProfileValueClass}>SBP001234</span>
          </p>
        </div>
      </div>
    </section>
  );
}
