"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Tabs from "@/components/ui/Tabs";
import VendorDetails from "@/components/vendor/VendorDetails";
import CompanyDetails from "@/components/vendor/CompanyDetails";
import BankDetails from "@/components/vendor/BankDetails";
import Specialization from "@/components/vendor/Specialization";
import TrainingMethod from "@/components/vendor/TrainingMethod";
import ClientReferences from "@/components/vendor/ClientReferences";
import TrainingTopics from "@/components/vendor/TrainingTopics";
import PastEngagements from "@/components/vendor/PastEngagements";
import RfpSynopsis from "@/components/vendor/RfpSynopsis";
import VendorEvaluationTab from "@/components/vendor/VendorEvaluationTab";
import VendorDecisionStatusBar from "@/components/vendor/VendorDecisionStatusBar";

const tabItems = [
  { key: "profile", label: "Profile Details" },
  { key: "rfp", label: "RFP Synopsis" },
  { key: "evaluation", label: "Evaluation & Comments" },
];

export default function VendorProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="-mx-3 sm:-mx-6 lg:-mx-8">
      <Header
        backHref="/vendor-applications"
        title="TechSkills Training Ltd"
        vendorId="Vendor ID: VEN-2026-001"
      />

      <main className="space-y-4 bg-dashboard-page px-3 py-4 sm:px-6 lg:px-8">
        <VendorDecisionStatusBar decision="keepInPool" />

        <section className="overflow-hidden">
          <Tabs items={tabItems} activeKey={activeTab} onChange={setActiveTab} />

          <div className="space-y-4 bg-dashboard-page p-4 sm:p-5">
            {activeTab === "profile" ? (
              <>
                <VendorDetails />
                <CompanyDetails />
                <BankDetails />
                <Specialization />
                <TrainingMethod />
                <ClientReferences />
                <TrainingTopics />
                <PastEngagements />
              </>
            ) : null}

            {activeTab === "rfp" ? <RfpSynopsis /> : null}

            {activeTab === "evaluation" ? <VendorEvaluationTab record={null} /> : null}
          </div>
        </section>
      </main>
    </div>
  );
}
