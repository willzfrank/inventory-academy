import {
  EVALUATION_SCORE_CRITERIA,
  evaluationCriterionLabelClassName,
  formatRecommendationLabel,
  type EvaluationSubmittedPayload,
} from "@/components/vendor/evaluationData";
import {
  vendorProfileCardClass,
  vendorProfileSectionTitleClass,
} from "@/components/vendor/vendorProfileUi";

type VendorEvaluationTabProps = {
  record: EvaluationSubmittedPayload | null;
};

export default function VendorEvaluationTab({ record }: VendorEvaluationTabProps) {
  if (!record) {
    return (
      <section>
        <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={48}
            height={48}
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden
          >
            <path
              d="M29.9956 3.99902H11.9984C10.9377 3.99902 9.92044 4.42039 9.17041 5.17041C8.42039 5.92044 7.99902 6.9377 7.99902 7.9984V39.9934C7.99902 41.0541 8.42039 42.0714 9.17041 42.8214C9.92044 43.5714 10.9377 43.9928 11.9984 43.9928H35.9947C37.0554 43.9928 38.0726 43.5714 38.8227 42.8214C39.5727 42.0714 39.9941 41.0541 39.9941 39.9934V13.9975L29.9956 3.99902Z"
              stroke="#99A1AF"
              strokeWidth="3.99938"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M27.9961 3.99902V11.9978C27.9961 13.0585 28.4175 14.0757 29.1675 14.8258C29.9175 15.5758 30.9348 15.9972 31.9955 15.9972H39.9942"
              stroke="#99A1AF"
              strokeWidth="3.99938"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.9964 17.9971H15.9971"
              stroke="#99A1AF"
              strokeWidth="3.99938"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M31.9946 25.9961H15.9971"
              stroke="#99A1AF"
              strokeWidth="3.99938"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M31.9946 33.9946H15.9971"
              stroke="#99A1AF"
              strokeWidth="3.99938"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="mt-4 max-w-md text-center text-base font-normal leading-6 text-neutral-black4">
            No evaluation recorded yet
          </p>
        </div>
      </section>
    );
  }

  const rec = formatRecommendationLabel(record.recommendation);

  return (
    <section className={vendorProfileCardClass}>
      <h3 className={vendorProfileSectionTitleClass}>Evaluation &amp; Comments</h3>

      <div
        className="mt-4 flex items-center justify-between rounded-lg border-[0.662px] border-[#C6D2FF] bg-[#EEF2FF] px-4 py-3"
        aria-label="Average score summary"
      >
        <span className="text-base font-medium text-[#009CBD]">Average Score</span>
        <span className="text-2xl font-bold leading-8 text-[#009CBD]">
          {record.averageDisplay}/10
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {EVALUATION_SCORE_CRITERIA.map(({ id, displayLabel }) => {
          const raw = record.scores[id] ?? "";
          const n = Number(raw);
          const safe = Number.isFinite(n) ? n : 0;
          const pct = Math.min(100, Math.max(0, (safe / 10) * 100));

          return (
            <div key={id}>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className={evaluationCriterionLabelClassName}>
                  {displayLabel}
                </span>
                <span className="shrink-0 tabular-nums text-[#374151]">
                  {raw || "—"}/10
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[rgba(3,2,19,0.2)]">
                <div
                  className="h-full rounded-full bg-[#68698A] transition-[width] duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {record.evaluationNote.trim() ? (
        <div className="mt-6">
          <p className="text-sm font-medium text-[#374151]">Admin Evaluation Note</p>
          <div className="mt-2 rounded-lg border border-[#C6D2FF] bg-[#EEF2FF] px-4 py-3 text-sm leading-6 text-[#1F2937]">
            {record.evaluationNote}
          </div>
        </div>
      ) : null}

      <div className="mt-6 border-t border-[#E5E7EB] pt-5 text-sm">
        <span className="font-medium text-[#374151]">Admin Recommendation: </span>
        <span
          className={
            rec.variant === "approve"
              ? "font-semibold text-[#16A34A]"
              : rec.variant === "decline"
                ? "font-semibold text-[#DC2626]"
                : "font-semibold text-[#CA8A04]"
          }
        >
          {rec.text}
        </span>
      </div>
    </section>
  );
}
