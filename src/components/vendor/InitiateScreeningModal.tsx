"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Calendar, Clock, X } from "lucide-react";
import Select from "@/components/ui/Select";
import { Icon } from "@iconify/react";

type InitiateScreeningModalProps = {
  onClose: () => void;
  /** Called when the user leaves the success step (Okay, X, backdrop, Escape). */
  onScreeningSuccess?: () => void;
};

const pickerIndicatorHide =
  "[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-y-0 [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-11 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0";

function ModalPickerField({
  id,
  type,
  value,
  onChange,
  placeholder,
  icon,
}: {
  id: string;
  type: "date" | "time";
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  icon: ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  const showPlaceholder = !value && !focused;

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`h-12 w-full rounded-lg border border-[#e5e7eb] bg-primary-sterling-white py-3 pl-3 pr-11 text-sm font-normal leading-6 outline-none transition focus:border-neutral-grey3 focus:ring-2 focus:ring-neutral-grey3/20 ${pickerIndicatorHide} ${
          showPlaceholder
            ? "text-transparent placeholder:text-transparent"
            : "text-[#111827]"
        }`}
      />
      {showPlaceholder ? (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#adb5bd]">
          {placeholder}
        </span>
      ) : null}
      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#343A40]">
        {icon}
      </span>
    </div>
  );
}

export default function InitiateScreeningModal({
  onClose,
  onScreeningSuccess,
}: InitiateScreeningModalProps) {
  const [remarks, setRemarks] = useState("");
  const [interviewRequired, setInterviewRequired] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [phase, setPhase] = useState<"form" | "success">("form");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (phase === "success") {
        onScreeningSuccess?.();
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
  }, [onClose, onScreeningSuccess, phase]);

  const canSubmit = useMemo(() => {
    if (!interviewRequired) return false;
    if (interviewRequired === "yes") {
      return Boolean(interviewDate && interviewTime && interviewType);
    }
    return true;
  }, [interviewRequired, interviewDate, interviewTime, interviewType]);

  const handleComplete = () => {
    if (!canSubmit) return;
    setPhase("success");
  };

  const closeFormOnly = () => {
    onClose();
  };

  const closeAfterSuccess = () => {
    onScreeningSuccess?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/40"
        onClick={() =>
          phase === "success" ? closeAfterSuccess() : closeFormOnly()
        }
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={
          phase === "success"
            ? "screening-success-title"
            : "screening-modal-title"
        }
        className="relative z-10 w-full max-w-lg rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-lg"
      >
        {phase === "success" ? (
          <>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeAfterSuccess}
                className="rounded-lg p-1.5 text-[#111827] transition hover:bg-[#F3F4F6]"
                aria-label="Close"
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>
            <div className="flex flex-col items-center px-2 pb-2 pt-0">
              <div
                className="flex  items-center justify-center rounded-full w-auto h-auto"
                aria-hidden
              >
                <Icon icon="nimbus:check-circle" width="48" height="48" color="#22C55E" />
              </div>
              <p
                id="screening-success-title"
                className="mt-6 max-w-sm text-center text-base font-medium leading-6 text-[#111827]"
              >
                Screening Successfully Initiated
              </p>
              <button
                type="button"
                onClick={closeAfterSuccess}
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
              id="screening-modal-title"
              className="text-lg font-semibold leading-7 text-[#111827]"
            >
              Initiate Screening Process
            </h2>
            <p className="mt-1 text-sm leading-5 text-[#6B7280]">
              Review the application and schedule an interview if required
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

        <div className="mt-6 space-y-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="screening-remarks"
              className="text-sm font-medium leading-5 text-[#374151]"
            >
              Screening Remarks
            </label>
            <textarea
              id="screening-remarks"
              rows={4}
              placeholder="Enter your initial assessment and screening remarks..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full resize-y rounded-lg border border-[#e5e7eb] bg-primary-sterling-white px-3 py-3 text-sm font-normal leading-6 text-[#111827] outline-none transition placeholder:text-[#adb5bd] focus:border-neutral-grey3 focus:ring-2 focus:ring-neutral-grey3/20"
            />
          </div>

          <Select
            id="interview-required"
            label="Is Interview Required?"
            value={interviewRequired}
            onChange={(e) => setInterviewRequired(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="yes">Yes, Schedule Interview</option>
            <option value="no">No, Proceed to Evaluation</option>
          </Select>

          {interviewRequired === "yes" ? (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex min-w-0 flex-col gap-1.5">
                  <label
                    htmlFor="interview-date"
                    className="text-sm font-semibold leading-5 text-[#111827]"
                  >
                    Interview Date{" "}
                    <span className="text-primary-sterling-red">*</span>
                  </label>
                  <ModalPickerField
                    id="interview-date"
                    type="date"
                    value={interviewDate}
                    onChange={setInterviewDate}
                    placeholder="Select Date"
                    icon={<Calendar className="h-4 w-4" strokeWidth={2} />}
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-1.5">
                  <label
                    htmlFor="interview-time"
                    className="text-sm font-semibold leading-5 text-[#111827]"
                  >
                    Interview Time{" "}
                    <span className="text-primary-sterling-red">*</span>
                  </label>
                  <ModalPickerField
                    id="interview-time"
                    type="time"
                    value={interviewTime}
                    onChange={setInterviewTime}
                    placeholder="Select Time"
                    icon={<Clock className="h-4 w-4" strokeWidth={2} />}
                  />
                </div>
              </div>

              <Select
                id="interview-type"
                label="Interview Type"
                labelClassName="text-sm font-semibold leading-5 text-[#111827] whitespace-nowrap"
                value={interviewType}
                onChange={(e) => setInterviewType(e.target.value)}
                className="h-12 py-3 text-sm"
              >
                <option value="">Select Interview type</option>
                <option value="video">Video Interview</option>
                <option value="phone">Phone Interview</option>
                <option value="in-person">In-Person Interview</option>
              </Select>
            </>
          ) : null}
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
            onClick={handleComplete}
            className="inline-flex items-center justify-center rounded-[30px] bg-primary-sterling-red px-4 py-3 text-center text-base font-medium leading-6 text-primary-sterling-white transition enabled:hover:bg-[#c73035] disabled:cursor-not-allowed disabled:bg-[#C4C4C4] disabled:text-primary-sterling-white disabled:opacity-40"
          >
            Complete Screening
          </button>
        </div>
          </>
        )}
      </div>
    </div>
  );
}
