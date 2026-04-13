import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import type { LucideIcon } from "lucide-react";
import { LineChart, Menu, X } from "lucide-react";
import LogoutConfirmModal from "@/components/layout/LogoutConfirmModal";

type NavItem =
  | {
    label: string;
    href: string;
    remixIcon: string;
    remixIconActive?: string;
  }
  | { label: string; href: string; icon: LucideIcon };

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    remixIcon: "ri:home-4-line",
    remixIconActive: "ri:home-4-fill",
  },
  {
    label: "Vendor Management",
    href: "/vendor-applications",
    remixIcon: "majesticons:user-line",
    remixIconActive: "majesticons:user",
  },
  {
    label: "Onboarding Mgmt.",
    href: "/onboarding-mgmt",
    remixIcon: "ri:parent-line",
    remixIconActive: "ri:parent-fill",
  },
  {
    label: "Training Mgmt.",
    href: "/training-mgmt",
    remixIcon: "ri:file-list-3-line",
    remixIconActive: "ri:file-list-3-fill",
  },
  {
    label: "Performance Eval.",
    href: "/performance-eval",
    remixIcon: "ri:list-check-3",
  },
  {
    label: "Payment Mgmt.",
    href: "/payment-mgmt",
    remixIcon: "mingcute:cash-line",
  },
  { label: "Vendor Analytics", href: "#", icon: LineChart },
  {
    label: "Audit Trail",
    href: "/audit-trail",
    remixIcon: "ri:node-tree",
  },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="fixed left-4 top-5 z-[60] flex h-10 w-10 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-[#374151] shadow-sm lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" strokeWidth={2} />
      </button>

      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed  inset-y-0 left-0 z-50 flex w-[260px] flex-col  transition-transform bg-[#FCFCFC] duration-200 ease-out lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-[#f3f4f6] px-5 lg:h-auto lg:border-b-0 lg:px-6 lg:pt-8 lg:pb-6">
          <Link
            to="/dashboard"
            className="flex items-center gap-[8px]"
            onClick={() => setOpen(false)}
          >
            <span className="flex h-9 w-9 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="34" viewBox="0 0 35 34" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M17.0872 0C26.5244 0 34.1749 7.61122 34.1749 17C34.1749 26.3888 26.5244 34 17.0872 34C7.65033 34 0 26.3888 0 17C0 7.61122 7.65033 0 17.0872 0Z" fill="#D92D20" />
                <path fillRule="evenodd" clipRule="evenodd" d="M22.7831 5.31152C25.5249 5.31152 27.7478 7.52298 27.7478 10.2509C27.7478 12.9788 25.5249 15.1901 22.7831 15.1901C20.041 15.1901 17.8184 12.9788 17.8184 10.2509C17.8184 7.52298 20.041 5.31152 22.7831 5.31152Z" fill="white" />
              </svg>
            </span>
            <span className="text-2xl font-bold leading-8 text-neutral-black3">
              SASPMP
            </span>
          </Link>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6b7280] lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col space-y-[15px] overflow-y-auto px-3 pb-6 pt-2 lg:px-4">
          {navItems.map((item) => {
            const { label, href } = item;
            const active =
              href === "/dashboard"
                ? pathname === "/dashboard"
                : href === "/vendor-applications"
                  ? pathname === "/vendor-applications" ||
                    pathname.startsWith("/vendors/")
                  : href === "/onboarding-mgmt"
                    ? pathname === "/onboarding-mgmt" ||
                      pathname.startsWith("/onboarding-mgmt/")
                    : pathname === href;
            return (
              <Link
                key={label}
                to={href}
                onClick={() => setOpen(false)}
                className={`flex w-full items-center gap-2 self-stretch px-5 py-4 text-base leading-6 transition ${active
                    ? "bg-[#D92D20] font-normal text-white"
                    : "bg-primary-sterling-white font-normal text-[#4B5563] hover:bg-[#f3f4f6]"
                  }`}
              >
                {"remixIcon" in item ? (
                  <Icon
                    icon={
                      active && item.remixIconActive
                        ? item.remixIconActive
                        : item.remixIcon
                    }
                    width={24}
                    height={24}
                    className="shrink-0 text-current"
                  />
                ) : (
                  <item.icon
                    className="h-5 w-5 shrink-0"
                    strokeWidth={active ? 2.25 : 2}
                  />
                )}
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-[#f3f4f6] p-4">
          <button
            type="button"
            onClick={() => {
              setLogoutModalOpen(true);
              setOpen(false);
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[#4B5563] transition hover:bg-[#f9fafb]"
          >
            <Icon
              icon="ri:logout-box-line"
              width={24}
              height={24}
              className="shrink-0 text-current"
            />
            Logout
          </button>
        </div>
      </aside>

      <LogoutConfirmModal
        open={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={() => navigate("/login")}
      />
    </>
  );
}
