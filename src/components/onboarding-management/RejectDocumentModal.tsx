"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

type RejectDocumentModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
};

export default function RejectDocumentModal({
  open,
  onClose,
  onConfirm,
}: RejectDocumentModalProps) {
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (open) setReason("");
  }, [open]);

  if (!open) return null;

  const trimmed = reason.trim();
  const canSubmit = trimmed.length > 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="reject-document-title"
        className="relative z-[101] w-full max-w-lg rounded-2xl border border-[#EAECF0] bg-white p-6 shadow-xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <h2
            id="reject-document-title"
            className="text-lg font-bold leading-7 text-[#101828]"
          >
            Reject Document
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#667085] hover:bg-[#F9FAFB]"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-2 text-sm font-normal leading-5 text-[#667085]">
          Please provide a reason for rejecting this document. The vendor will be notified to
          resubmit.
        </p>

        <div className="mt-5">
          <label htmlFor="rejection-reason" className="text-sm font-medium text-[#344054]">
            Rejection Reason
          </label>
          <textarea
            id="rejection-reason"
            rows={5}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Explain why this document is being rejected and what needs to be corrected"
            className="mt-2 w-full resize-y rounded-lg border border-[#EAECF0] px-3 py-3 text-sm leading-5 text-[#101828] placeholder:text-[#98A2B3] focus:border-[#D92D20] focus:outline-none focus:ring-2 focus:ring-[#D92D20]/20"
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#FEF3F2] px-6 text-sm font-medium text-[#D92D20] hover:bg-[#FEE4E2]"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canSubmit}
            onClick={() => {
              onConfirm(trimmed);
              onClose();
            }}
            className={`inline-flex h-10 items-center justify-center rounded-full px-6 text-sm font-medium ${
              canSubmit
                ? "bg-[#D92D20] text-white hover:opacity-95"
                : "cursor-not-allowed bg-[#E4E7EC] text-white"
            }`}
          >
            Reject Document
          </button>
        </div>
      </div>
    </div>
  );
}
