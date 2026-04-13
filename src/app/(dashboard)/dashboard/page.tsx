import StatsCard from "@/components/dashboard/StatsCard";
import { ActiveVendorsStatIcon } from "@/components/icons/ActiveVendorsStatIcon";
import { ApprovedVendorsStatIcon } from "@/components/icons/ApprovedVendorsStatIcon";
import { VendorsInPoolStatIcon } from "@/components/icons/VendorsInPoolStatIcon";
import { DeclinedVendorsStatIcon } from "@/components/icons/DeclinedVendorsStatIcon";
import VendorTable, {
  type VendorApplicationRow,
} from "@/components/dashboard/VendorTable";

const vendorRows: VendorApplicationRow[] = [
  {
    vendorName: "TechSkills Training Ltd",
    vendorId: "APP-001",
    trainingTitle: "Software Development",
    date: "02/05/25",
    status: "pending",
  },
  {
    vendorName: "Global Leadership Institute",
    vendorId: "APP-002",
    trainingTitle: "Leadership & Management",
    date: "02/05/25",
    status: "pending",
  },
  {
    vendorName: "Data Science Academy",
    vendorId: "APP-003",
    trainingTitle: "Data Analytics Fundamentals",
    date: "02/05/25",
    status: "interview",
  },
  {
    vendorName: "Communication Excellence",
    vendorId: "APP-004",
    trainingTitle: "Soft Skills Development",
    date: "02/05/25",
    status: "pending",
  },
  {
    vendorName: "Cybersecurity Training Pro",
    vendorId: "APP-005",
    trainingTitle: "IT Security Essentials",
    date: "02/05/25",
    status: "interview",
  },
  {
    vendorName: "Cybersecurity Training Pro",
    vendorId: "APP-005",
    trainingTitle: "IT Security Essentials",
    date: "02/05/25",
    status: "awaiting",
  },
  {
    vendorName: "Cybersecurity Training Pro",
    vendorId: "APP-005",
    trainingTitle: "IT Security Essentials",
    date: "02/05/25",
    status: "awaiting",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        <StatsCard
          title="Active Vendors"
          value="48"
          subtext="+5 this month"
          customIcon={<ActiveVendorsStatIcon className="h-5 w-5 sm:h-6 sm:w-6" />}
          iconWrapClassName="bg-[#E9FBFF]"
        />
        <StatsCard
          title="Approved Vendors"
          value="148"
          subtext="+3 this week"
          customIcon={<ApprovedVendorsStatIcon className="h-5 w-5 sm:h-6 sm:w-6" />}
          iconWrapClassName="bg-[#F0FDF4]"
        />
        <StatsCard
          title="Vendors In Pool"
          value="248"
          subtext="+5 this month"
          customIcon={<VendorsInPoolStatIcon className="h-5 w-5 sm:h-6 sm:w-6" />}
          iconWrapClassName="bg-[#FFF8EB]"
        />
        <StatsCard
          title="Declined Vendors"
          value="84"
          subtext="+5 this month"
          customIcon={<DeclinedVendorsStatIcon className="h-5 w-5 sm:h-6 sm:w-6" />}
          iconWrapClassName="bg-[#F9DEDF]"
        />
      </div>
      <VendorTable rows={vendorRows} />
    </div>
  );
}
