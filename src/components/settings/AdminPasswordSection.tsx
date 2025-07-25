
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface AdminPasswordSectionProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  onCurrentPasswordChange: (val: string) => void;
  onNewPasswordChange: (val: string) => void;
  onConfirmPasswordChange: (val: string) => void;
  onUpdatePassword: () => void;
  disabled: boolean;
}

export function AdminPasswordSection({
  currentPassword,
  newPassword,
  confirmPassword,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onUpdatePassword,
  disabled,
}: AdminPasswordSectionProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-lg font-semibold text-blue-800">Change Password</h3>
      </div>
      <hr className="border-blue-100 mb-5" />
      <div className="mb-2">
        <Label htmlFor="current-password" className="text-blue-700">Current Password</Label>
        <Input
          id="current-password"
          type="password"
          value={currentPassword}
          onChange={(e) => onCurrentPasswordChange(e.target.value)}
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
            onChange={(e) => onNewPasswordChange(e.target.value)}
            className="border-blue-200 focus:border-blue-400"
          />
        </div>
        <div>
          <Label htmlFor="confirm-password" className="text-blue-700">Confirm New Password</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
            className="border-blue-200 focus:border-blue-400"
          />
        </div>
      </div>
      <Button 
        variant="default"
        onClick={onUpdatePassword}
        className="bg-blue-600 hover:bg-blue-700 text-white mt-2"
        disabled={disabled}
      >
        Update Password
      </Button>
    </section>
  );
}
