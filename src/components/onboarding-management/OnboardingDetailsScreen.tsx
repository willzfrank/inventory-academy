"use client";

import { useMemo, useState } from "react";
import Header from "@/components/layout/Header";
import DocumentActionSuccessModal from "@/components/onboarding-management/DocumentActionSuccessModal";
import RejectDocumentModal from "@/components/onboarding-management/RejectDocumentModal";
import SendTemplatesToVendorModal from "@/components/onboarding-management/SendTemplatesToVendorModal";
import ValidateDocumentModal from "@/components/onboarding-management/ValidateDocumentModal";
import {
  CheckCircle2,
  CircleCheck,
  Download,
  Eye,
  FileText,
  Plus,
  SendHorizontal,
  Upload,
  XCircle,
} from "lucide-react";

type OnboardingDetailsScreenProps = {
  vendorId: string;
  vendorName: string;
};

type DocumentStatus =
  | "pendingVendorSubmission"
  | "pendingValidation"
  | "validated"
  | "rejected";

type DocumentRow = {
  title: string;
  subtitle: string;
  eventDate: string;
  status: DocumentStatus;
  rejectionReason?: string;
};

const INITIAL_TITLES = [
  "Non-Disclosure Agreement (NDA)",
  "Mandate Letter",
  "CAC Registration certificate",
  "Tax Identification Number",
  "Company Profile",
  "Curriculum Vitae (CV) of trainer(s)",
  "Professional Certifications",
  "Relevant training licences or accreditations",
  "Request for Proposal(RFP)",
  "Training Materials & Course Documentation",
  "Invoice for services",
  "Participant training materials",
];

function buildInitialDocuments(): DocumentRow[] {
  return INITIAL_TITLES.map((title, i) =>
    i === 0
      ? {
          title,
          subtitle: "Confidentiality and non-disclosure agreement template",
          eventDate: "09/03/2026",
          status: "rejected" as const,
          rejectionReason: "Not enough details",
        }
      : {
          title,
          subtitle: "Confidentiality and non-disclosure agreement template",
          eventDate: "09/03/2026",
          status: "pendingValidation" as const,
        }
  );
}

export default function OnboardingDetailsScreen({
  vendorId,
  vendorName,
}: OnboardingDetailsScreenProps) {
  const [documents, setDocuments] = useState<DocumentRow[]>(buildInitialDocuments);
  const [activeDocTab, setActiveDocTab] = useState<"templateUpload" | "documentValidation">(
    "documentValidation"
  );
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectTargetIndex, setRejectTargetIndex] = useState<number | null>(null);
  const [validateModalOpen, setValidateModalOpen] = useState(false);
  const [validateTargetIndex, setValidateTargetIndex] = useState<number | null>(null);
  const [successModalMessage, setSuccessModalMessage] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [sendTemplatesModalOpen, setSendTemplatesModalOpen] = useState(false);

  const isFinalizedState = documents.every(
    (row) => row.status === "validated" || row.status === "rejected"
  );

  const onboardingSteps = useMemo(
    () =>
      isFinalizedState
        ? ([
            { id: 1, label: "Upload Templates", state: "completed" },
            { id: 2, label: "Vendor Submission", state: "completed" },
            { id: 3, label: "Admin Validation", state: "completed" },
          ] as const)
        : activeDocTab === "documentValidation"
          ? ([
              { id: 1, label: "Upload Templates", state: "completed" },
              { id: 2, label: "Vendor Submission", state: "completed" },
              { id: 3, label: "Admin Validation", state: "active" },
            ] as const)
          : ([
              { id: 1, label: "Upload Templates", state: "completed" },
              { id: 2, label: "Vendor Submission", state: "active" },
              { id: 3, label: "Admin Validation", state: "inactive" },
            ] as const),
    [activeDocTab, isFinalizedState]
  );

  const isValidationTab = isFinalizedState || activeDocTab === "documentValidation";

  function handleValidate(index: number) {
    setDocuments((prev) =>
      prev.map((row, i) =>
        i === index
          ? { ...row, status: "validated" as const, rejectionReason: undefined }
          : row
      )
    );
    setSuccessModalMessage("Document Successfully Validated");
    setSuccessModalOpen(true);
  }

  function handleRejectConfirm(reason: string) {
    if (rejectTargetIndex === null) return;
    setDocuments((prev) =>
      prev.map((row, i) =>
        i === rejectTargetIndex
          ? { ...row, status: "rejected" as const, rejectionReason: reason }
          : row
      )
    );
    setRejectTargetIndex(null);
    setSuccessModalMessage("Document Successfully Rejected");
    setSuccessModalOpen(true);
  }

  return (
    <div className="-mx-3 sm:-mx-6 lg:-mx-8">
      <Header
        backHref="/onboarding-mgmt"
        title="Onboarding Documentation"
        vendorId={`${vendorName}  •  Vendor ID: ${vendorId}`}
      />

      <RejectDocumentModal
        open={rejectModalOpen}
        onClose={() => {
          setRejectModalOpen(false);
          setRejectTargetIndex(null);
        }}
        onConfirm={handleRejectConfirm}
      />

      <ValidateDocumentModal
        open={validateModalOpen}
        onClose={() => {
          setValidateModalOpen(false);
          setValidateTargetIndex(null);
        }}
        onConfirm={() => {
          if (validateTargetIndex !== null) handleValidate(validateTargetIndex);
        }}
      />

      <SendTemplatesToVendorModal
        open={sendTemplatesModalOpen}
        onClose={() => setSendTemplatesModalOpen(false)}
        onConfirm={() => {
          setSuccessModalMessage("Templates Successfully sent to Vendor");
          setSuccessModalOpen(true);
        }}
      />

      <DocumentActionSuccessModal
        open={successModalOpen}
        message={successModalMessage}
        onClose={() => {
          setSuccessModalOpen(false);
          setSuccessModalMessage("");
        }}
      />

      <main className="space-y-4 bg-dashboard-page px-3 py-4 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-[#EAECF0] bg-white p-4 sm:p-6">
          <h2 className="text-lg font-semibold leading-7 text-[#101828]">
            Onboarding Workflow
          </h2>
          <p className="mt-1 text-sm font-normal leading-5 text-[#667085]">
            Track the progress of this vendor onboarding
          </p>

          <div className="mt-6 overflow-x-auto pb-1">
            <div className="flex min-w-[660px] items-start">
              {onboardingSteps.map((step, idx) => {
                const isActive = step.state === "active";
                const isCompleted = step.state === "completed";
                const connectorFilled = step.state === "completed";

                return (
                  <div key={step.id} className="flex flex-1 items-start">
                    <div className="flex w-full flex-col items-center">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-medium ${
                          isCompleted
                            ? "border-[#12B76A] bg-[#12B76A] text-white"
                            : isActive
                              ? "border-[#009CBD] bg-[#009CBD] text-white"
                              : "border-[#EAECF0] bg-[#F2F4F7] text-[#667085]"
                        }`}
                      >
                        {isCompleted ? <CircleCheck className="h-5 w-5" /> : step.id}
                      </div>
                      <p
                        className={`mt-3 text-center text-sm leading-5 whitespace-nowrap ${
                          isActive
                            ? "font-medium text-[#009CBD]"
                            : "font-normal text-[#667085]"
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>

                    {idx !== onboardingSteps.length - 1 ? (
                      <div className="mt-5 flex flex-1 items-center justify-center px-2">
                        <div
                          className={`h-1 w-full rounded-full ${
                            connectorFilled ? "bg-[#12B76A]" : "bg-[#EAECF0]"
                          }`}
                        />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[#EAECF0] bg-white p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold leading-7 text-[#101828]">
                {isFinalizedState
                  ? "All Documents Validated"
                  : isValidationTab
                    ? "Validate Vendor Submission"
                    : "Upload Document Templates"}
              </h3>
              <p className="mt-1 text-sm font-normal leading-5 text-[#667085]">
                {isFinalizedState
                  ? "Ready to Proceed with training assignment and scheduling"
                  : isValidationTab
                    ? "Review and validate documents submitted by vendor"
                    : "Upload and send document templates to vendor"}
              </p>
            </div>
            {isFinalizedState ? (
              <button
                type="button"
                className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-[#D92D20] px-5 text-sm font-medium text-white hover:opacity-95"
              >
                <Plus className="h-4 w-4" />
                Assign Training Schedule
              </button>
            ) : !isValidationTab ? (
              <button
                type="button"
                onClick={() => setSendTemplatesModalOpen(true)}
                className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-[#D92D20] px-5 text-sm font-medium text-white hover:opacity-95"
              >
                <SendHorizontal className="h-4 w-4" />
                Send Templates to Vendor
              </button>
            ) : null}
          </div>

          <div className="mt-5 grid grid-cols-1 overflow-hidden rounded-xl border border-[#EAECF0] sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                if (!isFinalizedState) setActiveDocTab("templateUpload");
              }}
              className={`flex h-11 items-center justify-center gap-2 border-b border-[#EAECF0] text-sm font-medium sm:border-r sm:border-b-0 ${
                !isValidationTab
                  ? "bg-white text-[#101828]"
                  : "bg-[#F9FAFB] text-[#667085]"
              }`}
            >
              <Upload className="h-4 w-4" />
              Template Upload
            </button>
            <button
              type="button"
              onClick={() => {
                if (!isFinalizedState) setActiveDocTab("documentValidation");
              }}
              className={`flex h-11 items-center justify-center gap-2 border-b border-[#EAECF0] text-sm font-medium sm:border-b-0 ${
                isValidationTab
                  ? "bg-white text-[#101828]"
                  : "bg-[#F9FAFB] text-[#667085]"
              }`}
            >
              <CircleCheck className="h-4 w-4" />
              Document Validation
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {documents.map((template, idx) => {
              const showRejectedUi =
                template.status === "rejected" && Boolean(template.rejectionReason);

              return (
                <article
                  key={`${template.title}-${idx}`}
                  className="flex flex-col gap-4 rounded-2xl border border-[#EAECF0] bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F9FAFB]">
                      <FileText className="h-4 w-4 text-[#475467]" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-base font-medium leading-6 text-[#101828] sm:text-[17px]">
                          {template.title}
                        </p>
                        {showRejectedUi ? (
                          <>
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#FEF3F2] px-2 py-0.5 text-xs font-medium text-[#D92D20]">
                              <XCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
                              Rejected
                            </span>
                            <span className="inline-flex items-center rounded-full bg-[#F2F4F7] px-2 py-0.5 text-xs font-medium text-[#667085]">
                              Pending Vendor Submission
                            </span>
                          </>
                        ) : template.status === "validated" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#ECFDF3] px-2 py-0.5 text-xs font-medium text-[#039855]">
                            Validated
                            <CircleCheck className="h-3.5 w-3.5 shrink-0" aria-hidden />
                          </span>
                        ) : (
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                              isValidationTab
                                ? "bg-[#E0F2FE] text-[#0284C7]"
                                : "bg-[#F2F4F7] text-[#667085]"
                            }`}
                          >
                            {isValidationTab ? "Pending Validation" : "Pending Vendor Submission"}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm font-normal leading-5 text-[#667085]">
                        {template.subtitle}
                      </p>
                      {showRejectedUi && template.rejectionReason ? (
                        <p className="mt-2 text-sm font-normal leading-5 text-[#D92D20]">
                          Rejection reason: {template.rejectionReason}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-2 sm:items-end">
                    <p className="text-lg font-normal leading-6 text-[#98A2B3]">
                      Validated: {template.eventDate}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-[#EAECF0] bg-white px-4 text-sm font-medium text-[#344054] hover:bg-[#F9FAFB]"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </button>
                      {isFinalizedState ? null : isValidationTab ? (
                        template.status === "rejected" ? null : (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                setRejectTargetIndex(idx);
                                setRejectModalOpen(true);
                              }}
                              className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-[#F04438] bg-white px-4 text-sm font-medium text-[#D92D20] hover:bg-[#FEF3F2]"
                            >
                              <XCircle className="h-4 w-4" />
                              Reject
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setValidateTargetIndex(idx);
                                setValidateModalOpen(true);
                              }}
                              disabled={template.status === "validated"}
                              className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-[#D92D20] bg-[#D92D20] px-4 text-sm font-medium text-white hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                              Validate
                            </button>
                          </>
                        )
                      ) : (
                        <button
                          type="button"
                          className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-[#F04438] bg-white px-4 text-sm font-medium text-[#D92D20] hover:bg-[#FEF3F2]"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
