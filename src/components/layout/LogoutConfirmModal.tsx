"use client";

import { useEffect } from "react";
import { Info, X } from "lucide-react";

type LogoutConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function LogoutConfirmModal({
  open,
  onClose,
  onConfirm,
}: LogoutConfirmModalProps) {
  useEffect(() => {
    if (!open) return;
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
  }, [open, onClose]);

  if (!open) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-confirm-title"
        className="relative z-10 w-full max-w-md rounded-[20px] border border-[#E5E7EB] bg-white p-6 shadow-lg"
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#111827] transition hover:bg-[#F3F4F6]"
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <div className="flex flex-col items-center px-2 pb-2 pt-0">
          <div
            className="flex items-center justify-center rounded-full w-auto h-auto"
            aria-hidden
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
              <g clip-path="url(#clip0_563_7708)">
                <path d="M39.9993 73.3333C21.5893 73.3333 6.66602 58.41 6.66602 40C6.66602 21.59 21.5893 6.66667 39.9993 6.66667C58.4093 6.66667 73.3327 21.59 73.3327 40C73.3327 58.41 58.4093 73.3333 39.9993 73.3333ZM39.9993 66.6667C47.0718 66.6667 53.8546 63.8572 58.8555 58.8562C63.8565 53.8552 66.666 47.0724 66.666 40C66.666 32.9276 63.8565 26.1448 58.8555 21.1438C53.8546 16.1429 47.0718 13.3333 39.9993 13.3333C32.9269 13.3333 26.1441 16.1429 21.1432 21.1438C16.1422 26.1448 13.3327 32.9276 13.3327 40C13.3327 47.0724 16.1422 53.8552 21.1432 58.8562C26.1441 63.8572 32.9269 66.6667 39.9993 66.6667ZM36.666 23.3333H43.3327V30H36.666V23.3333ZM36.666 36.6667H43.3327V56.6667H36.666V36.6667Z" fill="#FF9500" />
              </g>
              <defs>
                <clipPath id="clip0_563_7708">
                  <rect width="80" height="80" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <p
            id="logout-confirm-title"
            className="mt-6 max-w-xs text-center text-base font-medium leading-6 text-[#111827]"
          >
            Are you sure you want to logout?
          </p>

          <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-w-[120px] items-center justify-center rounded-[30px] bg-[rgba(204,61,52,0.05)] px-4 py-3 text-center text-base font-medium leading-6 text-[#CC3D34] transition hover:bg-[rgba(204,61,52,0.1)]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="inline-flex min-w-[140px] items-center justify-center rounded-[30px] bg-[#CC3D34] px-4 py-3 text-center text-base font-medium leading-6 text-white transition hover:bg-[#b4352d]"
            >
              Yes, Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
