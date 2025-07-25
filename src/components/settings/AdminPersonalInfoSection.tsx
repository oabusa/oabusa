
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AdminPersonalInfoSectionProps {
  firstName: string;
  lastName: string;
  email: string;
  onChange: (fields: { firstName?: string; lastName?: string; email?: string }) => void;
}

export function AdminPersonalInfoSection({
  firstName,
  lastName,
  email,
  onChange,
}: AdminPersonalInfoSectionProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-lg font-semibold text-blue-800">Personal Information</h3>
      </div>
      <hr className="border-blue-100 mb-5" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="first-name" className="text-blue-700">First Name</Label>
          <Input
            id="first-name"
            value={firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
            placeholder="Enter your first name"
            className="border-blue-200 focus:border-blue-400"
          />
        </div>
        <div>
          <Label htmlFor="last-name" className="text-blue-700">Last Name</Label>
          <Input
            id="last-name"
            value={lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
            placeholder="Enter your last name"
            className="border-blue-200 focus:border-blue-400"
          />
        </div>
      </div>
      <div className="mb-2">
        <Label htmlFor="email" className="text-blue-700">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => onChange({ email: e.target.value })}
          className="border-blue-200 focus:border-blue-400"
          placeholder="Enter your email"
        />
      </div>
    </section>
  );
}
