"use client";

import { X } from "lucide-react";

type SendTemplatesToVendorModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function SendTemplatesToVendorModal({
  open,
  onClose,
  onConfirm,
}: SendTemplatesToVendorModalProps) {
  if (!open) return null;

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
        aria-labelledby="send-templates-title"
        className="relative z-[101] w-full max-w-lg rounded-2xl border border-[#EAECF0] bg-white p-6 shadow-xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <h2
            id="send-templates-title"
            className="text-lg font-bold leading-7 text-[#101828]"
          >
            Send Template to Vendor
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
          You are about to send these documents to the vendor. Please click Yes, Send to proceed.
        </p>

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
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#D92D20] px-6 text-sm font-medium text-white hover:opacity-95"
          >
            Yes, Send
          </button>
        </div>
      </div>
    </div>
  );
}
