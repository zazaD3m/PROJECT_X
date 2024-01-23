import { cn } from "../lib/utils";
import { Loader2 } from "lucide-react";

const Loader = ({ className, size = 48 }) => {
  return (
    <div className="grid h-full w-full place-items-center">
      <Loader2
        size={size}
        className={cn("animate-spin text-primary", className)}
      />
    </div>
  );
};
export default Loader;
