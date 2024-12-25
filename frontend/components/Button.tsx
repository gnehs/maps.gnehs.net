import { twMerge } from "tailwind-merge";
export default function Button({
  onClick,
  children,
  active,
  className,
  ...props
}: {
  onClick?: () => void;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        `flex h-10 items-center justify-center gap-2 rounded-lg px-3 text-sm transition-colors`,
        "glass-effect hoverable",
        active
          ? "bg-blue-500/20 font-semibold"
          : "bg-white/20 hover:bg-white/40",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
