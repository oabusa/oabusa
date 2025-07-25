
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface EmployeePasswordFormProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  setCurrentPassword: (val: string) => void;
  setNewPassword: (val: string) => void;
  setConfirmPassword: (val: string) => void;
  handleUpdatePassword: () => void;
}

export function EmployeePasswordForm({
  currentPassword,
  newPassword,
  confirmPassword,
  setCurrentPassword,
  setNewPassword,
  setConfirmPassword,
  handleUpdatePassword,
}: EmployeePasswordFormProps) {
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
        <h3 className="text-lg font-semibold text-blue-800">Change Password</h3>
      </div>
      <hr className="border-blue-100 mb-5" />
      <div className="mb-2">
        <Label htmlFor="current-password" className="text-blue-700">Current Password</Label>
        <Input
          id="current-password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="border-blue-200 focus:border-blue-400"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="new-password" className="text-blue-700">New Password</Label>
          <Input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border-blue-200 focus:border-blue-400"
          />
        </div>
        <div>
          <Label htmlFor="confirm-password" className="text-blue-700">Confirm New Password</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border-blue-200 focus:border-blue-400"
          />
        </div>
      </div>
      <Button
        variant="default"
        onClick={handleUpdatePassword}
        className="bg-blue-600 hover:bg-blue-700 text-white mt-2"
        disabled={!currentPassword || !newPassword || !confirmPassword}
      >
        Update Password
      </Button>
    </section>
  );
}
