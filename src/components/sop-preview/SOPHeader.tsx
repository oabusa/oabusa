
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SOP {
  id: string;
  title: string;
  description: string;
  roles: string[];
  status: 'draft' | 'published';
  steps: string[];
  createdAt: string;
}

interface SOPHeaderProps {
  sop: SOP;
}

export const SOPHeader = ({ sop }: SOPHeaderProps) => {
  return (
    <Card className="mb-6 border-blue-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-blue-900">{sop.title}</CardTitle>
        <CardDescription className="text-blue-600">{sop.description}</CardDescription>
        <div className="flex flex-wrap gap-2 mt-2">
          {sop.roles.map((role: string) => (
            <span key={role} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full border border-blue-200">
              {role}
            </span>
          ))}
        </div>
      </CardHeader>
    </Card>
  );
};
