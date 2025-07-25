
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmployeeProfileFormProps {
  firstName: string;
  lastName: string;
  email: string;
  setFirstName: (val: string) => void;
  setLastName: (val: string) => void;
  setEmail: (val: string) => void;
}

export function EmployeeProfileForm({
  firstName,
  lastName,
  email,
  setFirstName,
  setLastName,
  setEmail,
}: EmployeeProfileFormProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-2">
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5 text-blue-600"
        >
          <circle cx="12" cy="7" r="4" strokeWidth="2" />
          <path strokeWidth="2" d="M4 21v-2a4 4 0 014-4h8a4 4 0 014 4v2" />
        </svg>
        <h3 className="text-lg font-semibold text-blue-800">Personal Information</h3>
      </div>
      <hr className="border-blue-100 mb-5" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="first-name" className="text-blue-700">First Name</Label>
          <Input
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            className="border-blue-200 focus:border-blue-400"
          />
        </div>
        <div>
          <Label htmlFor="last-name" className="text-blue-700">Last Name</Label>
          <Input
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
          onChange={(e) => setEmail(e.target.value)}
          className="border-blue-200 focus:border-blue-400"
          placeholder="Enter your email"
        />
      </div>
    </section>
  );
}
