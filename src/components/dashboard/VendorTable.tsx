import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import StatusBadge, { type ApplicationStatus } from "./StatusBadge";

export interface VendorApplicationRow {
  vendorName: string;
  vendorId: string;
  trainingTitle: string;
  date: string;
  status: ApplicationStatus;
}

interface VendorTableProps {
  rows: VendorApplicationRow[];
}

const bodyCellClass =
  "whitespace-nowrap px-2 py-3 text-sm font-normal not-italic leading-5 text-neutral-black3 sm:px-3 sm:py-3.5 sm:text-base sm:leading-6 md:px-4 md:py-4";

export default function VendorTable({ rows }: VendorTableProps) {
  return (
    <div className="rounded-[12px] border-[0.66px] border-solid border-black/10 bg-primary-sterling-white p-4 sm:p-6">
      <div className="mb-5 flex flex-col gap-4 sm:mb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold not-italic leading-snug text-primary-sterling-black sm:text-base sm:leading-[normal]">
            Submitted Vendor Applications
          </h2>
          <p className="mt-1 text-[13px] font-normal not-italic leading-snug text-[#B0B0B0] sm:text-[14px] sm:leading-[normal]">
            Review and process submitted vendor applications
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end lg:w-auto lg:flex-nowrap">
          <div className="w-full min-w-0 sm:min-w-[200px] sm:max-w-[220px]">
            <Input
              id="vendor-app-search"
              type="search"
              placeholder="Search User"
              leftIcon={<Search className="h-4 w-4" aria-hidden />}
              className="!h-auto !rounded-[8px] border-[1px] border-neutral-grey4 bg-primary-sterling-white py-[10px] pr-3 pl-9 text-xs placeholder:text-xs sm:py-[12px] sm:pr-[12px] sm:pl-[40px] sm:text-sm sm:placeholder:text-sm"
              aria-label="Search users"
            />
          </div>
          <div className="w-full min-w-0 sm:w-auto">
            <Select
              id="vendor-status-filter"
              label="Status"
              inlineLabel
              defaultValue="all"
              className="!h-auto !rounded-[8px] border-[1px] border-neutral-grey4 bg-primary-sterling-white py-[10px] pl-3 pr-9 text-xs font-normal leading-5 text-neutral-black1 outline-none transition focus:border-neutral-grey3 focus:ring-2 focus:ring-neutral-grey3/20 sm:py-[12px] sm:pl-[12px] sm:pr-10 sm:text-sm sm:leading-6"
            >
              <option value="all">All</option>
              <option value="pending">Pending Admin Review</option>
              <option value="interview">Interview Scheduled</option>
              <option value="awaiting">Awaiting Approval</option>
            </Select>
          </div>
          <Link
            to="/vendor-applications"
            className="whitespace-nowrap text-center text-sm font-medium not-italic leading-6 text-primary-sterling-red hover:opacity-90 sm:ml-2 sm:text-right sm:text-base"
          >
            View All
          </Link>
        </div>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 sm:-mx-6 sm:px-6">
        <table className="w-full min-w-[720px] border-collapse text-left sm:min-w-[900px]">
          <thead>
            <tr className="border-b border-[#e5e7eb] bg-[#f3f4f6]">
              <th className="whitespace-nowrap px-2 py-2.5 text-sm font-medium not-italic leading-5 text-neutral-black1 sm:px-3 sm:py-3 sm:text-base sm:leading-6 md:px-4">
                Vendor Name
              </th>
              <th className="whitespace-nowrap px-2 py-2.5 text-sm font-medium not-italic leading-5 text-neutral-black1 sm:px-3 sm:py-3 sm:text-base sm:leading-6 md:px-4">
                Vendor ID
              </th>
              <th className="whitespace-nowrap px-2 py-2.5 text-sm font-medium not-italic leading-5 text-neutral-black1 sm:px-3 sm:py-3 sm:text-base sm:leading-6 md:px-4">
                Training Title
              </th>
              <th className="whitespace-nowrap px-2 py-2.5 text-sm font-medium not-italic leading-5 text-neutral-black1 sm:px-3 sm:py-3 sm:text-base sm:leading-6 md:px-4">
                Date
              </th>
              <th className="whitespace-nowrap px-2 py-2.5 text-sm font-medium not-italic leading-5 text-neutral-black1 sm:px-3 sm:py-3 sm:text-base sm:leading-6 md:px-4">
                Application Status
              </th>
              <th className="whitespace-nowrap px-2 py-2.5 text-sm font-medium not-italic leading-5 text-neutral-black1 sm:px-3 sm:py-3 sm:text-base sm:leading-6 md:px-4">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={`${row.vendorId}-${row.date}-${i}`}
                className="border-b border-[#f3f4f6] bg-white even:bg-[#F8F9FA] last:border-b-0"
              >
                <td className={bodyCellClass}>{row.vendorName}</td>
                <td className={bodyCellClass}>{row.vendorId}</td>
                <td className={bodyCellClass}>{row.trainingTitle}</td>
                <td className={bodyCellClass}>{row.date}</td>
                <td className={bodyCellClass}>
                  <StatusBadge status={row.status} />
                </td>
                <td className={bodyCellClass}>
                  <Link
                    to={`/vendors/${encodeURIComponent(row.vendorId)}`}
                    className="text-sm font-normal not-italic leading-5 text-primary-sterling-red underline decoration-solid [text-decoration-skip-ink:none] [text-decoration-thickness:auto] [text-underline-offset:auto] [text-underline-position:from-font] hover:opacity-90 sm:text-base sm:leading-6"
                  >
                    Review
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
