
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeeOverviewTab } from "./EmployeeOverviewTab";
import { RolesManagementTab } from "./RolesManagementTab";
import React from "react";

export const RolesEmployeesTabs = ({
  activeTab,
  setActiveTab,
  employeeTabProps,
  rolesTabProps,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  employeeTabProps: React.ComponentProps<typeof EmployeeOverviewTab>;
  rolesTabProps: React.ComponentProps<typeof RolesManagementTab>;
}) => (
  <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
    <TabsList className="bg-blue-50 border-blue-200">
      <TabsTrigger value="roles" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Manage Roles</TabsTrigger>
      <TabsTrigger value="employees" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Employee Overview</TabsTrigger>
    </TabsList>

    <TabsContent value="employees">
      <EmployeeOverviewTab {...employeeTabProps} />
    </TabsContent>

    <TabsContent value="roles">
      <RolesManagementTab {...rolesTabProps} />
    </TabsContent>
  </Tabs>
);
