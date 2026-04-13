/** Shared vendor profile tab card chrome (matches dashboard detail sections). */
export const vendorProfileCardClass =
  "rounded-[16px] border border-[#DEE2E6] bg-primary-sterling-white p-5";

/** Section h3 — Inter/Body/Md/Bold, Neutral-Black1 */
export const vendorProfileSectionTitleClass =
  "text-base font-bold leading-6 text-neutral-black1";

/**
 * Single-line key-value row — Inter/Body/Md/Regular, ellipsis on value.
 * Use with vendorProfileLabelClass + vendorProfileValueClass on spans.
 */
export const vendorProfileFieldRowClass =
  "flex min-w-0 gap-x-1 text-base font-normal leading-6 text-neutral-black1";

export const vendorProfileLabelClass = "shrink-0";

export const vendorProfileValueClass = "min-w-0 min-h-0 flex-1 truncate";

/** Subsection label (e.g. “Areas of Specialization:”) — Md/Regular, same color */
export const vendorProfileSubsectionLabelClass =
  "min-w-0 truncate text-base font-normal leading-6 text-neutral-black1";

/** Company profile block: title line + clamped body with ellipsis */
export const vendorProfileCompanyProfileTitleClass =
  "block text-base font-normal leading-6 text-neutral-black1";

export const vendorProfileCompanyProfileBodyClass =
  "mt-1 block line-clamp-6 text-base font-normal leading-6 text-neutral-black1";

/** Same as profile body typography without line clamp (e.g. RFP long copy). */
export const vendorProfileMultilineBodyClass =
  "mt-1 block text-base font-normal leading-6 text-neutral-black1";
