import ProfileListItem from "@/components/vendor/ProfileListItem";
import {
  vendorProfileCardClass,
  vendorProfileSectionTitleClass,
} from "@/components/vendor/vendorProfileUi";

const previousEngagements = [
  "Successfully delivered 100+ training programs for organizations including First Bank of Nigeria, MTN Nigeria, Shell Nigeria, Lagos State Government, and numerous tech startups. Average client satisfaction rating: 4.8/5.0.",
  "Led enterprise rollouts for cloud migration workshops and secure coding academies across West Africa, with repeat engagements from three tier-1 banks.",
];

const sterlingEngagements = [
  "Delivered Cloud Computing Fundamentals workshop in Q4 2025 for Sterling Bank IT team. Received excellent feedback with 95% satisfaction rate.",
  "Delivered Cloud Computing Fundamentals workshop in Q4 2025 for Sterling Bank IT team. Received excellent feedback with 95% satisfaction rate.",
  "Delivered Cloud Computing Fundamentals workshop in Q4 2025 for Sterling Bank IT team. Received excellent feedback with 95% satisfaction rate.",
];

export default function PastEngagements() {
  return (
    <div className="space-y-4">
      <section className={vendorProfileCardClass}>
        <h3 className={vendorProfileSectionTitleClass}>Previous Training Engagements</h3>
        <div className="mt-4 space-y-2.5">
          {previousEngagements.map((item, index) => (
            <ProfileListItem key={index}>{item}</ProfileListItem>
          ))}
        </div>
      </section>

      <section className={vendorProfileCardClass}>
        <h3 className={vendorProfileSectionTitleClass}>Past Engagements with Sterling</h3>
        <div className="mt-4 space-y-2.5">
          {sterlingEngagements.map((item, index) => (
            <ProfileListItem key={`${index}-${item.slice(0, 24)}`}>{item}</ProfileListItem>
          ))}
        </div>
      </section>
    </div>
  );
}
