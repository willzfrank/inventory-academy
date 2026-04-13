"use client";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

interface TabItem {
  key: string;
  label: string;
}

interface TabsProps {
  items: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
}

export default function Tabs({ items, activeKey, onChange }: TabsProps) {
  return (
    <div className="overflow-x-auto border-b border-[#E5E7EB] bg-[#F5F5F5] p-[4px]">
      <div className="flex min-w-[640px] w-full items-center justify-between">
        {items.map((tab) => {
          const active = tab.key === activeKey;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onChange(tab.key)}
              className={`relative flex flex-1 items-center justify-center gap-2 px-[12px] py-[6px] text-sm font-medium whitespace-nowrap transition ${
                active
                ? "text-[#111827]"
                  : "border-transparent text-[#6B7280] hover:text-[#111827]"
              }`}
            >
              {active ? (
                <motion.span
                  layoutId="active-tab"
                  transition={{ type: "spring", stiffness: 420, damping: 35 }}
                  className="absolute inset-0 rounded-md bg-primary-sterling-white"
                />
              ) : null}
              <motion.span
                key={`${tab.key}-${active ? "active" : "inactive"}`}
                initial={{ opacity: 0.7, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="relative z-10 inline-flex items-center gap-2"
              >
                {tab.key === "profile" ? (
                  <Icon icon="mingcute:profile-line" width="24" height="24" />
                ) : null}
                {tab.key === "rfp" ? (
                  <Icon icon="ri:file-list-line" width="24" height="24" />
                ) : null}
                {tab.key === "evaluation" ? (
                  <Icon
                    icon="solar:clipboard-list-bold-duotone"
                    width="24"
                    height="24"
                  />
                ) : null}
                {tab.label}
              </motion.span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
