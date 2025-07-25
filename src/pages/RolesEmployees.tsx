import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSessionData } from "@/hooks/useSessionData";
import { useAutoToast } from "@/hooks/useAutoToast";
import { ConfirmationModal } from "@/components/modals/ConfirmationModal";
import { CreateRoleModal } from "@/components/modals/CreateRoleModal";
import { InviteEmployeeModal } from "@/components/modals/InviteEmployeeModal";
import { AssignEmployeeModal } from "@/components/modals/AssignEmployeeModal";
import { RemoveEmployeeFromRoleModal } from "@/components/modals/RemoveEmployeeFromRoleModal";
import { RolesEmployeesHeader } from "@/components/roles-employees/RolesEmployeesHeader";
import { RolesEmployeesTabs } from "@/components/roles-employees/RolesEmployeesTabs";

const RolesEmployees = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    sessionData, 
    addRole, 
    deleteRole, 
    inviteEmployee, 
    removeEmployee, 
    assignEmployeeToRole,
    removeEmployeeFromRole,
    updateSessionData,
  } = useSessionData();
  const { showAutoToast } = useAutoToast();
  
  const [selectedRole, setSelectedRole] = useState("");
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
  const [showInviteEmployeeModal, setShowInviteEmployeeModal] = useState(false);
  const [showAssignEmployeeModal, setShowAssignEmployeeModal] = useState(false);
  const [deleteRoleConfirm, setDeleteRoleConfirm] = useState<string | null>(null);
  const [removeEmployeeFromPlatform, setRemoveEmployeeFromPlatform] = useState<{name: string, email: string} | null>(null);
  const [removeEmployeeFromRoleConfirm, setRemoveEmployeeFromRoleConfirm] = useState<{
    employeeName: string;
    employeeEmail: string;
    roleName: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState("roles");

  // On mount/navigation: only set from location.state or default, NOT every roles change
  useEffect(() => {
    if (location.state?.selectedRole) {
      setSelectedRole(location.state.selectedRole);
      setActiveTab(location.state.activeTab || "roles");
    } else if (!selectedRole && sessionData.roles.length > 0) {
      setSelectedRole(sessionData.roles[0].name);
    }
    // eslint-disable-next-line
  }, [location.state]);

  // If selectedRole is deleted, auto-select the first available role or clear
  useEffect(() => {
    if (
      selectedRole &&
      sessionData.roles.length > 0 &&
      !sessionData.roles.some((role) => role.name === selectedRole)
    ) {
      setSelectedRole(sessionData.roles[0].name || "");
    }
    if (sessionData.roles.length === 0) {
      setSelectedRole("");
    }
  }, [sessionData.roles, selectedRole]);

  const selectedRoleData = sessionData.roles.find(role => role.name === selectedRole);

  // ---- UPDATE getSOPsForRole: Return SOPs sorted by role's sopOrder ----
  const getSOPsForRole = (roleName: string) => {
    const role = sessionData.roles.find(r => r.name === roleName);
    if (!role) return [];

    // All SOPs assigned to this role
    const sopsForRole = sessionData.sops.filter(sop => sop.roles && sop.roles.includes(roleName));
    if (!role.sopOrder || role.sopOrder.length === 0) return sopsForRole;

    // Sort by sopOrder. Extra SOPs (not in sopOrder) go at the end.
    const sopMap = new Map(sopsForRole.map(sop => [sop.id, sop]));
    const ordered = (role.sopOrder || []).map(id => sopMap.get(id)).filter(Boolean);
    const extras = sopsForRole.filter(sop => !role.sopOrder?.includes(sop.id));
    return [...ordered, ...extras];
  };

  const handleInviteEmployee = (email: string, firstName?: string, lastName?: string) => {
    inviteEmployee(email, firstName, lastName);
    showAutoToast({
      title: "Invitation Sent",
      description: `Invitation sent to${firstName && lastName ? ` ${firstName} ${lastName} (${email})` : ` ${email}`} to join the Tasklane platform!`,
    });
  };

  const handleAssignEmployees = (employeeEmails: string[]) => {
    const currentRole = selectedRole;
    employeeEmails.forEach(email => {
      assignEmployeeToRole(email, currentRole);
    });
    showAutoToast({
      title: "Employees Assigned",
      description: `${employeeEmails.length} employee(s) assigned to ${currentRole} role successfully!`,
    });
    setSelectedRole(currentRole);
    setShowAssignEmployeeModal(false);
    setTimeout(() => {
      setSelectedRole(currentRole);
    }, 50);
  };

  const handleCreateRole = (roleName: string, description?: string) => {
    addRole({ name: roleName, employees: [], description: description }); // Pass description here
    showAutoToast({
      title: "Role Created",
      description: `New role "${roleName}" created!`,
    });
    setSelectedRole(roleName);
    setActiveTab("roles");
  };

  const handleDeleteRole = (roleName: string) => {
    deleteRole(roleName);
    setDeleteRoleConfirm(null);
    showAutoToast({
      title: "Role Deleted",
      description: `Role "${roleName}" deleted from entire platform!`,
    });
    if (sessionData.roles.length > 1) {
      const remainingRoles = sessionData.roles.filter(role => role.name !== roleName);
      if (remainingRoles.length > 0) {
        setSelectedRole(remainingRoles[0].name);
      }
    } else {
      setSelectedRole("");
    }
  };

  const handleRemoveEmployeeFromPlatform = (employeeEmail: string) => {
    const employee = sessionData.employees.find(emp => emp.email === employeeEmail);
    const displayName = employee?.name || employeeEmail.split('@')[0];
    removeEmployee(employeeEmail);
    setRemoveEmployeeFromPlatform(null);
    showAutoToast({
      title: "Employee Removed",
      description: `Employee ${displayName} (${employeeEmail}) has been removed from the platform!`,
    });
  };

  const handleRemoveEmployeeFromRoleConfirm = () => {
    if (removeEmployeeFromRoleConfirm) {
      removeEmployeeFromRole(removeEmployeeFromRoleConfirm.employeeEmail, removeEmployeeFromRoleConfirm.roleName);
      showAutoToast({
        title: "Employee Removed from Role",
        description: `Employee removed from ${removeEmployeeFromRoleConfirm.roleName} role!`,
      });
      setRemoveEmployeeFromRoleConfirm(null);
    }
  };

  const getAllEmployees = () => {
    return sessionData.employees.map(employee => ({
      name: employee.name || employee.email.split('@')[0],
      email: employee.email,
      roles: employee.roles,
      status: employee.status
    }));
  };

  const getUnassignedEmployees = () => {
    return sessionData.employees.filter(emp => emp.roles.length === 0 || !emp.roles.includes(selectedRole));
  };

  // ---- UPDATE handleSOPReorder: Use updateSessionData ----
  const handleSOPReorder = (reorderedSops: any[]) => {
    const sopOrder = reorderedSops.map((sop: any) => sop.id);

    if (typeof updateSessionData === "function") {
      updateSessionData((prev: any) => ({
        ...prev,
        roles: prev.roles.map((role: any) =>
          role.name === selectedRole ? { ...role, sopOrder } : role
        ),
      }));
    }

    showAutoToast({
      title: "Training Sequence Updated",
      description: `The training order for "${selectedRole}" has been saved.`,
    });

    // --- Do NOT update setSelectedRole or other states here, just stay on the current selectedRole ---
    // (This avoids switching the selection to another role unexpectedly.)
  };

  // Navigate to roles tab and select role from employee tab
  const handleRoleClickFromEmployee = (role: string) => {
    setSelectedRole(role);
    setActiveTab("roles");
    navigate("/roles-employees", { 
      state: { 
        selectedRole: role,
        activeTab: "roles"
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <RolesEmployeesHeader />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <RolesEmployeesTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          employeeTabProps={{
            employees: getAllEmployees(),
            onInvite: () => setShowInviteEmployeeModal(true),
            onRemove: setRemoveEmployeeFromPlatform,
            onRoleClick: handleRoleClickFromEmployee,
          }}
          rolesTabProps={{
            sessionData,
            selectedRole,
            setSelectedRole,
            onNewRole: () => setShowCreateRoleModal(true),
            onDeleteRole: setDeleteRoleConfirm,
            getSOPsForRole,
            onAssignEmployees: () => setShowAssignEmployeeModal(true),
            onRemoveEmployeeFromRole: setRemoveEmployeeFromRoleConfirm,
            onSOPReorder: handleSOPReorder,
          }}
        />
        {/* Modals */}
        <CreateRoleModal
          isOpen={showCreateRoleModal}
          onClose={() => setShowCreateRoleModal(false)}
          onCreateRole={handleCreateRole}
        />
        <InviteEmployeeModal
          isOpen={showInviteEmployeeModal}
          onClose={() => setShowInviteEmployeeModal(false)}
          onInvite={handleInviteEmployee}
        />
        <AssignEmployeeModal
          isOpen={showAssignEmployeeModal}
          onClose={() => setShowAssignEmployeeModal(false)}
          onAssign={handleAssignEmployees}
          availableEmployees={getUnassignedEmployees()}
          roleName={selectedRole}
        />
        <RemoveEmployeeFromRoleModal
          isOpen={!!removeEmployeeFromRoleConfirm}
          onClose={() => setRemoveEmployeeFromRoleConfirm(null)}
          onConfirm={handleRemoveEmployeeFromRoleConfirm}
          employeeName={removeEmployeeFromRoleConfirm?.employeeName || ""}
          employeeEmail={removeEmployeeFromRoleConfirm?.employeeEmail || ""}
          roleName={removeEmployeeFromRoleConfirm?.roleName || ""}
        />
        <ConfirmationModal
          isOpen={!!deleteRoleConfirm}
          onClose={() => setDeleteRoleConfirm(null)}
          onConfirm={() => deleteRoleConfirm && handleDeleteRole(deleteRoleConfirm)}
          title="Delete Role"
          description={`Are you sure you want to delete the "${deleteRoleConfirm}" role? This will remove it from the entire platform, including all SOP's and employee assignments. This action cannot be undone.`}
          confirmButtonText="Delete Role"
          isDestructive={true}
        />
        <ConfirmationModal
          isOpen={!!removeEmployeeFromPlatform}
          onClose={() => setRemoveEmployeeFromPlatform(null)}
          onConfirm={() => removeEmployeeFromPlatform && handleRemoveEmployeeFromPlatform(removeEmployeeFromPlatform.email)}
          title="Remove Employee from Platform"
          description={`Are you sure you want to remove ${removeEmployeeFromPlatform?.name} (${removeEmployeeFromPlatform?.email}) from the platform? This will permanently delete their training data and remove them from all roles. This action cannot be undone.`}
          confirmButtonText="Remove Employee"
          isDestructive={true}
        />
      </div>
    </div>
  );
};

export default RolesEmployees;
