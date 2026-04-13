import Badge from "@/components/ui/Badge";
import {
  vendorProfileCardClass,
  vendorProfileSectionTitleClass,
  vendorProfileSubsectionLabelClass,
} from "@/components/vendor/vendorProfileUi";

const specialization = [
  "Software Development",
  "Cloud Computing",
  "DevOps & Agile Methodologies",
  "Cybersecurity",
  "Data Analytics",
];

const industry = [
  "Banking & Finance",
  "Telecommunications",
  "Oil and Gas",
  "Government and Public Sector",
  "Technology Startups",
];

export default function Specialization() {
  return (
    <section className={vendorProfileCardClass}>
      <h3 className={vendorProfileSectionTitleClass}>
        Areas of Specialization &amp; Expertise
      </h3>
      <div className="mt-4 space-y-5">
        <div className="min-w-0">
          <p className={vendorProfileSubsectionLabelClass}>Areas of Specialization:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {specialization.map((item) => (
              <Badge key={item} label={item} />
            ))}
          </div>
        </div>
        <div className="min-w-0">
          <p className={vendorProfileSubsectionLabelClass}>Industry Expertise:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {industry.map((item) => (
              <Badge key={item} label={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
