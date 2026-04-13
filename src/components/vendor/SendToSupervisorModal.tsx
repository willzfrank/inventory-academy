"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import Select from "@/components/ui/Select";

type SendToSupervisorModalProps = {
  onClose: () => void;
  /** Numeric average display (e.g. "8.5" or "10"); shown as `{value}/10`. */
  evaluationAverage: string;
  /** Called after a successful send (before the modal closes). */
  onSuccess?: () => void;
};

export default function SendToSupervisorModal({
  onClose,
  evaluationAverage,
  onSuccess,
}: SendToSupervisorModalProps) {
  const [supervisor, setSupervisor] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const canSend = useMemo(() => Boolean(supervisor), [supervisor]);

  const handleSend = () => {
    if (!canSend) return;
    onSuccess?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="send-supervisor-title"
        className="relative z-10 max-h-[min(90vh,720px)] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-lg"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="send-supervisor-title"
              className="text-lg font-semibold leading-7 text-[#111827]"
            >
              Send to Supervisor
            </h2>
            <p className="mt-1 text-sm leading-5 text-[#6B7280]">
              Send performance review to supervisor for final approval
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-1.5 text-[#6B7280] transition hover:bg-[#F3F4F6] hover:text-[#111827]"
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <Select
            id="supervisor-select"
            label="Select Supervisor"
            value={supervisor}
            onChange={(e) => setSupervisor(e.target.value)}
            className="h-12 py-3 text-sm"
          >
            <option value="">Select Supervisor</option>
            <option value="sarah-johnson">Sarah Johnson</option>
            <option value="michael-chen">Michael Chen</option>
            <option value="david-okafor">David Okafor</option>
            <option value="priya-sharma">Priya Sharma</option>
          </Select>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="supervisor-message"
              className="text-sm font-medium leading-5 text-[#374151]"
            >
              Message to Supervisor
            </label>
            <textarea
              id="supervisor-message"
              rows={4}
              placeholder="Include any important comment here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full resize-y rounded-lg border border-[#e5e7eb] bg-primary-sterling-white px-3 py-3 text-sm font-normal leading-6 text-[#111827] outline-none transition placeholder:text-[#adb5bd] focus:border-neutral-grey3 focus:ring-2 focus:ring-neutral-grey3/20"
            />
          </div>

          <div
            className="flex items-center justify-between rounded-lg border-[0.662px] border-[#C6D2FF] bg-[#EEF2FF] px-4 py-3"
            aria-live="polite"
          >
            <span className="text-base font-medium text-[#009CBD]">
              Evaluation Average Score
            </span>
            <span className="text-2xl font-bold leading-8 text-[#009CBD]">
              {evaluationAverage}/10
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-[30px] bg-[rgba(249,222,223,0.5)] px-4 py-3 text-center text-base font-medium leading-6 text-[#DB353A]"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canSend}
            onClick={handleSend}
            className="inline-flex items-center justify-center rounded-[30px] bg-primary-sterling-red px-4 py-3 text-center text-base font-medium leading-6 text-primary-sterling-white transition enabled:hover:bg-[#c73035] disabled:cursor-not-allowed disabled:bg-[#C4C4C4] disabled:text-primary-sterling-white disabled:opacity-40"
          >
            Send to Supervisor
          </button>
        </div>
      </div>
    </div>
  );
}
