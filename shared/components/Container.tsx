import type { HTMLAttributes, ReactNode } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  size?: "default" | "narrow";
};

export function Container({
  children,
  className = "",
  size = "default",
  ...props
}: ContainerProps) {
  const width = size === "narrow" ? "min(860px, calc(100% - 2rem))" : "min(var(--content-max), calc(100% - 2rem))";

  return (
    <div
      className={className}
      style={{ width, marginInline: "auto", ...props.style }}
      {...props}
    >
      {children}
    </div>
  );
}
