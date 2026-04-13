import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import DecisionBadge from "@/components/vendor-applications/DecisionBadge";
import type { VendorApplicationListRow } from "@/data/vendorApplicationsList";

const PAGE_SIZE = 9;

const bodyCellClass =
  "whitespace-nowrap px-4 py-3.5 text-sm font-normal leading-5 text-[#344054]";

function getVisiblePages(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages = new Set<number>();
  pages.add(1);
  pages.add(total);
  for (let d = -2; d <= 2; d++) {
    const p = current + d;
    if (p >= 1 && p <= total) pages.add(p);
  }
  const sorted = [...pages].sort((a, b) => a - b);
  const out: (number | "ellipsis")[] = [];
  for (let i = 0; i < sorted.length; i++) {
    const p = sorted[i];
    const prev = sorted[i - 1];
    if (i > 0 && p - prev > 1) out.push("ellipsis");
    out.push(p);
  }
  return out;
}

export default function VendorApplicationsPanel({
  rows,
}: {
  rows: VendorApplicationListRow[];
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (status !== "all" && r.decision !== status) return false;
      if (!q) return true;
      return (
        r.vendorName.toLowerCase().includes(q) ||
        r.vendorId.toLowerCase().includes(q) ||
        r.trainingTitle.toLowerCase().includes(q)
      );
    });
  }, [rows, search, status]);

  const totalEntries = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / PAGE_SIZE));

  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * PAGE_SIZE;
  const pageRows = filtered.slice(startIdx, startIdx + PAGE_SIZE);
  const displayFrom = totalEntries === 0 ? 0 : startIdx + 1;
  const displayTo = Math.min(startIdx + PAGE_SIZE, totalEntries);
  const visiblePages = getVisiblePages(safePage, totalPages);

  return (
    <div className="rounded-lg border border-[#EAECF0] bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <Input
            id="vendor-applications-search"
            type="search"
            placeholder="Search vendors"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            leftIcon={<Search className="h-4 w-4 text-[#667085]" aria-hidden />}
            className="!h-10 !rounded-lg !border !border-[#EAECF0] !py-2 !pr-3 !pl-10 !text-sm !leading-5 !text-[#101828] placeholder:!text-sm placeholder:!text-[#667085]"
            aria-label="Search vendors"
          />
        </div>
        <div className="flex w-full shrink-0 items-center gap-2 lg:w-auto">
          <Select
            id="vendor-applications-status"
            label="Status"
            inlineLabel
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            labelClassName="text-sm font-medium leading-5 text-[#344054] whitespace-nowrap"
            className="!h-10 !min-w-[120px] !rounded-lg !border !border-[#EAECF0] !py-2 !pl-3 !pr-9 !text-sm !font-normal !leading-5 !text-[#101828]"
          >
            <option value="all">All</option>
            <option value="keepInPool">Keep In Pool</option>
            <option value="approved">Approved</option>
            <option value="declined">Declined</option>
          </Select>
        </div>
      </div>

      <div className="-mx-6 overflow-x-auto px-6">
        <table className="w-full min-w-[880px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#EAECF0] bg-[#F2F4F7]">
              {(
                [
                  "Vendor Name",
                  "Vendor ID",
                  "Training Title",
                  "Date",
                  "Decision",
                  "Action",
                ] as const
              ).map((label) => (
                <th
                  key={label}
                  className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium leading-[18px] text-[#344054] sm:text-sm sm:leading-5"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row, i) => (
              <tr
                key={`${row.vendorId}-${startIdx + i}`}
                className="border-b border-[#EAECF0] bg-white even:bg-[#F9FAFB] last:border-b-0"
              >
                <td className={bodyCellClass}>{row.vendorName}</td>
                <td className={bodyCellClass}>{row.vendorId}</td>
                <td className={bodyCellClass}>{row.trainingTitle}</td>
                <td className={bodyCellClass}>{row.date}</td>
                <td className={bodyCellClass}>
                  <DecisionBadge decision={row.decision} />
                </td>
                <td className={bodyCellClass}>
                  <Link
                    to={`/vendors/${encodeURIComponent(row.vendorId)}`}
                    className="text-sm font-normal leading-5 text-[#D92D20] underline decoration-solid underline-offset-2 hover:opacity-90"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col items-stretch gap-4 border-t border-[#EAECF0] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-normal leading-5 text-[#667085]">
          {totalEntries === 0
            ? "Currently displaying 0 of 0 entries"
            : `Currently displaying ${displayFrom}-${displayTo} of ${totalEntries} entries`}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-0.5">
          {visiblePages.map((item, idx) =>
            item === "ellipsis" ? (
              <span
                key={`e-${idx}`}
                className="px-1.5 text-sm leading-5 text-[#667085]"
                aria-hidden
              >
                ...
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => setPage(item)}
                className={`flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-sm font-medium leading-5 transition ${
                  item === safePage
                    ? "border border-[#D0D5DD] text-[#101828]"
                    : "text-[#667085] hover:bg-[#F2F4F7]"
                }`}
                aria-label={`Page ${item}`}
                aria-current={item === safePage ? "page" : undefined}
              >
                {item}
              </button>
            )
          )}
        </div>
        <div className="flex items-center justify-center gap-3 sm:justify-end">
          <button
            type="button"
            disabled={safePage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className={`rounded-xl border px-4 py-2 text-center text-base font-normal leading-6 text-neutral-black1 transition disabled:cursor-not-allowed ${
              safePage <= 1
                ? "border-neutral-black4 opacity-50"
                : "border-[#64748B] hover:bg-[#F9FAFB]"
            }`}
          >
            Previous
          </button>
          <button
            type="button"
            disabled={safePage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className={`rounded-xl border px-4 py-2 text-center text-base font-normal leading-6 text-neutral-black1 transition disabled:cursor-not-allowed ${
              safePage >= totalPages
                ? "border-neutral-black4 opacity-50"
                : "border-[#64748B] hover:bg-[#F9FAFB]"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
