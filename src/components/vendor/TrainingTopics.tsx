import ProfileListItem from "@/components/vendor/ProfileListItem";
import {
  vendorProfileCardClass,
  vendorProfileSectionTitleClass,
} from "@/components/vendor/vendorProfileUi";

const topics = [
  "Cloud Architecture & Engineering (AWS, Azure, GCP)",
  "Full Stack Web Development (React, Node.js, Python)",
  "DevOps & CI/CD Pipeline Management",
];

export default function TrainingTopics() {
  return (
    <section className={vendorProfileCardClass}>
      <h3 className={vendorProfileSectionTitleClass}>Training Topics Offered</h3>
      <div className="mt-4 space-y-2.5">
        {topics.map((topic) => (
          <ProfileListItem key={topic}>{topic}</ProfileListItem>
        ))}
      </div>
    </section>
  );
}
