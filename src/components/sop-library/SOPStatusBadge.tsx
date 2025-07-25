
import { Badge } from "@/components/ui/badge";

type Status = "published" | "draft";

interface SOPStatusBadgeProps {
  status: Status;
}

export const SOPStatusBadge = ({ status }: SOPStatusBadgeProps) => {
  if (status === "published") {
    return (
      <Badge
        variant="default"
        className="bg-green-100 text-green-800 border-green-200 hover:bg-transparent"
      >
        🟢 Published
      </Badge>
    );
  }
  // Fallback to draft
  return (
    <Badge
      variant="secondary"
      className="bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-transparent"
    >
      🟡 Draft
    </Badge>
  );
};
