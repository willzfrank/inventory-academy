import { Icon } from "@iconify/react";

type StepState = "completed" | "active" | "inactive";

const stepDefs = [
  { id: 1, label: "Application Review" },
  { id: 2, label: "Screening & Interview" },
  { id: 3, label: "Evaluation Scoring" },
  { id: 4, label: "Supervisor Approval" },
  { id: 5, label: "Approval Decision" },
] as const;

function stepsForProgress(
  screeningComplete: boolean,
  evaluationComplete: boolean
) {
  if (!screeningComplete) {
    const states: StepState[] = [
      "completed",
      "active",
      "inactive",
      "inactive",
      "inactive",
    ];
    return stepDefs.map((s, i) => ({ ...s, state: states[i]! }));
  }
  if (!evaluationComplete) {
    const states: StepState[] = [
      "completed",
      "completed",
      "active",
      "inactive",
      "inactive",
    ];
    return stepDefs.map((s, i) => ({ ...s, state: states[i]! }));
  }
  const states: StepState[] = [
    "completed",
    "completed",
    "completed",
    "active",
    "inactive",
  ];
  return stepDefs.map((s, i) => ({ ...s, state: states[i]! }));
}

type WorkflowStepperProps = {
  screeningComplete?: boolean;
  evaluationComplete?: boolean;
};

export default function WorkflowStepper({
  screeningComplete = false,
  evaluationComplete = false,
}: WorkflowStepperProps) {
  const steps = stepsForProgress(screeningComplete, evaluationComplete);

  return (
    <section className="min-w-0 flex-1">
      <h2 className="text-sm font-semibold leading-5 text-[#111827]">
        Application Workflow
      </h2>
      <p className="mt-1 text-xs leading-4 text-[#9CA3AF]">
        Track the progress of this vendor application
      </p>

      <div className="mt-6 overflow-x-auto pb-1">
        <div className="flex min-w-[760px] items-start">
          {steps.map((step, idx) => {
            const isCompleted = step.state === "completed";
            const isActive = step.state === "active";
            const connectorGreen = step.state === "completed";

            return (
              <div key={step.id} className="flex flex-1 items-start">
                <div className="flex w-full flex-col items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${isCompleted
                        ? "border border-[#00C950] bg-[#00C950]"
                        : isActive
                          ? "border border-[#009CBD] bg-[#009CBD] text-white"
                          : "border border-[#E5E7EB] bg-[#F3F4F6] text-[#9CA3AF]"
                      }`}
                  >
                    {isCompleted ? (
                      <Icon
                        icon="mynaui:check-circle-one"
                        width={24}
                        height={24}
                        color="#FFFFFF"
                        aria-hidden
                      />
                    ) : (
                      step.id
                    )}
                  </div>
                  <p
                    className={`mt-2 text-center text-xs leading-4 whitespace-nowrap ${isActive ? "text-[#009CBD]" : "text-[#6B7280]"
                      }`}
                  >
                    {step.label}
                  </p>
                </div>
                {idx !== steps.length - 1 ? (
                  <div className="mt-4 flex flex-1 items-center justify-center">
                    <div
                      className={`relative h-1 w-11 rounded-full ${connectorGreen ? "bg-[#00C950]" : "bg-[#E5E7EB]"
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
  );
}
