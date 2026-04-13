interface BadgeProps {
  label: string;
}

export default function Badge({ label }: BadgeProps) {
  return (
    <span className="inline-flex items-center rounded-[30px] bg-[#F1F5F9] px-3 py-1.5 text-sm font-normal leading-5 text-[#212529]">
      {label}
    </span>
  );
}
