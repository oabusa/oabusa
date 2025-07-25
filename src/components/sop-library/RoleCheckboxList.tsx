
import { Checkbox } from "@/components/ui/checkbox";

interface RoleCheckboxListProps {
  roles: { name: string }[];
  selectedRoles: string[];
  onRoleToggle: (roleName: string, checked: boolean) => void;
}

export const RoleCheckboxList = ({
  roles,
  selectedRoles,
  onRoleToggle,
}: RoleCheckboxListProps) => (
  <div className="space-y-3 max-h-60 overflow-y-auto">
    {roles.map((role) => (
      <div key={role.name} className="flex items-center space-x-2 p-2 hover:bg-blue-50 rounded">
        <Checkbox
          id={role.name}
          checked={selectedRoles.includes(role.name)}
          onCheckedChange={(checked) => onRoleToggle(role.name, !!checked)}
          className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:text-white focus-visible:ring-blue-600"
        />
        <label
          htmlFor={role.name}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-blue-900 cursor-pointer flex-1"
        >
          {role.name}
        </label>
      </div>
    ))}
    {roles.length === 0 && (
      <p className="text-sm text-blue-600 text-center py-4">No roles available. Create roles first.</p>
    )}
  </div>
);
