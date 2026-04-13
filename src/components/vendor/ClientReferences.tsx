import ProfileListItem from "@/components/vendor/ProfileListItem";
import {
  vendorProfileCardClass,
  vendorProfileSectionTitleClass,
} from "@/components/vendor/vendorProfileUi";

const references = [
  "First Bank of Nigeria - John Adeyemi, Head of IT Training (john.adeyemi@firstbank.com)",
  "MTN Nigeria - Sarah Okonkwo, L&D Manager (sarah.okonkwo@mtn.ng)",
  "Shell Nigeria - David Williams, Training Coordinator (david.williams@shell.com)",
];

export default function ClientReferences() {
  return (
    <section className={vendorProfileCardClass}>
      <h3 className={vendorProfileSectionTitleClass}>Client References</h3>
      <div className="mt-4 space-y-2.5">
        {references.map((item) => (
          <ProfileListItem key={item}>{item}</ProfileListItem>
        ))}
      </div>
    </section>
  );
}
