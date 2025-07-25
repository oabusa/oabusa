
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AdminCompanyInfoSectionProps {
  companyName: string;
  onChange: (val: string) => void;
}

export function AdminCompanyInfoSection({ companyName, onChange }: AdminCompanyInfoSectionProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-lg font-semibold text-blue-800">Company Information</h3>
      </div>
      <hr className="border-blue-100 mb-5" />
      <div>
        <Label htmlFor="company-name" className="text-blue-700">Company Name</Label>
        <Input
          id="company-name"
          value={companyName}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your company name"
          className="border-blue-200 focus:border-blue-400"
        />
      </div>
    </section>
  );
}
