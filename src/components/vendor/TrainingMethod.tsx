import Badge from "@/components/ui/Badge";
import {
  vendorProfileCardClass,
  vendorProfileSectionTitleClass,
  vendorProfileSubsectionLabelClass,
} from "@/components/vendor/vendorProfileUi";

const methodology = [
  "Classroom Sessions",
  "Online Courses",
  "Workshops",
  "Hands-on Practical Sessions",
];

const delivery = ["Virtual", "Physical", "Hybrid"];

export default function TrainingMethod() {
  return (
    <section className={vendorProfileCardClass}>
      <h3 className={vendorProfileSectionTitleClass}>
        Training Methodology &amp; Delivery Format
      </h3>
      <div className="mt-4 space-y-5">
        <div className="min-w-0">
          <p className={vendorProfileSubsectionLabelClass}>Training Methodology:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {methodology.map((item) => (
              <Badge key={item} label={item} />
            ))}
          </div>
        </div>
        <div className="min-w-0">
          <p className={vendorProfileSubsectionLabelClass}>Training Delivery Format:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {delivery.map((item) => (
              <Badge key={item} label={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
