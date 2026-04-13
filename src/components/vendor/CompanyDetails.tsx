import {
  vendorProfileCardClass,
  vendorProfileCompanyProfileBodyClass,
  vendorProfileCompanyProfileTitleClass,
  vendorProfileFieldRowClass,
  vendorProfileLabelClass,
  vendorProfileSectionTitleClass,
  vendorProfileValueClass,
} from "@/components/vendor/vendorProfileUi";

export default function CompanyDetails() {
  return (
    <section className={vendorProfileCardClass}>
      <h3 className={vendorProfileSectionTitleClass}>Company Details</h3>
      <div className="mt-4 grid grid-cols-1 gap-x-12 gap-y-3 md:grid-cols-2">
        <p className={vendorProfileFieldRowClass}>
          <span className={vendorProfileLabelClass}>Company Type:</span>
          <span className={vendorProfileValueClass}>Limited Liability Company</span>
        </p>
        <p className={vendorProfileFieldRowClass}>
          <span className={vendorProfileLabelClass}>Country of Operation:</span>
          <span className={vendorProfileValueClass}>Nigeria</span>
        </p>
      </div>
      <p className={`mt-3 ${vendorProfileFieldRowClass}`}>
        <span className={vendorProfileLabelClass}>Business Address:</span>
        <span className={vendorProfileValueClass}>
          45, Marina Road, Victoria Island, Lagos
        </span>
      </p>
      <div className="mt-4 min-w-0">
        <span className={vendorProfileCompanyProfileTitleClass}>Company Profile:</span>
        <span className={vendorProfileCompanyProfileBodyClass}>
          TechSkills Training Ltd. is a premier technology training provider specializing in
          cutting-edge software development and cloud computing solutions. With over 12 years of
          industry experience, we have successfully trained over 5,000 professionals across
          various organizations. Our team comprises certified instructors with extensive real-world
          experience in Fortune 500 companies.
        </span>
      </div>
    </section>
  );
}
