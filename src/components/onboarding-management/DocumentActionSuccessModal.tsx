"use client";

import { X } from "lucide-react";
import { Icon } from "@iconify/react";

type DocumentActionSuccessModalProps = {
  open: boolean;
  message: string;
  onClose: () => void;
};

export default function DocumentActionSuccessModal({
  open,
  message,
  onClose,
}: DocumentActionSuccessModalProps) {
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
        aria-labelledby="document-action-success-title"
        className="relative z-[101] w-full max-w-2xl rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-lg sm:p-8"
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#111827] transition hover:bg-[#F3F4F6]"
            aria-label="Close"
          >
            <X className="h-6 w-6" strokeWidth={2.5} />
          </button>
        </div>

        <div className="flex flex-col items-center px-2 pb-2 pt-0">
          <Icon icon="nimbus:check-circle" width={128} height={128} color="#22C55E" aria-hidden />
          <p
            id="document-action-success-title"
            className="mt-6 text-center text-2xl font-medium leading-8 text-[#111827]"
          >
            {message}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-10 w-full rounded-[36px] bg-primary-sterling-red px-6 py-4 text-center text-base font-medium leading-6 text-primary-sterling-white transition hover:bg-[#c73035]"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
}
