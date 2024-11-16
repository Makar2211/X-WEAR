import { cn } from "../../lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md  bg-[#c0c0c0] ", className)}
      {...props}
    />
  );
}

export { Skeleton };
