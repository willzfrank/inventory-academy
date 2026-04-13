"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { Icon } from "@iconify/react";
import Select from "@/components/ui/Select";
import {
  EVALUATION_SCORE_CRITERIA,
  evaluationCriterionLabelClassName,
  type EvaluationSubmittedPayload,
} from "@/components/vendor/evaluationData";

type SubmitEvaluationModalProps = {
  onClose: () => void;
  /** Fires when the user leaves the success step (Okay, X, backdrop, Escape). */
  onEvaluationSuccess?: (payload: EvaluationSubmittedPayload) => void;
};

const SCORE_CRITERIA = EVALUATION_SCORE_CRITERIA;

const emptyScores = (): Record<string, string> =>
  Object.fromEntries(SCORE_CRITERIA.map(({ id }) => [id, ""]));

export default function SubmitEvaluationModal({
  onClose,
  onEvaluationSuccess,
}: SubmitEvaluationModalProps) {
  const [scores, setScores] = useState(emptyScores);
  const [evaluationNote, setEvaluationNote] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [phase, setPhase] = useState<"form" | "success">("form");

  const canSubmit = useMemo(() => {
    const allScores = SCORE_CRITERIA.every(({ id }) => Boolean(scores[id]));
    return allScores && Boolean(recommendation);
  }, [scores, recommendation]);

  const averageScoreText = useMemo(() => {
    const nums = SCORE_CRITERIA.map(({ id }) => scores[id])
      .filter((v) => v !== "")
      .map((v) => Number(v));
    if (nums.length === 0) return "—";
    const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
    const rounded = Math.round(avg * 10) / 10;
    return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  }, [scores]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (phase === "success") {
        onEvaluationSuccess?.({
          averageDisplay: averageScoreText,
          scores: { ...scores },
          evaluationNote,
          recommendation,
        });
      }
      onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [
    onClose,
    onEvaluationSuccess,
    phase,
    averageScoreText,
    scores,
    evaluationNote,
    recommendation,
  ]);

  const closeFormOnly = () => {
    onClose();
  };

  const dismissSuccess = () => {
    onEvaluationSuccess?.({
      averageDisplay: averageScoreText,
      scores: { ...scores },
      evaluationNote,
      recommendation,
    });
    onClose();
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    setPhase("success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/40"
        onClick={() =>
          phase === "success" ? dismissSuccess() : closeFormOnly()
        }
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={
          phase === "success"
            ? "evaluation-success-title"
            : "submit-evaluation-title"
        }
        className={`relative z-10 w-full rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-lg ${phase === "success"
            ? "max-w-lg"
            : "max-h-[min(90vh,840px)] max-w-2xl overflow-y-auto"
          }`}
      >
        {phase === "success" ? (
          <>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={dismissSuccess}
                className="rounded-lg p-1.5 text-[#111827] transition hover:bg-[#F3F4F6]"
                aria-label="Close"
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>
            <div className="flex flex-col items-center px-2 pb-2 pt-0">
              <div
                className="flex h-auto w-auto items-center justify-center rounded-full"
                aria-hidden
              >
                <Icon
                  icon="nimbus:check-circle"
                  width={48}
                  height={48}
                  color="#22C55E"
                />
              </div>
              <p
                id="evaluation-success-title"
                className="mt-6 max-w-sm text-center text-base font-medium leading-6 text-[#111827]"
              >
                Evaluation Submitted Successfully
              </p>
              <button
                type="button"
                onClick={dismissSuccess}
                className="mt-8 w-full rounded-[30px] bg-primary-sterling-red px-4 py-3 text-center text-base font-medium leading-6 text-primary-sterling-white transition hover:bg-[#c73035]"
              >
                Okay
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="submit-evaluation-title"
                  className="text-lg font-semibold leading-7 text-[#111827]"
                >
                  Submit Evaluation
                </h2>
                <p className="mt-1 text-sm leading-5 text-[#6B7280]">
                  Evaluate the vendor based on the criteria below (1-10 scale)
                  1 - Lowest, 10 - Highest
                </p>
              </div>
              <button
                type="button"
                onClick={closeFormOnly}
                className="shrink-0 rounded-lg p-1.5 text-[#6B7280] transition hover:bg-[#F3F4F6] hover:text-[#111827]"
                aria-label="Close"
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {SCORE_CRITERIA.map(({ id, label }) => (
                <Select
                  key={id}
                  id={`eval-score-${id}`}
                  label={label}
                  labelClassName={`${evaluationCriterionLabelClassName} whitespace-nowrap`}
                  value={scores[id] ?? ""}
                  onChange={(e) =>
                    setScores((s) => ({ ...s, [id]: e.target.value }))
                  }
                  className="h-12 py-3 text-sm"
                >
                  <option value="">Select score</option>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={String(n)}>
                      {n}
                    </option>
                  ))}
                </Select>
              ))}
            </div>

            <div
              className="mt-4 flex items-center justify-between rounded-lg border-[0.662px] border-[#C6D2FF] bg-[#EEF2FF] px-4 py-3"
              aria-live="polite"
            >
              <span className="text-[16px] font-normal text-[#009CBD]">
                Average Score
              </span>
              <span className="text-[24px] font-normal leading-7 text-[#009CBD]">
                {averageScoreText}/10
              </span>
            </div>

            <div className="mt-4 space-y-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="evaluation-note"
                  className="text-sm font-medium leading-5 text-[#374151]"
                >
                  Evaluation Note
                </label>
                <textarea
                  id="evaluation-note"
                  rows={4}
                  placeholder="Provide detailed evaluation notes and justification"
                  value={evaluationNote}
                  onChange={(e) => setEvaluationNote(e.target.value)}
                  className="w-full resize-y rounded-lg border border-[#e5e7eb] bg-primary-sterling-white px-3 py-3 text-sm font-normal leading-6 text-[#111827] outline-none transition placeholder:text-[#adb5bd] focus:border-neutral-grey3 focus:ring-2 focus:ring-neutral-grey3/20"
                />
              </div>

              <Select
                id="eval-recommendation"
                label="Recommendation"
                value={recommendation}
                onChange={(e) => setRecommendation(e.target.value)}
                className="h-12 py-3 text-sm"
              >
                <option value="">Select Recommendation</option>
                <option value="approve">Approve</option>
                <option value="keep-in-pool">Keep In Pool</option>
                <option value="decline">Decline</option>
              </Select>
            </div>

            <div className="mt-8 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={closeFormOnly}
                className="inline-flex items-center justify-center rounded-[30px] bg-[rgba(249,222,223,0.5)] px-4 py-3 text-center text-base font-medium leading-6 text-[#DB353A]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!canSubmit}
                onClick={handleSubmit}
                className="inline-flex items-center justify-center rounded-[30px] bg-primary-sterling-red px-4 py-3 text-center text-base font-medium leading-6 text-primary-sterling-white transition enabled:hover:bg-[#c73035] disabled:cursor-not-allowed disabled:bg-[#C4C4C4] disabled:text-primary-sterling-white disabled:opacity-40"
              >
                Submit Evaluation
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
